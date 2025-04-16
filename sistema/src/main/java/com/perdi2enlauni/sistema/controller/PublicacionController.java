package com.perdi2enlauni.sistema.controller;

import com.perdi2enlauni.sistema.model.Academico;
import com.perdi2enlauni.sistema.model.Publicacion;
import com.perdi2enlauni.sistema.service.exceptions.PublicacionException;
import com.perdi2enlauni.sistema.service.exceptions.RegistroException;
import com.perdi2enlauni.sistema.service.interfaces.AcademicoService;
import com.perdi2enlauni.sistema.service.interfaces.PublicacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.support.AbstractCacheManager;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/publicaciones")
public class PublicacionController {

    @Autowired
    private PublicacionService publicacionService;
    private AcademicoService academicoService;

    @GetMapping("/")
    public List<Publicacion> getPublicaciones() {
        return publicacionService.getPublicaciones();
    }

    @PostMapping("/publicar")
    public Publicacion publicar(@RequestBody Publicacion publicacion, String dni) {
        // hacer el  fetch del ID en la DB
        //registrarle a la public el dni
        return publicacionService.publicar(publicacion);
    }


}