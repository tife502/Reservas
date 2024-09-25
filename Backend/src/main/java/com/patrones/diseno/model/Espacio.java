package com.patrones.diseno.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "ESPACIO")
public class Espacio {
    @Id
    @GeneratedValue
    private Long id;

    private String nombre;
    private String descripcion;
    private int capacidad;
    private boolean disponible;

    @OneToMany(mappedBy = "espacio", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Reserva> reservas;

}
