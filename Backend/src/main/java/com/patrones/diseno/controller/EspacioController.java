package com.patrones.diseno.controller;

import com.patrones.diseno.model.Espacio;
import com.patrones.diseno.service.EspacioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/espacios")
public class EspacioController {

    @Autowired
    private EspacioService espacioService;

    @GetMapping
    public List<Espacio> obtenerEspacios() {
        return espacioService.obtenerTodosLosEspacios();
    }

    @PostMapping
    public Espacio crearEspacio(@RequestBody Espacio espacio) {
        return espacioService.crearEspacio(espacio);
    }

    @PutMapping("/{id}")
    public Espacio editarEspacio(@PathVariable Long id, @RequestBody Espacio espacioActualizado) {
        return espacioService.editarEspacio(id, espacioActualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarEspacio(@PathVariable Long id) {
        espacioService.eliminarEspacio(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public Espacio obtenerEspacioPorId(@PathVariable Long id) {
        return espacioService.obtenerEspacioPorId(id);
    }

    @GetMapping("/disponibles")
    public ResponseEntity<List<Espacio>> obtenerEspaciosDisponibles() {
        try {
            List<Espacio> espacios = espacioService.obtenerEspaciosDisponibles();
            return ResponseEntity.ok(espacios);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

