package com.perdi2enlauni.sistema.service.interfaces;

import com.perdi2enlauni.sistema.body.PublicacionBody;
import com.perdi2enlauni.sistema.model.enums.EstadoDePublicacion;
import com.perdi2enlauni.sistema.model.Publicacion;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public interface PublicacionService {
    List<Publicacion> getPublicaciones();

    Publicacion publicar(PublicacionBody publicacionBody);

    List<Publicacion> getPublicacionesPorFecha(LocalDate fecha);

    Publicacion cambiarEstado(int id, EstadoDePublicacion nuevoEstadoDePublicacion);

    List<Publicacion> getPublicacionesPorEstadoDePublicacion(EstadoDePublicacion estadoDePublicacion);

    List<Publicacion> findByFechaAndEstadoDePublicacion(LocalDate fecha, EstadoDePublicacion estado);

    List<Publicacion> publicacionesDelUsuario(String correo);

    void deletePublicacion(int id);

    int cantPublicacionesRecuperadas();
}
