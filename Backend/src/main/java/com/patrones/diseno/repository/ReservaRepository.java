package com.patrones.diseno.repository;

import com.patrones.diseno.model.Espacio;
import com.patrones.diseno.model.Reserva;
import com.patrones.diseno.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    List<Reserva> findByUsuario(Usuario usuario);

    List<Reserva> findByEspacio(Espacio espacio);

    long countByEspacioIdAndFechaAndHoraInicioLessThanEqualAndHoraFinGreaterThanEqual(
            Long espacioId,
            LocalDate fecha,
            LocalTime horaInicio,
            LocalTime horaFin);

    List<Reserva> findByEspacioIdAndFecha(Long espacioId, LocalDate fecha);
}

