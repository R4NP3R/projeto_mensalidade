package com.ranper.mensalidade.dto.clients;

import java.util.List;

public record ClientListResponseDTO(List<ClientDetailsDTO> clients, Integer total) {
}
