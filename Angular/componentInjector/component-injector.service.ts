import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Inject, Injectable, Injector, PLATFORM_ID, Type } from "@angular/core";
import { DOCUMENT, isPlatformBrowser, isPlatformServer } from "@angular/common";
import { LockBodyScrollService } from "./lock-body-scroll.service";


@Injectable({
    providedIn: 'root'
})
export class ComponentInjectorService {

    componentsInjected = new Set<ComponentRef<any>>();
    backdrop?: HTMLElement;

    constructor(
        @Inject(PLATFORM_ID) private _platformId: Object,
        private _componentFactoryResolver: ComponentFactoryResolver,
        private _appRef: ApplicationRef,
        private _injector: Injector,
        private lockBodyScrollService: LockBodyScrollService,
    ) { }


    injectComponent(
        component: Type<any>,
        data?: any,
        parent?: HTMLElement,
        lockBody = true,
        addBackdrop = false,
    ): ComponentRef<any> {
        const componentRef = this._componentFactoryResolver
            .resolveComponentFactory(component)
            .create(this._injector);

        if (data) {
            for (const key in data) {
                componentRef.instance[key] = data[key];
            }
        }

        this._appRef.attachView(componentRef.hostView);

        const element = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

        let isDuplicated = false;

        this.componentsInjected.forEach(component => {
            if (component.instance instanceof componentRef.componentType) {
                isDuplicated = true;
            }
        })

        if (!isDuplicated && isPlatformBrowser(this._platformId)) {

            if (parent) parent.appendChild(element);
            else {
                if (addBackdrop) {
                    this.backdrop = document.createElement('div');
                    this.backdrop.classList.add('backdrop');
                    this.backdrop.style.opacity = '0';

                    document.body.appendChild(this.backdrop);

                    const timer = setTimeout(() => {
                        if (!!this.backdrop) {
                            this.backdrop.style.opacity = '0.25';
                        }

                        clearTimeout(timer);
                    }, 0);
                }

                document.body.appendChild(element);
            }

            this.componentsInjected.add(componentRef);
            this.lockBodyScrollService.lockBody(lockBody);
        }

        return componentRef;
    }

    disposeComponent(target: Type<any>): void {
        if (isPlatformServer(this._platformId)) {
            return;
        }

        this.componentsInjected.forEach(component => {
            if (component.componentType === target) {
                this._appRef.detachView(component.hostView);
                component.destroy();
                this.componentsInjected.delete(component);
            }
        });

        if (!!this.backdrop) {
            this.backdrop.style.opacity = '0';

            const timer = setTimeout(() => {
                document.body.removeChild(this.backdrop!);
                clearTimeout(timer);
            }, 150);
        }

        if (this.componentsInjected.size === 0) {
            this.lockBodyScrollService.lockBody(false);
        }
    }
}
