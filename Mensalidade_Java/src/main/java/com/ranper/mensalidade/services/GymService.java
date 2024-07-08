package com.ranper.mensalidade.services;

import com.ranper.mensalidade.domain.client.Client;
import com.ranper.mensalidade.domain.gym.Gym;
import com.ranper.mensalidade.dto.clients.ClientIdDTO;
import com.ranper.mensalidade.dto.clients.ClientRequestDTO;
import com.ranper.mensalidade.dto.gyms.GymIdDTO;
import com.ranper.mensalidade.dto.gyms.GymRequestDTO;
import com.ranper.mensalidade.dto.gyms.GymResponseDTO;
import com.ranper.mensalidade.repositories.GymRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class GymService {

    private final GymRepository gymRepository;
    private final ClientService clientService;

    public GymResponseDTO getGymDetail(String gymId) {
        Gym gym = this.gymRepository.findBygymid(gymId).orElseThrow(() -> new RuntimeException("gym with ID: " + gymId + " not Found"));

        return new GymResponseDTO(gym);
    }

    public GymIdDTO createGym(GymRequestDTO gymDTO) {
        Gym newGym = new Gym();

        newGym.setName(gymDTO.name());
        newGym.setGymid(createSlug(gymDTO.name()));

        gymRepository.save(newGym);

        return new GymIdDTO(newGym.getGymid());
    }

    public ClientIdDTO registerClientOnGym(ClientRequestDTO clientRequestDTO, String gymId) {

        Client newClient = new Client();
        Gym gym = this.getGymById(gymId);


        newClient.setGym(gym);
        newClient.setName(clientRequestDTO.name());
        newClient.setCpf(clientRequestDTO.cpf());
        newClient.setPhoneNumber(clientRequestDTO.phoneNumber());
        newClient.setAddress(clientRequestDTO.address());
        newClient.setAddressNumber(clientRequestDTO.addressNumber());
        newClient.setInitialDate(LocalDateTime.now());
        newClient.setPaymentDay(LocalDateTime.now());

        clientService.registerClient(newClient);

        return new ClientIdDTO(newClient.getId());
    }

    public Gym getGymById(String gymId) {
        return this.gymRepository.findBygymid(gymId).orElseThrow(() -> new RuntimeException("gym with ID: " + gymId + " not Found"));
    }

    private String createSlug(String slug) {
        String normalized = Normalizer.normalize(slug, Normalizer.Form.NFD);
        return normalized.replaceAll("[\\p{InCOMBINING_DIACRITICAL_MARKS}]", "")
                .replaceAll("[^\\w\\s]", "")
                .replaceAll("[\\s+]", "-")
                .toLowerCase();
    }
}
