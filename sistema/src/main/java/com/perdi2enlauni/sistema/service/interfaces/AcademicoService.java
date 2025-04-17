package com.perdi2enlauni.sistema.service.interfaces;

import com.perdi2enlauni.sistema.model.Academico;
import com.perdi2enlauni.sistema.service.exceptions.EncontrarException;
import com.perdi2enlauni.sistema.service.exceptions.RegistroException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface AcademicoService {

    Academico guardarAcademico(Academico academico) throws RegistroException;

    List<Academico> recuperarTodos();

    Academico encontrarPorId(int id);

    Academico encontrarAcademicoPorDni(String dni) throws EncontrarException;

    String encontrarPorLogin(String correo, String contrasenia);
}
