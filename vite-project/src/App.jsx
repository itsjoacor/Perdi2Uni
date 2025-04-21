import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Perfil from "./pages/Perfil";
import Publicar from "./pages/Publicar";
import AdminUsuarios from "./pages/AdminUsuarios";
import DardeBaja from "./pages/DarDeBaja";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/publicar" element={<Publicar />} />
        <Route path="/darDeBaja" element={<DardeBaja />} />
        <Route path="/administrar-usuarios" element={<AdminUsuarios />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;