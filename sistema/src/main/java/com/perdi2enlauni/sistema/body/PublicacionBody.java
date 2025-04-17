package com.perdi2enlauni.sistema.body;

import java.sql.Time;
import java.util.Date;


public class PublicacionBody {

    private String descripcion;
    private Date fecha;
    private Time hora;
    private String dni;

    public PublicacionBody() {}
    public PublicacionBody(String descripcion, Date fecha, Time hora, String dni) {
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.hora = hora;
        this.dni = dni;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Date getFecha() {
        return fecha;
    }

    public Time getHora() {
        return hora;
    }

    public String getDni() {
        return dni;
    }
}