package com.ranper.mensalidade.services;

import com.ranper.mensalidade.domain.gym.Gym;
import com.ranper.mensalidade.dto.gyms.GymIdDTO;
import com.ranper.mensalidade.dto.gyms.GymRequestDTO;
import com.ranper.mensalidade.dto.gyms.GymResponseDTO;
import com.ranper.mensalidade.repositories.GymRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.Normalizer;

@Service
@RequiredArgsConstructor
public class GymService {

    private final GymRepository gymRepository;

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

    private String createSlug(String slug) {
        String normalized = Normalizer.normalize(slug, Normalizer.Form.NFD);
        return normalized.replaceAll("[\\p{InCOMBINING_DIACRITICAL_MARKS}]", "")
                .replaceAll("[^\\w\\s]", "")
                .replaceAll("[\\s+]", "-")
                .toLowerCase();
    }
}
