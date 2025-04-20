package com.perdi2enlauni.sistema.service.impl;

import com.perdi2enlauni.sistema.body.PublicacionBody;
import com.perdi2enlauni.sistema.model.Academico;
import com.perdi2enlauni.sistema.model.Publicacion;
import com.perdi2enlauni.sistema.model.Usuario;
import com.perdi2enlauni.sistema.repository.PublicacionRepository;
import com.perdi2enlauni.sistema.service.interfaces.AcademicoService;
import com.perdi2enlauni.sistema.service.interfaces.PublicacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PublicacionServiceImpl implements PublicacionService {

    @Autowired
    private PublicacionRepository publicacionRepository;
    private AcademicoService academicoService;

    public PublicacionServiceImpl(AcademicoService academicoService) {
        this.academicoService = academicoService;
    }

    @Override
    public List<Publicacion> getPublicaciones() {
        return publicacionRepository.findAll();
    }

    @Override
    public Publicacion publicar(PublicacionBody publicacionBody) {
        String descripcion = publicacionBody.getDescripcion();
        Date fecha = publicacionBody.getFecha();
        Time hora = publicacionBody.getHora();
        String dni = publicacionBody.getDni();

        Usuario academico = academicoService.encontrarAcademicoPorDni(dni);

        Publicacion publicacion = new Publicacion(descripcion, fecha, hora, academico);

        return publicacionRepository.save(publicacion);
    }
}