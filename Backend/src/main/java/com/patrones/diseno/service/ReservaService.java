package com.patrones.diseno.service;

import com.patrones.diseno.patrones.ReservaFactory;
import com.patrones.diseno.model.Espacio;
import com.patrones.diseno.model.Reserva;
import com.patrones.diseno.model.Usuario;
import com.patrones.diseno.repository.EspacioRepository;
import com.patrones.diseno.repository.ReservaRepository;
import com.patrones.diseno.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class ReservaService {
    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private EspacioRepository espacioRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Reserva> findAll() {
        return reservaRepository.findAll();
    }

    public Reserva crearReserva(Long usuarioId, Long espacioId, LocalDate fecha, LocalTime horaInicio, LocalTime horaFin) {
        Usuario usuario = usuarioRepository.findById(usuarioId).orElseThrow();
        Espacio espacio = espacioRepository.findById(espacioId).orElseThrow();

        if (!espacio.isDisponible()) {
            throw new RuntimeException("El espacio no está disponible");
        }

        Reserva reserva = ReservaFactory.crearReserva(usuario, espacio, fecha, horaInicio, horaFin);


        return reservaRepository.save(reserva);
    }

    public boolean verificarDisponibilidad(Long espacioId, LocalDate fecha, LocalTime horaInicio, LocalTime horaFin) {
        // Lógica para verificar si hay reservas en el rango de tiempo solicitado
        return reservaRepository.countByEspacioIdAndFechaAndHoraInicioLessThanEqualAndHoraFinGreaterThanEqual(
                espacioId, fecha, horaInicio, horaFin) == 0;
    }

    public List<Reserva> obtenerReservasPorEspacioYFecha(Long espacioId, LocalDate fecha) {
        return reservaRepository.findByEspacioIdAndFecha(espacioId, fecha);
    }

}
