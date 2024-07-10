package com.ranper.mensalidade.dto.clients;

import java.time.LocalDateTime;

public record ClientDetailsDTO(
        String id,
        String name,
        String cpf,
        String phoneNumber,
        String address,
        String addressNumber,
        LocalDateTime paymentDay,
        LocalDateTime initialDate
) {
}
