package com.ranper.mensalidade.services;

import com.ranper.mensalidade.domain.client.Client;
import com.ranper.mensalidade.dto.clients.ClientDetailsDTO;
import com.ranper.mensalidade.repositories.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClientService {

    private final ClientRepository clientRepository;

    public void registerClient(Client newClient) {
        this.clientRepository.save(newClient);
    }

    public Client getClient(String clientId) {
        return this.clientRepository.findById(clientId).orElseThrow(() -> new RuntimeException("Client not found with ID:" + clientId));
    }

}
