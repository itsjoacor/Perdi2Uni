package com.perdi2enlauni.sistema.service;

import com.perdi2enlauni.sistema.model.Usuario;
import com.perdi2enlauni.sistema.repository.UsuarioRepository;
import com.perdi2enlauni.sistema.service.interfaces.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public Usuario buscarPorCorreo(String correo) {
        return usuarioRepository.findByCorreo(correo);
    }

    @Override
    public void actualizarContrasenia(Usuario usuario) {
        usuarioRepository.save(usuario); // guarda sin importar si es Admin o Academico
    }
}
