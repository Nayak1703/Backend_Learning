import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import config from "./ipConfig.json";

export const SERVER = `http://${config.workspaceIp}:8082`;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
