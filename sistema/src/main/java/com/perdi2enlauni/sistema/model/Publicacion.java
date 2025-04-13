package com.perdi2enlauni.sistema.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Publicacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private LocalDateTime fechaYHora;
    private String descripcion;

    @ManyToOne
    @JoinColumn(name = "academico_id", nullable = false)
    private Academico academico;

    public Publicacion() {
    }

    public Publicacion(int id, LocalDateTime fechaYHora, String descripcion, Academico academico) {
        this.id = id;
        this.fechaYHora = fechaYHora;
        this.descripcion = descripcion;
        this.academico = academico;
    }
}
