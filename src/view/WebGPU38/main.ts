import { LightInputs } from './shaders';
import { CreateShapeWithTexture } from './texture';
import { SimpleSurfaceData } from './surface-data';
import { Peaks } from './math-func';

export const CreateShape = async (ul: number, vl: number, li: LightInputs = {}, textureFile: string,
    addressModeU: GPUAddressMode, addressModeV: GPUAddressMode, isAnimation = true) => {
    const data = SimpleSurfaceData(Peaks, -3, 3, -3, 3, 51, 51, 2, 0, '', [0, 0, 0], ul, vl);
    await CreateShapeWithTexture(data?.vertexData!, data?.normalData!, data?.uvData!, textureFile, addressModeU, addressModeV, li, isAnimation);
}