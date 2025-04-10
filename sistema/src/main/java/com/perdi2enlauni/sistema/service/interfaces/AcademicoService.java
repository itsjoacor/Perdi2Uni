package com.perdi2enlauni.sistema.service.interfaces;

import com.perdi2enlauni.sistema.model.Academico;
import com.perdi2enlauni.sistema.service.exceptions.RegistroException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AcademicoService {

    Academico guardarAcademico(Academico academico) throws RegistroException;

    List<Academico> recuperarTodos();

    Academico encontrarPorId(int id);

    String encontrarPorLogin(String correo, String contrasenia);
}
