import { useEffect } from "react";

import { CreateTriangle } from "./main";
import { changedTitle } from "@/help";

function WebGPU01() {
  useEffect(() => {
    changedTitle(`WebGPU01 绘制三角形`);
    CreateTriangle("(91.0, 226.0, 35.0, 1.0)");
  }, []);

  return (
    <div className="WebGPU-common">
      WebGPU01
      <h1>Create Triangle</h1>
      <canvas id="WebGPU01" width="640" height="480"></canvas>
    </div>
  );
}

export default WebGPU01;
