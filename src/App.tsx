import { Link } from "react-router-dom";

function App() {
  return (
    <div className="front-page">
      <Link to="./home">跳转到 home</Link>
      <Link to="./header">跳转到 Header</Link>
    </div>
  );
}

export default App;
