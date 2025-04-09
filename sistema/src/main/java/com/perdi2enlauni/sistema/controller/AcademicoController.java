package com.perdi2enlauni.sistema.controller;

import com.perdi2enlauni.sistema.model.Academico;
import com.perdi2enlauni.sistema.service.AcademicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/perdi2enlauni")
public class AcademicoController {

    @Autowired
    private AcademicoService academicoService;

    @PostMapping("/registro")
    public String registro(@RequestBody Academico academico) {
        academicoService.saveAcademico(academico);
        return "Se agregó el nuevo usuario académico";
    }
}
