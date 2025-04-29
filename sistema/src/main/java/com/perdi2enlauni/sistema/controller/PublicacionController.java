package com.perdi2enlauni.sistema.controller;

import com.perdi2enlauni.sistema.body.PublicacionBody;
import com.perdi2enlauni.sistema.model.enums.EstadoDePublicacion;
import com.perdi2enlauni.sistema.model.Publicacion;
import com.perdi2enlauni.sistema.service.interfaces.AcademicoService;
import com.perdi2enlauni.sistema.service.interfaces.PublicacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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
    public Publicacion publicar(@RequestBody PublicacionBody publicacionBody) {
        return publicacionService.publicar(publicacionBody);
    }

    @GetMapping("/filtroFecha")
    public List<Publicacion> getPublicacionesPorFecha(
            @RequestParam("fecha") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fecha) {
        return publicacionService.getPublicacionesPorFecha(fecha);
    }

    @GetMapping("/filtroEstado")
    public List<Publicacion> getPublicacionesPorEstado(
            @RequestParam("estado") EstadoDePublicacion estado) {
        System.out.println("Estado recibido: " + estado); // Para depuración
        return publicacionService.getPublicacionesPorEstadoDePublicacion(estado);
    }


    @GetMapping("/filtroCombinado")
    public List<Publicacion> getPublicacionesPorFechaYEstado(
            @RequestParam("fecha") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fecha,
            @RequestParam("estado") EstadoDePublicacion estado) {
        return publicacionService.findByFechaAndEstadoDePublicacion(fecha, estado);
    }

    @PutMapping("/{id}/estado")
    public ResponseEntity<Publicacion> cambiarEstado(@PathVariable("id") int id,@RequestBody EstadoDePublicacion nuevoEstadoDePublicacion) {

        Publicacion publicacion = publicacionService.cambiarEstado(id, nuevoEstadoDePublicacion);

        if (publicacion == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(publicacion);
    }

}