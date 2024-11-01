package com.patrones.diseno.patrones;

import com.patrones.diseno.model.Espacio;
import com.patrones.diseno.model.Reserva;
import com.patrones.diseno.model.Usuario;

import java.time.LocalDate;
import java.time.LocalTime;


public class ReservaFactory {

    public static Reserva crearReserva(Usuario usuario, Espacio espacio, LocalDate fecha, LocalTime horaInicio, LocalTime horaFin) {
        Reserva reserva = new Reserva();
        reserva.setUsuario(usuario);
        reserva.setEspacio(espacio);
        reserva.setFecha(fecha);
        reserva.setHoraInicio(horaInicio);
        reserva.setHoraFin(horaFin);
        return reserva;
    }
}