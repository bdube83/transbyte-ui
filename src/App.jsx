import { Home, Results } from "./components";
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Results />} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;
