package com.perdi2enlauni.sistema.service.interfaces;

import com.perdi2enlauni.sistema.model.Usuario;

public interface UsuarioService {
    Usuario buscarPorCorreo(String correo);
    void actualizarContrasenia(Usuario usuario);
}