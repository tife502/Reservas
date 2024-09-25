package com.patrones.diseno.service;

import com.patrones.diseno.model.Espacio;
import com.patrones.diseno.repository.EspacioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class EspacioService {

    @Autowired
    private EspacioRepository espacioRepository;

    public List<Espacio> obtenerTodosLosEspacios() {
        return espacioRepository.findAll();
    }

    public Espacio crearEspacio(Espacio espacio) {
        espacio.setDisponible(true);
        return espacioRepository.save(espacio);
    }

    public Espacio editarEspacio(Long id, Espacio espacioActualizado) {
        try {
            Espacio espacio = espacioRepository.findById(id)
                    .orElseThrow();

            espacio.setNombre(espacioActualizado.getNombre());
            espacio.setCapacidad(espacioActualizado.getCapacidad());
            espacio.setDisponible(espacioActualizado.isDisponible());

            return espacioRepository.save(espacio);
        } catch (NoSuchElementException e) {
            throw new RuntimeException("Espacio no encontrado con id: " + id);
        }
    }

    public void eliminarEspacio(Long id) {
        try {
            Espacio espacio = espacioRepository.findById(id)
                    .orElseThrow();
            espacioRepository.delete(espacio);
        } catch (NoSuchElementException e) {
            throw new RuntimeException("Espacio no encontrado con id: " + id);
        }
    }

    public Espacio obtenerEspacioPorId(Long id) {
        try {
            return espacioRepository.findById(id)
                    .orElseThrow();
        } catch (NoSuchElementException e) {
            throw new RuntimeException("Espacio no encontrado con id: " + id);
        }
    }

    public List<Espacio> obtenerEspaciosDisponibles() {
        return espacioRepository.findByDisponible(true);
    }
}


