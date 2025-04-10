package com.perdi2enlauni.sistema.service.interfaces;

import com.perdi2enlauni.sistema.model.Academico;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AcademicoService {

    Academico guardarAcademico(Academico academico);

    List<Academico> recuperarTodos();

    Academico encontrarPorId(int id);

    Academico encontrarPorLogin(String correo, String contrasenia);
}
