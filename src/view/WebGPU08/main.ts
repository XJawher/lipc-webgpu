import { InitGPU, CreateGPUBuffer } from '@/help';
import { Shaders } from './shaders';

export const CreateSquare = async () => {
    const gpu = await InitGPU('WebGPU08');
    const device = gpu.device;

    const vertexData = new Float32Array([
        //position    //color
        -0.5, -0.5, 1, 0, 0,  // vertex a
        -0.5, 0.5, 1, 1, 0,  // vertex d
        0.5, -0.5, 0, 1, 0,  // vertex b
        0.5, -0.5, 0, 1, 0,  // vertex b
        -0.5, 0.5, 1, 1, 0,  // vertex d
        0.5, 0.5, 0, 0, 1   // vertex c
    ]);

    const vertexBuffer = CreateGPUBuffer(device, vertexData);

    const shader = Shaders();

    //  attributes 属性中的 offset 代表 buffer 从那个位置开始算
    const attributesGPUVertexAttribute: GPUVertexAttribute[] = [
        {
            shaderLocation: 0,
            format: "float32x2",
            // 这里就代表从 0 开始，
            offset: 0,
        },
        {
            shaderLocation: 1,
            format: "float32x3",
            // 这里就代表从 8 开始，因为总长是 4 * 2 + 4 * 3
            // 也就是前面的 4 * 2 结束了，从 8 开始了 是字节
            offset: 8,
        },
    ];

    const pipeline = device.createRenderPipeline({
        vertex: {
            module: device.createShaderModule({
                code: shader.vertex,
            }),
            entryPoint: "main",
            buffers: [
                // 单一的缓冲区，buffer 就变成了一个，这时候就需要在 attributes 和 arrayStride 中做改变
                {
                    // arrayStride 变成 4 * (2 + 3) 的原因是 4 代表四个字节, 2 代表前面的顶点数据
                    // 而 3 代表后面的颜色数据是三个
                    arrayStride: 4 * (2 + 3),
                    attributes: attributesGPUVertexAttribute,
                },
            ],
        },
        fragment: {
            module: device.createShaderModule({
                code: shader.fragment,
            }),
            entryPoint: "main",
            targets: [
                {
                    format: gpu.format as GPUTextureFormat,
                },
            ],
        },
        primitive: {
            topology: "triangle-list",
        },
    });

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
    const renderPass = commandEncoder.beginRenderPass(renderPassDescriptor);
    renderPass.setPipeline(pipeline);
    renderPass.setVertexBuffer(0, vertexBuffer);
    renderPass.draw(6);
    renderPass.end();

    device.queue.submit([commandEncoder.finish()]);
}






