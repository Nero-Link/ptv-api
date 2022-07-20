import { Routes, Route } from "react-router-dom";
import Home from "./routes/home";
import Config from "./routes/config";
import Trains from "./routes/trains";
import Trams from "./routes/trams";

const App = () => {
  return (
    <Routes>
      <Route>
        <Route index element={<Home />} />
        <Route path="/config" element={<Config />} />
        <Route path="/trains" element={<Trains />} />
        <Route path="/trams" element={<Trams />} />
      </Route>
    </Routes>
  );
};

export default App;
