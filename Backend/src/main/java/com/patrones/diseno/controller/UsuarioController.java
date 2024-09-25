package com.patrones.diseno.controller;

import com.patrones.diseno.model.Usuario;
import com.patrones.diseno.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/registrar")
    public Usuario registrarUsuario(@RequestBody Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    @GetMapping
    public List<Usuario> obtenerUsuarios() {
        return usuarioRepository.findAll();
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUsuario(@RequestBody Usuario usuario) {
        Optional<Usuario> usuarioExistente = usuarioRepository.findByEmail(usuario.getEmail());

        if (usuarioExistente.isPresent()) {
            Usuario usuarioBD = usuarioExistente.get();
            if (usuarioBD.getPassword().equals(usuario.getPassword())) {
                Map<String, Object> response = new HashMap<>();
                response.put("mensaje", "Login exitoso");
                response.put("userId", usuarioBD.getId());

                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("mensaje", "Contraseña incorrecta"));
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("mensaje", "Usuario no encontrado"));
        }
    }
}

