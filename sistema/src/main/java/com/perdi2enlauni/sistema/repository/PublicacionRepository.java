package com.perdi2enlauni.sistema.repository;

import com.perdi2enlauni.sistema.model.Academico;
import com.perdi2enlauni.sistema.model.Publicacion;
import com.perdi2enlauni.sistema.model.enums.EstadoDePublicacion;
import com.perdi2enlauni.sistema.model.enums.Universidad;
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

    @Query("SELECT p FROM Publicacion p WHERE p.usuario.correo = :correoUsuario")
    List<Publicacion> getPublicacionesDelUsuario( String correoUsuario);

    @Query("SELECT COUNT(p) FROM Publicacion p WHERE p.estadoDePublicacion = :estadoDePublicacion")
    int cantPublicacionesEnEstado(EstadoDePublicacion estadoDePublicacion);

    @Query("SELECT p FROM Publicacion p WHERE p.universidad = :universidad")
    List<Publicacion> findByUniversidad(@Param("universidad") Universidad universidad);

    @Query("SELECT p FROM Publicacion p WHERE p.fecha = :fecha AND p.universidad = :universidad")
    List<Publicacion> findByFechaAndUniversidad(@Param("fecha") LocalDate fecha, @Param("universidad") Universidad universidad);

    @Query("SELECT p FROM Publicacion p WHERE p.estadoDePublicacion = :estado AND p.universidad = :universidad")
    List<Publicacion> findByEstadoAndUniversidad(@Param("estado") EstadoDePublicacion estado, @Param("universidad") Universidad universidad);

    @Query("SELECT p FROM Publicacion p WHERE p.fecha = :fecha AND p.estadoDePublicacion = :estado AND p.universidad = :universidad")
    List<Publicacion> findByFechaAndEstadoAndUniversidad(@Param("fecha") LocalDate fecha, @Param("estado") EstadoDePublicacion estado, @Param("universidad") Universidad universidad);


}
