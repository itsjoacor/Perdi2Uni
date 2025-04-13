package com.perdi2enlauni.sistema.service.interfaces;

import com.perdi2enlauni.sistema.model.Publicacion;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PublicacionService {
    List<Publicacion> getPublicaciones();
}
