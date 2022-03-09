import { InitGPU, CreateGPUBuffer } from '@/help';
import { Shaders } from './shaders';

export const CreateTriangle = async (color: string = '(91.0, 226.0, 35.0,1.0)') => {
    const { context, device, size } = await InitGPU('WebGPU01');

    const shader = Shaders(color);
    const format = 'bgra8unorm';

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
    const textureView = context.getCurrentTexture().createView();
    const colorAttachmentsGPURenderPassColorAttachment: GPURenderPassColorAttachment[] = [
        {
            view: textureView,
            // loadValue: { r: 0.5, g: 0.5, b: 0.8, a: 1.0 }, // background color
            loadValue: [0.5, 0.5, 0.8, 1],
            storeOp: 'store',
            loadOp: 'clear',
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