## 改变背景
```ts
  {
    view: textureView,
    clearValue: { r: 0.0, g: 0.0, b: 1.0, a: 1.0 },
    loadOp: "clear",
    storeOp: "store",
    loadValue: { r: 0.0, g: 0.0, b: 1.0, a: 1.0 }, //background color
    },
```

目前最新的文档是有以下的几个地方发生了变化
* 在最新的浏览器中,取消 [[ 改为 @;
* loadValue 将改为 loadop 和 clearvalue;
* stencilValue 将改为 loadop 和 clearvalue;
* endPass 将改为 end;

3-16 号的语法规则是这样的

```ts
interface GPURenderPassColorAttachment {
  /**
   * A {@link GPUTextureView} describing the texture subresource that will be output to for this
   * color attachment.
   */
//   输出的纹理资源的颜色附件，这个纹理的资源来自  gpu.context ，具体 context 有几个属性，configure unconfigure getPreferredFormat getCurrentTexture 分别对应着不同的函数功能
  view: GPUTextureView;
  /**
   * A {@link GPUTextureView} describing the texture subresource that will receive the resolved
   * output for this color attachment if {@link GPURenderPassColorAttachment#view} is
   * multisampled.
   */
// 这个和多重采样有关系，目前还没使用到，
  resolveTarget?: GPUTextureView;
  /**
   * Indicates the value to clear {@link GPURenderPassColorAttachment#view} to prior to executing the
   * render pass. If not map/exist|provided defaults to `{r: 0, g: 0, b: 0, a: 0}`. Ignored
   * if {@link GPURenderPassColorAttachment#loadOp} if not {@link GPULoadOp#"clear"}.
   */
//   如果没有映射或者提供存在的值的时候这的初始值就是白色 {r: 0, g: 0, b: 0, a: 0}，如果 GPULoadOp 的值不是 clear 那么
// 就忽略这里的值
  clearValue?: GPUColor;
  /**
   * Indicates the load operation to perform on {@link GPURenderPassColorAttachment#view} prior to
   * executing the render pass.
   * Note: It is recommended to prefer clearing; see {@link GPULoadOp#"clear"} for details.
   */
  loadOp: GPULoadOp;
  /** @deprecated Use loadOp and clearValue instead */
  loadValue?:
    | GPULoadOp
    | GPUColor;
  /**
   * The store operation to perform on {@link GPURenderPassColorAttachment#view}
   * after executing the render pass.
   */
  storeOp: GPUStoreOp;
}
```


