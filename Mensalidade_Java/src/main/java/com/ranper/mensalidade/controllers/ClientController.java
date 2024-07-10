package com.ranper.mensalidade.controllers;

import com.ranper.mensalidade.domain.client.Client;
import com.ranper.mensalidade.dto.clients.ClientDetailsDTO;
import com.ranper.mensalidade.dto.clients.ClientIdDTO;
import com.ranper.mensalidade.services.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.util.UriComponentsBuilder;

@Controller
@RequestMapping("/clients")
@RequiredArgsConstructor
public class ClientController {

    private final ClientService clientService;

    @GetMapping("/{clientId}")
    public ResponseEntity<ClientDetailsDTO> getClientDetails(@PathVariable String clientId) {
        Client client = clientService.getClient(clientId);

        ClientDetailsDTO clientInfo = new ClientDetailsDTO(client.getId(),
                client.getName(),
                client.getCpf(),
                client.getPhoneNumber(),
                client.getAddress(),
                client.getAddressNumber(),
                client.getPaymentDay(),
                client.getInitialDate()
        );

        return ResponseEntity.ok(clientInfo);
    }

}
