import { Suspense, useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Suspense fallback={<h1>Loading...</h1>}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
