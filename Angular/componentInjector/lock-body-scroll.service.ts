import { DOCUMENT, isPlatformBrowser, ViewportScroller } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LockBodyScrollService {

    private lastScrollPosition: [number, number] = [0, 0];

    constructor(
        @Inject(PLATFORM_ID) private _platformId: Object,
        @Inject(DOCUMENT) private _document: Document,
        private _viewportScroller: ViewportScroller,
    ) { }

    lockBody(lock: boolean, scrollToTop?: boolean) {
        if (isPlatformBrowser(this._platformId)) {
            const isLocked = this._document.body.hasAttribute('style');
            const window = this._document.defaultView;

            if (lock) {
                if (isLocked) {
                    return;
                }

                if (scrollToTop) {
                    this._viewportScroller.scrollToPosition([0, 0]);
                }
                
                this.lastScrollPosition = this._viewportScroller.getScrollPosition();

                const lockPositionStyle = `
                    position: fixed;
                    left: 0;
                    width: 100%;
                    height: 100%;
                `;

                this._document.body.setAttribute('style', lockPositionStyle);
                this._document.body.style.top = `-${this.lastScrollPosition[1]}px`;
            }

            else if (this._document.body.hasAttribute('style')) {
                this._document.body.removeAttribute('style');
                this._viewportScroller.scrollToPosition(this.lastScrollPosition);
            }
        }
    }
}