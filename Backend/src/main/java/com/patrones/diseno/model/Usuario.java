package com.patrones.diseno.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "USUARIO")
public class Usuario {
    @Id
    @GeneratedValue
    private Long id;

    private String nombre;
    private String email;
    private String password;
}
