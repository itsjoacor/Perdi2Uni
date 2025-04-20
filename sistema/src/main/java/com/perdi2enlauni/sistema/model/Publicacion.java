package com.perdi2enlauni.sistema.model;

import jakarta.persistence.*;
import java.sql.Time;
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
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;
    public Publicacion() {
    }

    public Publicacion(String descripcion, Date fecha, Time hora, Usuario usuario) {
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.hora = hora;
        this.usuario = usuario;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}