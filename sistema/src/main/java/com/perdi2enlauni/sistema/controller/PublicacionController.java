package com.perdi2enlauni.sistema.controller;

import com.perdi2enlauni.sistema.model.Publicacion;
import com.perdi2enlauni.sistema.service.interfaces.AcademicoService;
import com.perdi2enlauni.sistema.service.interfaces.PublicacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/publicaciones")
public class PublicacionController {

    @Autowired
    private PublicacionService publicacionService;

    @GetMapping("/")
    public List<Publicacion> getPublicaciones() {
        return publicacionService.getPublicaciones();
    }



}
