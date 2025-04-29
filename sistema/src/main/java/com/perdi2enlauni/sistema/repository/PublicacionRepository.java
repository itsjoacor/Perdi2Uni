package com.perdi2enlauni.sistema.repository;

import com.perdi2enlauni.sistema.model.Academico;
import com.perdi2enlauni.sistema.model.Publicacion;
import com.perdi2enlauni.sistema.model.enums.EstadoDePublicacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Date;

@Repository
public interface PublicacionRepository extends JpaRepository<Publicacion, Integer> {
    Optional<Publicacion> findByDescripcion(String descripci);
    List<Publicacion> findByFecha(LocalDate fecha);

    @Query("SELECT p FROM Publicacion p WHERE p.estadoDePublicacion = :estado")
    List<Publicacion> findByEstadoDePublicacion(EstadoDePublicacion estado);

    @Query("SELECT p FROM Publicacion p WHERE p.fecha = :fecha AND p.estadoDePublicacion = :estado")
    List<Publicacion> findByFechaAndEstadoDePublicacion(LocalDate fecha, EstadoDePublicacion estado);
}
