import { Observable, Subscriber } from 'rxjs';
import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReadAsDataURLService {

  constructor(
    private _ngZon: NgZone
  ) { }

  doReadAsDataURL$(file: File): Observable<string>{
    return new Observable((subscriber) => {

      const successEvent = (result:string) => {
        subscriber.next(result);
      }
      const dataUrl = (input: File) => {
        this._ngZon.run(() => {
          var reader = new FileReader();
          reader.readAsDataURL(input);
          reader.onload = function (e) {
            successEvent(String(e.target!.result));
          }
        });
      }
      dataUrl(file);
      return function unsubscribe() {
        subscriber.next();
        subscriber.complete();
      }
    });
  }
}
