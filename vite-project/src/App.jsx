import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Perfil from "./pages/Perfil";
import Publicar from "./pages/Publicar";
import AdminUsuarios from "./pages/AdminUsuarios";
import DardeBaja from "./pages/DarDeBaja";
import MisPublicaciones from "./pages/MisPublicaciones";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/misPublicaciones" element={<MisPublicaciones/>} />
        <Route path="/publicar" element={<Publicar />} />
        <Route path="/dar-de-baja" element={<DardeBaja />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;