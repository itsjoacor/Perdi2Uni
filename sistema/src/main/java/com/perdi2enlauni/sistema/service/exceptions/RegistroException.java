package com.perdi2enlauni.sistema.service.exceptions;

import org.apache.coyote.BadRequestException;

public class RegistroException extends BadRequestException {
    public RegistroException(String message) {
        super(message);
    }
}
