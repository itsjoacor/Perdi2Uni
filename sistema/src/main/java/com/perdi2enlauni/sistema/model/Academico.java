package com.perdi2enlauni.sistema.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Academico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String nombre;
    private String correo;
    private String dni;
    private String contrasenia;

    @OneToMany(mappedBy = "academico", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Publicacion> publicaciones;

    public Academico() {
    }

    public Academico(int id, String nombre, String correo, String dni, String contrasenia) {
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.dni = dni;
        this.contrasenia = contrasenia;
    }

    public int getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getCorreo() {
        return correo;
    }

    public String getDni() {
        return dni;
    }

    public String getContrasenia() {
        return contrasenia;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public void setContrasenia(String contrasenia) {
        this.contrasenia = contrasenia;
    }

}
