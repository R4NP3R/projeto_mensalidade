package com.ranper.mensalidade.dto.clients;

import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

public record ClientRequestDTO (
        String id,
        String name,
        String cpf,
        String phoneNumber,
        Integer paymentDay,
        String address,
        String addressNumber
){
}
