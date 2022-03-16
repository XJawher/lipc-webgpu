import { InitGPU, CreateGPUBuffer } from '@/help';
import { Shaders } from './shaders';

export const CreateTriangle = async (color: string = '(0.0,2.0,0.0,1.0)') => {
    const { context, device, size } = await InitGPU('WebGPU01');

    const shader = Shaders('(0.0,4.0,3.0,1.0)');
    const format = 'bgra8unorm';

    const pipeline = device.createRenderPipeline({
        label: 'web-1-createRenderPipeline',
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
    const textureView = context.getCurrentTexture().createView();
    const colorAttachmentsGPURenderPassColorAttachment: GPURenderPassColorAttachment[] = [
        {
            view: textureView,
            clearValue: { r: 1.0, g: 0.0, b: 0.0, a: 1.0 },
            loadOp: "clear",
            storeOp: "store",
            loadValue: { r: 1.0, g: 0.0, b: 0.0, a: 1.0 }, //background color
        }
    ]
    const colorAttachmentsRenderPass: GPURenderPassDescriptor = {
        colorAttachments: colorAttachmentsGPURenderPassColorAttachment
    }
    const renderPass = commandEncoder.beginRenderPass(colorAttachmentsRenderPass);

    renderPass.setPipeline(pipeline);
    renderPass.setViewport(
        0,
        0,
        size[0],
        size[1],
        0,
        1
    );
    renderPass.draw(3, 1, 0, 0);
    renderPass.end();
    device.queue.submit([commandEncoder.finish()]);

}