package com.perdi2enlauni.sistema.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.perdi2enlauni.sistema.model.enums.EstadoDePublicacion;
import jakarta.persistence.*;
import java.sql.Time;
import java.time.LocalDate;

@Entity
public class Publicacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String descripcion;
    private LocalDate fecha;
    private Time hora;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    private Usuario usuario;
    @Enumerated(EnumType.STRING)
    private EstadoDePublicacion estadoDePublicacion = EstadoDePublicacion.EN_BUSQUEDA;

    public Publicacion() {
    }

    public Publicacion(String descripcion, LocalDate fecha, Time hora, Usuario usuario) {
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.hora = hora;
        this.usuario = usuario;
        this.estadoDePublicacion = EstadoDePublicacion.EN_BUSQUEDA;
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

    public void cambiarEstado(EstadoDePublicacion nuevoEstadoDePublicacion) {
        this.estadoDePublicacion = nuevoEstadoDePublicacion;
    }
}