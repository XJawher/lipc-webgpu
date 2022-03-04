import { Link } from "react-router-dom";

import { CheckWebGPU } from "@/help";
import { useEffect, useState } from "react";

function App() {
  const [ttest] = useState(CheckWebGPU());

  useEffect(() => {
    console.log(ttest);
  });

  return (
    <div className="front-page">
      <Link to="./home">跳转到 home</Link>
      <Link to="./header">跳转到 Header</Link>
    </div>
  );
}

export default App;
