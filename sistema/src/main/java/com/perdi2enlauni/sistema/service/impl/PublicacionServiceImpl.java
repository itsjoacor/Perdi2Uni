package com.perdi2enlauni.sistema.service.impl;

import com.perdi2enlauni.sistema.body.PublicacionBody;
import com.perdi2enlauni.sistema.model.*;
import com.perdi2enlauni.sistema.model.enums.EstadoDePublicacion;
import com.perdi2enlauni.sistema.repository.PublicacionRepository;
import com.perdi2enlauni.sistema.service.interfaces.AcademicoService;
import com.perdi2enlauni.sistema.service.interfaces.PublicacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.time.LocalDate;
import java.util.List;

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
        LocalDate fecha = publicacionBody.getFecha();
        Time hora = publicacionBody.getHora();
        String dni = publicacionBody.getDni();
        String lugarDeExtravio = publicacionBody.getLugarDeExtravio();

        Usuario academico = academicoService.encontrarAcademicoPorDni(dni);

        Publicacion publicacion = new Publicacion(descripcion, fecha, hora, academico, lugarDeExtravio);

        return publicacionRepository.save(publicacion);
    }

    @Override
    public List<Publicacion> getPublicacionesPorFecha(LocalDate fecha) { return publicacionRepository.findByFecha(fecha); }

    @Override
    public List<Publicacion> getPublicacionesPorEstadoDePublicacion(EstadoDePublicacion estadoDePublicacion) {
        return publicacionRepository.findByEstadoDePublicacion(estadoDePublicacion);
    }

    @Override
    public List<Publicacion> findByFechaAndEstadoDePublicacion(LocalDate fecha, EstadoDePublicacion estado) {
        return publicacionRepository.findByFechaAndEstadoDePublicacion(fecha, estado);
    }

    @Override
    public List<Publicacion> publicacionesDelUsuario(String correo) {
        return publicacionRepository.getPublicacionesDelUsuario(correo);
    }

    @Override
    public void deletePublicacion(int id) {
        publicacionRepository.deleteById(id);
    }

    @Override
    public Publicacion cambiarEstado(int id, EstadoDePublicacion nuevoEstadoDePublicacion) {
        Publicacion publicacion = publicacionRepository.findById(id).orElse(null);

        if (publicacion == null) {
            return null;
        }

        publicacion.cambiarEstado(nuevoEstadoDePublicacion);

        return publicacionRepository.save(publicacion);
    }
}