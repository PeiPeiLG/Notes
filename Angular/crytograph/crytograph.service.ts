import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root',
})
export class CryptographService {
  k = 'IamAscretKey';

  constructor() {}

  get iv(): CryptoJS.lib.WordArray {
    const iv = CryptoJS.enc.Utf8.parse(this.k);
    return iv;
  }

  get kk(): CryptoJS.lib.WordArray {
    const kk = CryptoJS.enc.Utf8.parse(this.k);
    return kk;
  }

  encryptData(data: string): string {
    const dataGet = CryptoJS.AES.encrypt(data, this.kk, {
      iv: this.iv,
    });
    return dataGet.toString();
  }

  decryptData(data: string): string {
    const dataGet = CryptoJS.AES.decrypt(data, this.kk, {
      iv: this.iv,
    });

    return dataGet.toString(CryptoJS.enc.Utf8);
  }

}
