package com.perdi2enlauni.sistema.model;

import jakarta.persistence.*;

import java.sql.Time;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
public class Publicacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String descripcion;
    private Date fecha;
    private Time hora;

    @ManyToOne
    @JoinColumn(name = "academico_id", nullable = false)
    private Academico academico;

    public Publicacion() {
    }
    public Publicacion(String descripcion, Date fecha, Time hora, int id) {
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.hora = hora;
        this.id = id;
    }

    public Publicacion(String descripcion, Date fecha, Time hora) {
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.hora = hora;
    }
}
