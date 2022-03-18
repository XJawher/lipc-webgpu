export const Shaders = (color: string) => {
    const vertex = `
        @stage(vertex)
        fn main(@builtin(vertex_index) VertexIndex: u32) -> @builtin(position) vec4<f32> {
            var pos = array<vec2<f32>, 5>(
                vec2<f32>( -0.9,  0.9),
                vec2<f32>( 0.0,  0.0),
                vec2<f32>( -0.9,  -0.9),
                vec2<f32>( 0.9,  -0.9),
                vec2<f32>( 0.9,  0.9)
            );
            return vec4<f32>(pos[VertexIndex], 0.0, 1.0);
        }
    `;

    const fragment = `
        @stage(fragment)
        fn main() -> @location(0) vec4<f32> {
            return vec4<f32>${color};
        }
    `;
    return { vertex, fragment };
}