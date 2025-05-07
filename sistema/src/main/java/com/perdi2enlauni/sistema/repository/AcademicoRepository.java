package com.perdi2enlauni.sistema.repository;

import com.perdi2enlauni.sistema.model.Academico;
import com.perdi2enlauni.sistema.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AcademicoRepository extends JpaRepository<Usuario, Integer> {

    Optional<Usuario> findByCorreoAndContrasenia(String correo, String contrasenia);

    Optional<Usuario> findByCorreo(String correo);

    Optional<Usuario> findByDni(String dni);

    List<Academico> findByCorreoStartingWith(String string);

    Optional<Academico> findAcademicoByCorreo(String string);
}
