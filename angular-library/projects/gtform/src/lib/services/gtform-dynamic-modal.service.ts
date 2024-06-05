import { DialogConfig } from '@angular/cdk/dialog';
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

import { GtformDynamicModalComponent } from '../components/gtform-dynamic-modal/gtform-dynamic-modal.component';
import {
  GtformDynamicModalContainerComponent
} from '../components/gtform-dynamic-modal-container/gtform-dynamic-modal-container.component';

@Injectable({
  providedIn: 'root'
})
export class GtformDynamicModalService {
  private modalContainerRef!: ViewContainerRef;

  public constructor(
    private appRef: ApplicationRef,
    private injector: Injector,
    private envInjector: EnvironmentInjector
  ) {
  }

  public close(componentRef: ComponentRef<any>, result: any): void {
    componentRef.instance.close(result);
    componentRef.destroy();
  }

  public open<T>(component: Type<T>, config: DialogConfig): GtformDynamicModalComponent {
    this.ensureModalContainerExists();

    const componentRef = createComponent(GtformDynamicModalComponent, {
      environmentInjector: this.envInjector,
      elementInjector: this.injector
    });

    componentRef.instance.childComponent = component;
    componentRef.instance.config = config;
    componentRef.instance.data = config.data;

    this.modalContainerRef.insert(componentRef.hostView);

    return componentRef.instance;
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
