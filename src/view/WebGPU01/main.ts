import { InitGPU, CreateGPUBuffer } from '@/help';
import { Shaders } from './shaders';

export const CreateSquare = async () => {
    const gpu = await InitGPU('WebGPU01');
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

    const attributesGPUVertexAttribute: GPUVertexAttribute[] = [
        {
            shaderLocation: 0,
            format: "float32x2",
            offset: 0,
        },
        {
            shaderLocation: 1,
            format: "float32x3",
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
                {
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
    const colorAttachments1: GPURenderPassColorAttachment[] = [
        {
            view: textureView,
            loadValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
            loadOp: "load",
            storeOp: "store",
        },
    ];
    const renderPassDescriptor: GPURenderPassDescriptor = {
        colorAttachments: colorAttachments1,
    };
    const renderPass = commandEncoder.beginRenderPass(renderPassDescriptor);
    renderPass.setPipeline(pipeline);
    renderPass.setVertexBuffer(0, vertexBuffer);
    renderPass.draw(6);
    renderPass.end();

    device.queue.submit([commandEncoder.finish()]);
}






