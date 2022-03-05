## webgpu 01
这个章节主要是处理 webgpu 的代码怎么同步平移到 react 中

## 🪲 声明接口
在写 ts 的时候，需要把每个参数接口的声明都要声明好，要不然 ts 会报错，代码如下

```ts
    const commandEncoder = device.createCommandEncoder();
    const textureView = gpu.context.getCurrentTexture().createView();
    const colorAttachmentsGPURenderPassColorAttachment: GPURenderPassColorAttachment[] = [
        {
            view: textureView,
            loadValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
            loadOp: "load",
            storeOp: "store",
        },
    ];
    const renderPassDescriptor: GPURenderPassDescriptor = {
        colorAttachments: colorAttachmentsGPURenderPassColorAttachment,
    };
```

虽然 colorAttachmentsGPURenderPassColorAttachment 变量的值结构是按照 ts 的接口类型写的，但是如果后面没有跟上 GPURenderPassColorAttachment 的话，直接放上去就会报错，编译无法通过。ts 是好东西。

## GPU 缓冲区的选择
Gpu 缓冲区的选择有多个和单个，他们是各有优劣，需要针对性的去选择和使用。
下图是 GPU 缓存区的架构图
![gpu架构](/src/assets/gpu/gpu_struct.png)

以前我们是把顶点坐标和色彩信息直接写到处理器中的着色器中，一般来说着色器的代码我们是用文本写的，他没有语法提示，存取句法等，这种着色器代码就很难调试，现在我们可以用 ts 将着色器顶点和颜色信息写入 ts 缓冲区中，这样的话，我们调试起来就容易多了。

### 单个缓冲区

单个 GPU 缓冲区，数据结构是如下的，单个的好处就是我们可以很清晰的看到当前的缓冲区，优点就是简单。缺点就是不能将数据重复使用。

```ts

// 正方形是有四个顶点的，中心点是 0 0 那么 A 左上角就是 -0.5 -0.5
    const vertexData = new Float32Array([
        -0.5, -0.5, // vertex 顶点 A
        -0.5, 0.5, // 顶点
    ])


    const vertexData = new Float32Array([
        //position    //color
        -0.5, -0.5,   1, 0, 0,  // vertex a
        -0.5, 0.5,    1, 1, 0,  // vertex d
        0.5, -0.5,    0, 1, 0,  // vertex b
        0.5, -0.5,    0, 1, 0,  // vertex b
        -0.5, 0.5,    1, 1, 0,  // vertex d
        0.5, 0.5,     0, 0, 1   // vertex c
    ]);
```

### 多个缓冲区

现在假设我们有一个多面的立方体，只给三种颜色进行渲染，如果我们用单一缓冲区的话，就会造成内存的浪费，因为要多开辟空间么，还会浪费 GPU 和 CPU 的计算资源的。