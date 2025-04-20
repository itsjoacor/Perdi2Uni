package com.perdi2enlauni.sistema.body;

import java.sql.Time;
import java.time.LocalDate;
import java.util.Date;


public class PublicacionBody {

    private String descripcion;
    private LocalDate fecha;
    private Time hora;
    private String dni;

    public PublicacionBody() {}
    public PublicacionBody(String descripcion, LocalDate fecha, Time hora, String dni) {
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.hora = hora;
        this.dni = dni;
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

    public String getDni() {
        return dni;
    }
}