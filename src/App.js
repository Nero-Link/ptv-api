import { Routes, Route } from "react-router-dom";
import Home from "./routes/home";
import Trains from "./routes/trains";

const App = () => {
  return (
    <Routes>
      <Route>
        <Route index element={<Home />} />
        <Route path="/trains" element={<Trains />} />
        {/* <Route path="/trams" element={<Trams />} /> */}
      </Route>
    </Routes>
  );
};

export default App;
