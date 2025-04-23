package com.perdi2enlauni.sistema.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
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
    private String lugarDeExtravio;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    private Usuario usuario;
    public Publicacion() {
    }

    public Publicacion(String descripcion, LocalDate fecha, Time hora, Usuario usuario, String lugarDeExtravio) {
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.hora = hora;
        this.usuario = usuario;
        this.lugarDeExtravio = lugarDeExtravio;
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

    public Usuario getAcademico() {
        return usuario;
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

    public void setAcademico(Usuario usuario) {
        this.usuario = usuario;
    }

    public String getLugarDeExtravio() { return lugarDeExtravio; }

    public void setLugarDeExtravio(String lugarDeExtravio) { this.lugarDeExtravio = lugarDeExtravio; }
}