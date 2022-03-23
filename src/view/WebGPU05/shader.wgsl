@block struct Uniforms {
    // 4 * 4 的一个矩阵
    mvpMartrix : mat4x4<f32>;
};

// 这一句啥意思
@binding(0) , @group(0) var<uniform> uniforms : Uniforms

// 定义好输出的接口类型
struct Output {
    @builtin(position) Position : vec4<f32>;
    @location(0) Vcolor : vec4<f32>;
}

@stage(vertex)
fn main(@location(0) pos : vec4<f32>, @location(1) color : vec4<f32>) -> Output {
    var output : Output;
    output.position = uniforms.mvpMartrix * pos;
    output.vColor = color;
    return output;
}

@stage(fragment)
fn main(@location(0) vColor:vec4<f32>) -> @location(0) vec4<f32> {
    return vColor;
}