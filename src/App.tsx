import { useState } from "react";
import reactLogo from "./assets/react.svg";
import logoDeybi from "./assets/Logo.svg";
import viteLogo from "/vite.svg";
// Shadcn Components
import { Smile } from "lucide-react";
import { Button } from "@/components/ui/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="bg-placeholder-input">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={logoDeybi} className="logo react w-" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="font-poppins"
        >
          count is {count}
        </button>
        <p className="font-prosto-one">
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Button>Click me</Button>

      <Smile color="#3e9392" />
    </>
  );
}

export default App;
