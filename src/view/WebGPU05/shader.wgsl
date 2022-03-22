// vertex shader 顶点部分
// builtin 是啥意思  position 应该是一个输入的参数，至于 Position 应该就是输出的接口类型
// 解释： builtin 是一个内置输入值的标识符，类似 new function 等，在 builtin() 后面的括号中可以跟随
struct Output {
    // 定义输出的类型
    // 但是这里的 position 是咋回事，还能在接口中输入参数么？？？
    @builtin(position) Position : vec4<f32>;
    @location(0) vColor : vec4<f32>;
}

@stage(vertex)
fn vs_main(@location(0) pos:vec4<f32>, @location(1) color : vec4<f32>) -> Output {
    //  这里我的理解，pos 就是顶点的坐标，是位于 location(0) 上，color 就是输入的颜色值范围，位置是  @location(1) 上
    var output : Output;
    output.Position = pos;
    output.vColor = color;
    return output;
}


// fragment shader
@stage(fragment)
fn fs_main(@location(0) vColor:vec4<f32>) -> @location(0) vec4<f32> {
    // 这里输入和输出是一个类型的，更像是泛型一样的
    return vColor;
}