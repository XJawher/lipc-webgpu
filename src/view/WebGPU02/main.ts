import { InitGPU, CreateGPUBuffer } from '@/help';
import shader from './shader.wgsl';
import { Shaders } from './shaders';

export const CreateTriangle = async () => {
    const gpu = await InitGPU('WebGPU02');
    const device = gpu.device;

    const format = 'bgra8unorm';

    const shader = Shaders('(31.0,14.0,13.0,1.0)');
    const pipeline = device.createRenderPipeline({
        vertex: {
            module: device.createShaderModule({
                code: shader.vertex
            }),
            entryPoint: "main"
        },
        fragment: {
            module: device.createShaderModule({
                code: shader.fragment
            }),
            entryPoint: "main",
            targets: [{
                format: format as GPUTextureFormat
            }]
        },
        primitive: {
            topology: "triangle-list",
        }
    });

    const commandEncoder = device.createCommandEncoder();
    const textureView = gpu.context.getCurrentTexture().createView();
    const colorAttachmentsGPURenderPassColorAttachment: GPURenderPassColorAttachment[] = [
        {
            view: textureView,
            clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
            loadOp: "clear",
            storeOp: "store",
            loadValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 }, //background color
        },
    ];
    const renderPassDescriptor: GPURenderPassDescriptor = {
        colorAttachments: colorAttachmentsGPURenderPassColorAttachment,
    };
    const renderPass = commandEncoder.beginRenderPass(renderPassDescriptor);
    renderPass.setPipeline(pipeline);
    renderPass.draw(3);
    renderPass.end();
    device.queue.submit([commandEncoder.finish()]);
}






