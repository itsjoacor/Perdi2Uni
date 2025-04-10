package com.perdi2enlauni.sistema.service.impl;

import com.perdi2enlauni.sistema.model.Academico;
import com.perdi2enlauni.sistema.repository.AcademicoRepository;
import com.perdi2enlauni.sistema.service.interfaces.AcademicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AcademicoServiceImpl implements AcademicoService {

    @Autowired
    private AcademicoRepository academicoRepository;

    @Override
    public Academico guardarAcademico(Academico academico) {
        return academicoRepository.save(academico);
    }

    @Override
    public List<Academico> recuperarTodos() {
        return academicoRepository.findAll();
    }

    @Override
    public Academico encontrarPorId(int id) {
        return academicoRepository.findById(id).orElse(null);
    }

    @Override
    public Academico encontrarPorLogin(String correo, String contrasenia) {
        Optional<Academico> usuario = academicoRepository.findByCorreoAndContrasenia(correo, contrasenia);

        if (usuario.isPresent()) {
            return usuario.get();
        } else {
            return null;
        }

    }

}
