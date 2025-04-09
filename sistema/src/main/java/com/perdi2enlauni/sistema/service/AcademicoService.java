package com.perdi2enlauni.sistema.service;

import com.perdi2enlauni.sistema.model.Academico;
import org.springframework.stereotype.Service;

@Service
public interface AcademicoService {

    Academico saveAcademico(Academico academico);

}
