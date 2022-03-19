import { InitGPU, CreateGPUBuffer } from '@/help';
import shader from './shader.wgsl';


export const CreateGPUMachine = async (baseInfo: BaseInfo, topology: GPUPrimitiveTopology = 'triangle-list') => {
    const gpu = await InitGPU(baseInfo.id);
    const device = gpu.device;

    const format = 'bgra8unorm';
    // x^2+y^2+a*x=a*sqrt(x^2+y^2) 和 x^2+y^2-a*x=a*sqrt(x^2+y^2）
    const vertexData = new Float32Array([
        -0.5, 0.5, // a
        0.0, 0.0,  // b
        -0.5, 0.0, // c
        0.0, 0.0,  // b
        0.5, 0.0,  // d
        0.5, 0.5,  // e
    ]);

    const colorData = new Float32Array([
        1, 0, 0,   // a  red
        0, 1, 0,   // b  green
        0, 0, 1,   // c  blue
        0, 0, 1,   // c  blue
        1, 1, 0,   // d  red
        1, 0, 1,   // e  red
    ])

    // const

    const vertexBuffer = CreateGPUBuffer(device, vertexData);
    const colorBuffer = CreateGPUBuffer(device, colorData);

    const buffersGPUVertexBufferLayout: GPUVertexBufferLayout[] = [
        {
            arrayStride: 8,
            attributes: <GPUVertexAttribute[]>[
                {
                    shaderLocation: 0,
                    format: "float32x2",
                    offset: 0,
                }
            ]
        },
        {
            arrayStride: 12,
            attributes: <GPUVertexAttribute[]>[
                {
                    shaderLocation: 1,
                    format: "float32x3",
                    offset: 0,
                }
            ]
        },
    ]

    const pipeline = device.createRenderPipeline({
        vertex: {
            module: device.createShaderModule({
                code: shader
            }),
            entryPoint: "vs_main",
            buffers: buffersGPUVertexBufferLayout
        },
        fragment: {
            module: device.createShaderModule({
                code: shader
            }),
            entryPoint: "fs_main",
            targets: [{
                format: format as GPUTextureFormat
            }]
        },
        primitive: {
            topology: topology
        }
    });

    const commandEncoder = device.createCommandEncoder();
    const textureView = gpu.context.getCurrentTexture().createView();
    const colorAttachmentsGPURenderPassColorAttachment: GPURenderPassColorAttachment[] = [
        {
            view: textureView,
            clearValue: { r: 1.0, g: 1.0, b: 1.0, a: 1.0 },
            loadOp: "clear",
            storeOp: "store",
            loadValue: { r: 1.0, g: 1.0, b: 1.0, a: 1.0 }, //background color
        },
    ];
    const renderPassDescriptor: GPURenderPassDescriptor = {
        colorAttachments: colorAttachmentsGPURenderPassColorAttachment,
    };
    const renderPass = commandEncoder.beginRenderPass(renderPassDescriptor);
    renderPass.setPipeline(pipeline);
    renderPass.setVertexBuffer(0, vertexBuffer);
    renderPass.setVertexBuffer(1, colorBuffer);
    renderPass.draw(6);
    renderPass.end();
    device.queue.submit([commandEncoder.finish()]);
}






