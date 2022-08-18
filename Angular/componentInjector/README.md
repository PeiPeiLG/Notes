# 動態生成component

## 簡述
將component動態生成，且動態去除component
(不適用在需呼叫API之component上，如果使用會造成反覆呼叫API)

LockBodyScrollService得部分是生成時產生的一些動畫效果，還沒研究要怎麼改

## 實際運用
```typescript
constructor(
    private private componentInjector: ComponentInjectorService
){}
```
生成component
```typescript
// injectComponent(需生成之component,{ 放置需生成之component內需@Input()的值 })
this.componentInjector.injectComponent(ErrarDialogComponent, { errorMessage: v.Result!.Alert, displayModal: true });
```
去除component
```typescript
this.componentInjector.disposeComponent(ErrarDialogComponent);
```