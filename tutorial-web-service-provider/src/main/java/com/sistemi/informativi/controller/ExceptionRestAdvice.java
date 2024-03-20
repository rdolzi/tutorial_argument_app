package com.sistemi.informativi.controller;

import com.sistemi.informativi.exception.ErrorMessage;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Date;

@RestControllerAdvice
public class ExceptionRestAdvice {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(value= HttpStatus.BAD_REQUEST)
    public ErrorMessage notValidExceptionHandler(MethodArgumentNotValidException ex, WebRequest request) {

//        ErrorMessage message = new ErrorMessage(HttpStatus.BAD_REQUEST.value(), new Date(),
//                ex.getMessage(), request.getDescription(false));
        ErrorMessage message = new ErrorMessage(HttpStatus.BAD_REQUEST.value(), new Date(),
                ex.getBindingResult().getFieldError().getDefaultMessage(), request.getDescription(false));

        return message; // ritorna l oggetto in formato json al consumer

        // per messaggio di errore dinamico , si puo inserire nella @Size()una
        // proprietà message custom.
    }
}
