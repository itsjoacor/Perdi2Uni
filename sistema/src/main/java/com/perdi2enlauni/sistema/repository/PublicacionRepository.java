package com.perdi2enlauni.sistema.repository;

import com.perdi2enlauni.sistema.model.Academico;
import com.perdi2enlauni.sistema.model.Publicacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PublicacionRepository extends JpaRepository<Publicacion, Integer> {
    Optional<Publicacion> findByDescripcion(String descripci);
}
