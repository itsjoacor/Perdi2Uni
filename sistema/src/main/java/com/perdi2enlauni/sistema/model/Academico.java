package com.perdi2enlauni.sistema.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@DiscriminatorValue("Normal")
public class Academico extends Usuario {

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Publicacion> publicaciones;

    public Academico() {
        super();
    }

    public Academico(String nombre, String correo, String dni, String contrasenia) {
        super(nombre, correo, dni, contrasenia);
    }

    public List<Publicacion> getPublicaciones() {
        return publicaciones;
    }

    public void setPublicaciones(List<Publicacion> publicaciones) {
        this.publicaciones = publicaciones;
    }
}