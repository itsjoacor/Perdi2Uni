package com.perdi2enlauni.sistema.config;

import com.perdi2enlauni.sistema.model.Admin;
import com.perdi2enlauni.sistema.model.Academico;
import com.perdi2enlauni.sistema.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;

    public DataLoader(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (usuarioRepository.count() == 0) {
            // Create and save an Admin user
            Admin admin = new Admin(
                    "Admin",
                    "admin@gmail.com",
                    "1111111",
                    "admin"
            );
            usuarioRepository.save(admin); // Now this will work

            // Create and save an Academic user
            Academico academico = new Academico(
                    "Academico",
                    "academic@gmail.com",
                    "22222222",
                    "academico"
            );
            usuarioRepository.save(academico);

            System.out.println("Initial users loaded successfully!");
        }
    }
}