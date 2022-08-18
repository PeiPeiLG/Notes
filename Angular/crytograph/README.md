# 加密解密

## npm下載路徑
https://www.npmjs.com/package/crypto-js

```
npm install crypto-js
```
Angular 需下載ts版本
```
npm install --save @types/crypto-js
```
## 簡述
crypto-js 是一個純 javascript 寫的加密算法類庫 ，可以非常方便地在 javascript 進行 MD5、SHA1、SHA2、SHA3、RIPEMD-160 哈希散列，進行 AES、DES、Rabbit、RC4、Triple DES 加解密。

k 為金鑰

## 實際運用

```typescript
constructor(
    private private cryptoService: CryptographService
){}
```
加密
```typescript
const data = this.cryptoService.encryptData(需加密之文字); //string > string
```

解密
```typescript
const data = this.cryptoService.decryptData(需解密文字); //string > string
```