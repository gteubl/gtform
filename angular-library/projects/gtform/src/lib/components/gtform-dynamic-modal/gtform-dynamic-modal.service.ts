import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  Injectable,
  Injector,
  Type,
  ViewContainerRef
} from '@angular/core';

import { take } from 'rxjs/operators';

import { GtformDynamicModalContainerComponent } from './gtform-dynamic-modal-container/gtform-dynamic-modal-container.component';
import { GtformDynamicModalComponent } from './gtform-dynamic-modal.component';
import { ModalConfig } from './models/modal-config';

@Injectable({
  providedIn: 'root'
})
export class GtformDynamicModalService {
  private modalContainerRef!: ViewContainerRef;
  private componentRefs: ComponentRef<GtformDynamicModalComponent>[] = [];

  public constructor(
    private appRef: ApplicationRef,
    private injector: Injector,
    private envInjector: EnvironmentInjector
  ) {
  }

  public close<T>(component: T, result?: any): void {
    const modalRef = this.componentRefs.find(ref => ref.instance.childComponent === (component as any).constructor);
    if (modalRef) {
      modalRef.instance.emitResult(result);
      this.destroy(modalRef);
    }
  }

  public closeAll(): void {
    this.componentRefs.forEach(ref => {
      ref.instance.close();
      ref.destroy();
    });
    this.componentRefs = [];
  }

  public open<T>(component: Type<T>, config: ModalConfig): GtformDynamicModalComponent {
    this.ensureModalContainerExists();

    const componentRef = createComponent(GtformDynamicModalComponent, {
      environmentInjector: this.envInjector,
      elementInjector: this.injector
    });

    componentRef.instance.childComponent = component;
    componentRef.instance.config = config;
    componentRef.instance.data = config.data;

    componentRef.instance.closed
      .pipe(take(1))
      .subscribe(() => {
        this.destroy(componentRef);
      });

    this.modalContainerRef.insert(componentRef.hostView);
    this.componentRefs.push(componentRef);

    return componentRef.instance;
  }

  private destroy(componentRef: ComponentRef<GtformDynamicModalComponent>): void {
    componentRef.destroy();
    this.componentRefs = this.componentRefs.filter(ref => ref !== componentRef);
  }

  private ensureModalContainerExists(): void {
    if (!this.modalContainerRef) {
      const containerComponentRef = createComponent(GtformDynamicModalContainerComponent, { environmentInjector: this.envInjector });
      this.appRef.attachView(containerComponentRef.hostView);
      const domElem = containerComponentRef.location.nativeElement;
      document.body.appendChild(domElem);
      this.modalContainerRef = containerComponentRef.instance.modalContainer;
    }
  }
}
