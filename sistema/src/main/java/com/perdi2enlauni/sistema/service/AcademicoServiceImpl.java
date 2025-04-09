package com.perdi2enlauni.sistema.service;

import com.perdi2enlauni.sistema.model.Academico;
import com.perdi2enlauni.sistema.repository.AcademicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AcademicoServiceImpl implements AcademicoService {

    @Autowired
    private AcademicoRepository academicoRepository;

    @Override
    public Academico saveAcademico(Academico academico) {
        return academicoRepository.save(academico);
    }

}
