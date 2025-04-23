package com.perdi2enlauni.sistema.body;

import java.sql.Time;
import java.time.LocalDate;
import java.util.Date;


public class PublicacionBody {

    private String descripcion;
    private LocalDate fecha;
    private Time hora;
    private String dni;
    private String lugarDeExtravio;

    public PublicacionBody() {}
    public PublicacionBody(String descripcion, LocalDate fecha, Time hora, String dni, String lugarDeExtravio) {
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.hora = hora;
        this.dni = dni;
        this.lugarDeExtravio = lugarDeExtravio;
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

    public String getLugarDeExtravio() { return lugarDeExtravio; }
}