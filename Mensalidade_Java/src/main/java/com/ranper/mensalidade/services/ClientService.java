package com.ranper.mensalidade.services;

import com.ranper.mensalidade.domain.client.Client;
import com.ranper.mensalidade.dto.clients.ClientDetailsDTO;
import com.ranper.mensalidade.dto.clients.ClientListResponseDTO;
import com.ranper.mensalidade.repositories.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

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

    private List<Client> getAllClientsFromGym (String gymId) {
        return clientRepository.findByGymGymid(gymId);

    }

    public ClientListResponseDTO getGymClients(String gymId) {
        List<Client> clientList = this.getAllClientsFromGym(gymId);

        List<ClientDetailsDTO> clientDetailsList = clientList.stream().map(client -> new ClientDetailsDTO(client.getId(), client.getName(), client.getCpf(), client.getPhoneNumber(), client.getAddress(), client.getAddressNumber(), client.getPaymentDay(), client.getInitialDate())).toList();

        return new ClientListResponseDTO(clientDetailsList, clientDetailsList.size());
    }

}
