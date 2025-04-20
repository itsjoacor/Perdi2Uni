package com.perdi2enlauni.sistema.model;

import jakarta.persistence.*;
import java.sql.Time;
import java.time.LocalDate;
import java.util.Date;

@Entity
public class Publicacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String descripcion;
    private LocalDate fecha;
    private Time hora;

    @ManyToOne
    @JoinColumn(name = "academico_id", nullable = false)
    private Academico academico;

    public Publicacion() {
    }

    public Publicacion(String descripcion, LocalDate fecha, Time hora, Academico academico) {
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.hora = hora;
        this.academico = academico;
    }

    public int getId() {
        return id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public Time getHora() {
        return hora;
    }

    public Academico getAcademico() {
        return academico;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public void setHora(Time hora) {
        this.hora = hora;
    }

    public void setAcademico(Academico academico) {
        this.academico = academico;
    }
}
