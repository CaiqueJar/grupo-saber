package com.gruposaber.api.controller;

import com.gruposaber.api.dto.UsuarioDTO;
import com.gruposaber.api.model.Usuario;
import com.gruposaber.api.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<?> criarUsuario(@Valid @RequestBody UsuarioDTO usuarioDTO) {
        try {
            Usuario usuarioCriado = usuarioService.criarUsuario(usuarioDTO);
            return new ResponseEntity<>(usuarioCriado, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Outros métodos (listar, buscar por ID, atualizar, deletar) mantidos como no exemplo anterior
}