# 檔案壓縮 & 生成 readAsDataURL

## npm 下載路徑&文件
檔案壓縮
https://www.npmjs.com/package/compressorjs
```
npm i compressorjs
```

## 簡述
將圖片做檔案壓縮並且回生成data格式圖片

CompressorService 檔案壓縮
ReadAsDataURLService 圖片做成ReadAsDataURL

## 實際運用
```typescript
constructor(
    private compressorService: CompressorService,
    private readAsDataURLService: ReadAsDataURLService
){}
```
```html
<input type="file" accept=".jpg, .jpeg, .png"
(change)="onFileChange($event)"/>
```

```typescript
  onFileChange($event: any): void {
    const fileData = $event.target.files[0];
    const type = fileData.type.split('/');
    if(type[1] != 'png' || type[1] != 'jpeg' || type[1] != 'jpg' ){alret('檔案格式錯誤'); return}

    const fileSzieLimit = 700 * 1024;//700KB
    //maxWidth(圖片壓縮後寬度)、convertSize(超過多少開始壓縮)、quality(壓縮質量)
    const options: Compressor.Options = {
      maxWidth: 320,
      convertSize: fileSzieLimit,
      quality: 0.9
    }

    if (fileData && fileData.size > fileSzieLimit) {
      this.compressorService.compressionImg$(fileData, options).pipe(
        switchMap(v =>{
            // v 為壓縮後的檔案:File 
            return this.readAsDataURLService.doReadAsDataURL$(v);
        })
      ).subscribe(v =>{
        // v 為圖片做成ReadAsDataURL後圖片網址:string
        this.imgUrl = v;
      })
    }
  }
```