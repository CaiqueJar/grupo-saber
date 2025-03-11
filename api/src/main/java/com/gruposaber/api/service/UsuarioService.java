package com.gruposaber.api.service;

import com.gruposaber.api.dto.UsuarioDTO;
import com.gruposaber.api.model.Usuario;
import com.gruposaber.api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public Usuario criarUsuario(UsuarioDTO usuarioDTO) {
        if (usuarioRepository.existsByEmail(usuarioDTO.getEmail())) {
            throw new RuntimeException("Email já cadastrado");
        }

        if (usuarioRepository.existsByCpf(usuarioDTO.getCpf())) {
            throw new RuntimeException("CPF já cadastrado");
        }

        Usuario novoUsuario = new Usuario();
        novoUsuario.setNomeCompleto(usuarioDTO.getNomeCompleto());
        novoUsuario.setEmail(usuarioDTO.getEmail());
        novoUsuario.setSenhaHash(passwordEncoder.encode(usuarioDTO.getSenha()));
        novoUsuario.setCpf(usuarioDTO.getCpf());
        novoUsuario.setTelefoneCelular(usuarioDTO.getTelefoneCelular());

        // Verifique se esta linha está sendo executada sem erros
        return usuarioRepository.save(novoUsuario);
    }
    // Outros métodos (listar, atualizar, deletar) mantidos como no exemplo anterior
}