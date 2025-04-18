package com.perdi2enlauni.sistema.model;

import jakarta.persistence.*;

import java.sql.Time;
import java.time.LocalDateTime;
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
    @JoinColumn(name = "academico_id", nullable = false)
    private Academico academico;

    public Publicacion() {
    }
    public Publicacion(String descripcion, Date fecha, Time hora, Academico academico) {
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.hora = hora;
        this.academico = academico;
    }

    public void setDescripcion(String descripcion){this.descripcion = descripcion;};
    public void setFecha(Date fecha){this.fecha = fecha;};
    public void setHora(Time hora){this.hora = hora;};
    public void setAcademico(Academico academico){this.academico = academico;};
}
