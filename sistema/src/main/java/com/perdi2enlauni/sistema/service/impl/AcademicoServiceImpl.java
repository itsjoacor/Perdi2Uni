package com.perdi2enlauni.sistema.service.impl;

import com.perdi2enlauni.sistema.model.Academico;
import com.perdi2enlauni.sistema.model.Usuario;
import com.perdi2enlauni.sistema.repository.AcademicoRepository;
import com.perdi2enlauni.sistema.service.exceptions.EncontrarException;
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
        Optional<Usuario> academicoCorreo = academicoRepository.findByCorreo(academico.getCorreo());
        Optional<Usuario> academicoDni = academicoRepository.findByDni(academico.getDni());
        if (academicoCorreo.isPresent()) {
            throw new RegistroException("El correo ya está registrado");
        }
        else if (academicoDni.isPresent()) {
            throw new RegistroException("El DNI ya está registrado");
        }
        else {
            academico.setRol("academico");
            return academicoRepository.save(academico);
        }
    }

    @Override
    public List<Usuario> recuperarTodos() {
        return academicoRepository.findAll();
    }

    @Override
    public Usuario encontrarPorId(int id) {
        return academicoRepository.findById(id).orElse(null);
    }

    @Override
    public Usuario encontrarPorLogin(String correo, String contrasenia) throws LoginException {
        Optional<Usuario> academicoCorreo = academicoRepository.findByCorreo(correo);

        if (academicoCorreo.isPresent() && academicoCorreo.get().getContrasenia().equals(contrasenia)) {
            return academicoCorreo.get();
        } else if (academicoCorreo.isPresent()) {
            throw new LoginException("Contraseña incorrecta");
        }
        else {
            throw new LoginException("Correo no registrado");
        }

    }

    @Override
    public Usuario encontrarAcademicoPorDni(String dni) throws LoginException {
        Optional<Usuario> academico= academicoRepository.findByDni(dni);
        if (academico.isPresent()) {
            return academico.get();
        } else {
            throw new EncontrarException("No existe el usuario con el DNI: " + dni);
        }
    }

    @Override
    public Usuario encontrarAcademicoPorCorreo(String correo) {
        Optional<Usuario> academico = academicoRepository.findByCorreo(correo);
        if (academico.isPresent()) {
            return academico.get();
        } else {
            return null;
        }
    }

}
