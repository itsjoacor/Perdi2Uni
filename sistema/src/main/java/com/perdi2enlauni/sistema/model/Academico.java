package com.perdi2enlauni.sistema.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Academico extends Usuario {

    @OneToMany(mappedBy = "academico", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Publicacion> publicaciones;

    public Academico() {
        super();
        this.setRol("Normal"); // Set the role to "Normal" for Academico
    }

    public Academico(int id, String nombre, String correo, String dni, String contrasenia) {
        super(id, nombre, correo, dni, contrasenia, "Normal"); // Set the role to "Normal" for Academico
    }

    public List<Publicacion> getPublicaciones() {
        return publicaciones;
    }

    public void setPublicaciones(List<Publicacion> publicaciones) {
        this.publicaciones = publicaciones;
    }
}
