import { Home, Results, HowItWorks, Feedback } from "./components";
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
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/search" element={<Results />} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;
