package com.perdi2enlauni.sistema.body;

import com.perdi2enlauni.sistema.model.enums.Universidad;

import java.sql.Time;
import java.time.LocalDate;
import java.util.Date;


public class PublicacionBody {

    private String descripcion;
    private LocalDate fecha;
    private Time hora;
    private String dni;
    private String lugarDeExtravio;
    private Universidad universidad;

    public PublicacionBody() {}
    public PublicacionBody(String descripcion, LocalDate fecha, Time hora, String dni, String lugarDeExtravio, Universidad universidad) {
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.hora = hora;
        this.dni = dni;
        this.lugarDeExtravio = lugarDeExtravio;
        this.universidad = universidad;
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

    public Universidad getUniversidad() { return universidad;}
}