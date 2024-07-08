package com.ranper.mensalidade.services;

import com.ranper.mensalidade.domain.client.Client;
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

}
