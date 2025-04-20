package com.perdi2enlauni.sistema.model;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("Admin")
public class Admin extends Usuario {

    public Admin() {
        super();
    }

    public Admin(String nombre, String correo, String dni, String contrasenia) {
        super(nombre, correo, dni, contrasenia);
    }
}