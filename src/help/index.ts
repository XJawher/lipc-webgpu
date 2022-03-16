import { changedTitle } from "./changedTitle";

export const CreateGPUBuffer = (device: GPUDevice, data: Float32Array,
    usageFlag: GPUBufferUsageFlags = GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST) => {
    const buffer = device.createBuffer({
        size: data.byteLength,
        usage: usageFlag,
        mappedAtCreation: true
    });
    new Float32Array(buffer.getMappedRange()).set(data);
    buffer.unmap();
    return buffer;
}

export const InitGPU = async (idString = "canvas-webgpu") => {
    const checkgpu = CheckWebGPU();
    if (checkgpu.includes('Your current browser does not support WebGPU!')) {
        throw new Error('Your browser does not support WebGPU');
    }
    const canvas = document.getElementById(idString) as HTMLCanvasElement;
    const adapter = await navigator.gpu?.requestAdapter();
    const device = await adapter?.requestDevice() as GPUDevice;
    const context = canvas.getContext('webgpu') as GPUCanvasContext;

    const devicePixelRatio = window.devicePixelRatio || 1;
    const size = [
        canvas.clientWidth * devicePixelRatio,
        canvas.clientHeight * devicePixelRatio,
    ];
    const format = context.getPreferredFormat(adapter!);

    context.configure({
        device: device,
        format: format,
        size: size
    });
    return { device, canvas, format, context, size };
};

export const CheckWebGPU = () => {
    let result = 'Great, your current browser supports WebGPU!';
    if (!navigator.gpu) {
        result = `Your current browser does not support WebGPU! Make sure you are on a system
                     with WebGPU enabled.Currently, SPIR - WebGPU is only supported in
            <a href="https://www.google.com/chrome/canary/" > Chrome canary < /a>
        with the flag "enable-unsafe-webgpu" enabled.See the
            < a href = "https://github.com/gpuweb/gpuweb/wiki/Implementation-Status" >
                Implementation Status < /a> page for more details.
                    `;
    }
    return result;
}

export { changedTitle };