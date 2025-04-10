package com.perdi2enlauni.sistema.repository;

import com.perdi2enlauni.sistema.model.Academico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AcademicoRepository extends JpaRepository<Academico, Integer> {

    Optional<Academico> findByCorreoAndContrasenia(String correo, String contrasenia);

    Optional<Academico> findByCorreo(String correo);

    Optional<Academico> findByDni(String dni);
}
