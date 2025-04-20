package com.perdi2enlauni.sistema.model;

import jakarta.persistence.*;

@Entity
public class Admin extends Usuario {

    public Admin() {
        super();
        this.setRol("Admin");
    }

    public Admin(int id, String nombre, String correo, String dni, String contrasenia) {
        super(id, nombre, correo, dni, contrasenia, "Admin");
    }
}
