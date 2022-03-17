import { useEffect, useState } from "react";
import { CreateTriangle } from "./main";

import { Select } from "antd";

const { Option } = Select;

function WebGPU02() {
  const [topology, setTopology] = useState("line-list");

  useEffect(() => {
    CreateTriangle(topology as GPUPrimitiveTopology);
  });

  function handleChange(value: string) {
    setTopology(value);
  }

  return (
    <div className="WebGPU-common WebGPU02-class">
      <div>
        <Select
          defaultValue="line-list"
          style={{ width: 120 }}
          onChange={handleChange}
        >
          <Option value="point-list">点列表point-list</Option>
          <Option value="line-list">线列表line-list</Option>
          <Option value="triangle-list">三角形triangle-list</Option>
          <Option value="triangle-strip">triangle-strip</Option>
        </Select>
      </div>
      <canvas id="WebGPU02" width="640" height="480"></canvas>
    </div>
  );
}

export default WebGPU02;
