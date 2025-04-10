package com.perdi2enlauni.sistema.service.impl;

import com.perdi2enlauni.sistema.model.Academico;
import com.perdi2enlauni.sistema.repository.AcademicoRepository;
import com.perdi2enlauni.sistema.service.exceptions.LoginException;
import com.perdi2enlauni.sistema.service.exceptions.RegistroException;
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
    public Academico guardarAcademico(Academico academico) throws RegistroException {
        Optional<Academico> academicoCorreo = academicoRepository.findByCorreo(academico.getCorreo());
        Optional<Academico> academicoDni = academicoRepository.findByDni(academico.getDni());
        if (academicoCorreo.isPresent()) {
            throw new RegistroException("El correo ya está registrado");
        }
        else if (academicoDni.isPresent()) {
            throw new RegistroException("El DNI ya está registrado");
        }
        else {
            return academicoRepository.save(academico);
        }
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
    public String encontrarPorLogin(String correo, String contrasenia) throws LoginException {
        Optional<Academico> academicoCorreo = academicoRepository.findByCorreo(correo);

        if (academicoCorreo.isPresent() && academicoCorreo.get().getContrasenia().equals(contrasenia)) {
            return academicoCorreo.get().getNombre();
        } else if (academicoCorreo.isPresent()) {
            throw new LoginException("Contraseña incorrecta");
        }
        else {
            throw new LoginException("Correo no registrado");
        }

    }

}
