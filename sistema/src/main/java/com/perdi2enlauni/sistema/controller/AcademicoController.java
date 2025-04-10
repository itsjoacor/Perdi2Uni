package com.perdi2enlauni.sistema.controller;

import com.perdi2enlauni.sistema.body.LoginUserBody;
import com.perdi2enlauni.sistema.model.Academico;
import com.perdi2enlauni.sistema.service.interfaces.AcademicoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/perdi2enlauni")
public class AcademicoController {

    @Autowired
    private AcademicoService academicoService;

    private static final Logger logger = LoggerFactory.getLogger(AcademicoController.class);

    @PostMapping("/registro")
    public String registro(@RequestBody Academico academico) {
        academicoService.guardarAcademico(academico);
        return "Se agregó el nuevo usuario académico";
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginUserBody loginUserBody) {
        Academico academico = academicoService.encontrarPorLogin(loginUserBody.getCorreo(), loginUserBody.getContrasenia());
        if (academico != null) {
            return "Bienvenido " + academico.getNombre();
        } else {
            return "Credenciales incorrectas";
        }
    }

}
