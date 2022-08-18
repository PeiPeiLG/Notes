import { Injectable, NgZone } from '@angular/core';
import Compressor from 'compressorjs';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompressorService {

  constructor(
    private _ngZon: NgZone
  ) { }
  compressionImg$(
    file: File,
    option: Compressor.Options
  ): Observable<File> {
    return new Observable((subscriber) => {

      // 成功後將檔案轉回File格式並發射出去
      const successEvent = (result: Blob) => {
        const fileGet = new File([result], file.name, {
          type: result.type,
        });
        subscriber.next(fileGet);
      }

      const compressor = (input: File, option?: Compressor.Options) => {
        new Compressor(input, {
          ...option,
          success: (res) => {
            this._ngZon.run(() => {
              if (option?.convertSize) {
                if (res.size > option.convertSize) {
                  compressor(res as File, {
                    ...option,
                    quality: option.quality! - 0.1
                  });
                } else {
                  successEvent(res);
                }
              } else {
                successEvent(res);
              }
            });
          },
          error: (err) => subscriber.error(err),
        });
      };
      compressor(file, option);

      return function unsubscribe() {
        subscriber.next();
        subscriber.complete();
      }
    })
  }
}
