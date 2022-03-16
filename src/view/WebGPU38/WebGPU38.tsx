import { useEffect } from "react";
import { CreateShape } from "./main";
import { LightInputs } from "./shaders";

// $('#id-radio input:radio').on('click', function () {
//     let val = $('input[name="options"]:checked').val();
//     if (val === 'animation') isAnimation = true;
//     else isAnimation = false;
//     CreateShape(ul, vl, li, textureFile, addressModeU, addressModeV, isAnimation);
// });

// $('#btn-redraw').on('click', function () {
//     ul = parseFloat($('#id-ulength').val()?.toString() as string);
//     vl = parseFloat($('#id-vlength').val()?.toString() as string);
//     li.shininess = $('#id-shininess').val()?.toString() as string;
//     CreateShape(ul, vl, li, textureFile, addressModeU, addressModeV, isAnimation);
// });

// $('#id-image').on('change', function () {
//     const ele = this as any;
//     textureFile = ele.options[ele.selectedIndex].value + '.png';
//     CreateShape(ul, vl, li, textureFile, addressModeU, addressModeV, isAnimation);
// });

// $('#id-addressu').on('change', function () {
//     const ele = this as any;
//     addressModeU = ele.options[ele.selectedIndex].value as GPUAddressMode;
//     CreateShape(ul, vl, li, textureFile, addressModeU, addressModeV, isAnimation);
// });

// $('#id-addressv').on('change', function () {
//     const ele = this as any;
//     addressModeV = ele.options[ele.selectedIndex].value;
//     CreateShape(ul, vl, li, textureFile, addressModeU, addressModeV, isAnimation);
// });

function WebGPU38() {
  let textureFile = "brick.png";
  let addressModeU = "repeat" as GPUAddressMode;
  let addressModeV = "repeat" as GPUAddressMode;
  let li: LightInputs = {};
  let isAnimation = true;
  let ul = 1;
  let vl = 1;
  useEffect(() => {
    CreateShape(
      ul,
      vl,
      li,
      textureFile,
      addressModeU,
      addressModeV,
      isAnimation
    );
    function reportWindowSize() {
      CreateShape(
        ul,
        vl,
        li,
        textureFile,
        addressModeU,
        addressModeV,
        isAnimation
      );
    }
    window.onresize = reportWindowSize;
  });

  return (
    <div
      className="WebGPU-common-38"
      onClick={() =>
        CreateShape(
          ul,
          vl,
          li,
          textureFile,
          addressModeU,
          addressModeV,
          isAnimation
        )
      }
    >
      WebGPU38
      <canvas id="WebGPU38" width="640" height="480"></canvas>
    </div>
  );
}

export default WebGPU38;
