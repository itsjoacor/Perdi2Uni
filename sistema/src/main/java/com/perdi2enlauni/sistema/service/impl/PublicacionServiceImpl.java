package com.perdi2enlauni.sistema.service.impl;

import com.perdi2enlauni.sistema.model.Publicacion;
import com.perdi2enlauni.sistema.repository.PublicacionRepository;
import com.perdi2enlauni.sistema.service.interfaces.PublicacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PublicacionServiceImpl implements PublicacionService {

    @Autowired
    private PublicacionRepository publicacionRepository;

    @Override
    public List<Publicacion> getPublicaciones() {
        return publicacionRepository.findAll();
    }
}
