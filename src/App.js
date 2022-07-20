import { Routes, Route } from "react-router-dom";
import Home from "./routes/home";
import Trains from "./routes/trains";
import Trams from "./routes/trams";

export const timeout = 60;
export const tick = 5000;

const App = () => {
  return (
    <Routes>
      <Route>
        <Route index element={<Home />} />
        <Route path="/trains" element={<Trains />} />
        <Route path="/trams" element={<Trams />} />
      </Route>
    </Routes>
  );
};

export default App;
