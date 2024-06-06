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
import { GtformDynamicModalContainerComponent } from '../components/gtform-dynamic-modal-container/index';

import { GtformDynamicModalComponent } from '../components/gtform-dynamic-modal/index';
import { ModalConfig } from '../models/index';

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
        this.close(componentRef);
      });

    this.modalContainerRef.insert(componentRef.hostView);

    return componentRef.instance;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private close(componentRef: ComponentRef<any>): void {
    componentRef.destroy();
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
