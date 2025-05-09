package com.perdi2enlauni.sistema.controller;

import com.perdi2enlauni.sistema.body.LoginUserBody;
import com.perdi2enlauni.sistema.model.Academico;
import com.perdi2enlauni.sistema.model.Publicacion;
import com.perdi2enlauni.sistema.model.Usuario;
import com.perdi2enlauni.sistema.service.exceptions.EncontrarException;
import com.perdi2enlauni.sistema.service.exceptions.LoginException;
import com.perdi2enlauni.sistema.service.exceptions.RegistroException;
import com.perdi2enlauni.sistema.service.interfaces.AcademicoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/academicos")
public class AcademicoController {

    @Autowired
    private AcademicoService academicoService;

    private static final Logger logger = LoggerFactory.getLogger(AcademicoController.class);

    @PostMapping("/registro")
    public ResponseEntity<?> registro(@RequestBody Academico academico) {
        try {
            academicoService.guardarAcademico(academico);
            return ResponseEntity.ok().build(); // si todo está bien
        } catch (RegistroException e) {
            return ResponseEntity.badRequest().body(e.getMessage()); // devuelve el mensaje al frontend
        }
    }

    @PostMapping("/login")
    public Usuario login(@RequestBody LoginUserBody loginUserBody) throws LoginException {
        return academicoService.encontrarPorLogin(loginUserBody.getCorreo(), loginUserBody.getContrasenia());
    }

    @GetMapping("/{string}")
    public List<String> correosDeAcademicosQueComiencenCon(@PathVariable String string) {
        return academicoService.correosDeAcademicosQueComiencenCon(string);
    }

    @DeleteMapping("/{string}")
    public ResponseEntity<?> eliminarAcademicoConCorreo(@PathVariable String string) {
        try {
            academicoService.eliminarAcademicoConCorreo(string);
            return ResponseEntity.ok().build(); // si todo está bien
        } catch (EncontrarException e) {
            return ResponseEntity.badRequest().body(e.getMessage()); // devuelve el mensaje al frontend
        }
    }

    @PutMapping("/actualizar")
    public ResponseEntity<?> actualizarAcademico(@RequestBody Academico academico) {
        try {
            academicoService.actualizarAcademico(academico);
            return ResponseEntity.ok().build();
        } catch (EncontrarException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }




}
