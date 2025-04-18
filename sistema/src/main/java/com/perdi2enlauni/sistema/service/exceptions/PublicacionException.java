package com.perdi2enlauni.sistema.service.exceptions;

import org.apache.coyote.BadRequestException;

public class PublicacionException extends BadRequestException {
    public PublicacionException(String message) {
        super(message);
    }
}
