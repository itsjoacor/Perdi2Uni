package com.perdi2enlauni.sistema.service.interfaces;

import com.perdi2enlauni.sistema.model.Academico;
import com.perdi2enlauni.sistema.model.Usuario;
import com.perdi2enlauni.sistema.service.exceptions.EncontrarException;
import com.perdi2enlauni.sistema.service.exceptions.RegistroException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AcademicoService {

    Academico guardarAcademico(Academico academico) throws RegistroException;

    List<Usuario> recuperarTodos();

    Usuario encontrarPorId(int id);

    Usuario encontrarAcademicoPorDni(String dni) throws EncontrarException;

    Usuario encontrarPorLogin(String correo, String contrasenia);

    Usuario encontrarAcademicoPorCorreo(String correo);
}
