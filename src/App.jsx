import "normalize.css";
import "./App.css";
import SnakeGame from "./components/SnakeGame";

function App() {
  return (
    <div className="container text-center">
      <h1 className="mt-3">Snake game with react</h1>
      <SnakeGame />
    </div>
  );
}

export default App;
