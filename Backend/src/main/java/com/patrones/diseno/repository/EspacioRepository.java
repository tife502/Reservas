package com.patrones.diseno.repository;

import com.patrones.diseno.model.Espacio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EspacioRepository extends JpaRepository<Espacio, Long> {
    List<Espacio> findByDisponible(boolean disponible);
}
