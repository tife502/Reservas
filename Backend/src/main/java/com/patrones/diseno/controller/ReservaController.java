package com.patrones.diseno.controller;

import com.patrones.diseno.model.Reserva;
import com.patrones.diseno.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reservas")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @PostMapping
    public Reserva crearReserva(@RequestParam Long usuarioId,
                                @RequestParam Long espacioId,
                                @RequestParam LocalDate fecha,
                                @RequestParam LocalTime horaInicio,
                                @RequestParam LocalTime horaFin) {
        return reservaService.crearReserva(usuarioId, espacioId, fecha, horaInicio, horaFin);
    }

    @GetMapping
    public List<Reserva> obtenerReservas() {
        return reservaService.findAll();
    }

    @GetMapping("/disponibilidad")
    public ResponseEntity<?> verificarDisponibilidad(
            @RequestParam Long espacioId,
            @RequestParam LocalDate fecha,
            @RequestParam LocalTime horaInicio,
            @RequestParam LocalTime horaFin) {
        boolean disponible = reservaService.verificarDisponibilidad(espacioId, fecha, horaInicio, horaFin);
        return ResponseEntity.ok(Map.of("disponible", disponible));
    }

    @GetMapping("/ocupadas")
    public List<Reserva> obtenerReservasOcupadas(
            @RequestParam Long espacioId,
            @RequestParam LocalDate fecha) {
        return reservaService.obtenerReservasPorEspacioYFecha(espacioId, fecha);
    }
}
