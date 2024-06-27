package com.ranper.mensalidade.services;

import com.ranper.mensalidade.domain.gym.Gym;
import com.ranper.mensalidade.dto.gyms.GymResponseDTO;
import com.ranper.mensalidade.dto.gyms.GymsDetailDTO;
import com.ranper.mensalidade.repositories.GymRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.Normalizer;

@Service
@RequiredArgsConstructor
public class GymService {

    private final GymRepository gymRepository;


    public GymResponseDTO getGymDetail(String gymId) {
        Gym gym = this.gymRepository.findByGymId(gymId).orElseThrow(() -> new RuntimeException("gym with ID: " + gymId + " Not Found"));

        return new GymResponseDTO(gym);
    }

    private String createSlug(String slug) {
        String normalized = Normalizer.normalize(slug, Normalizer.Form.NFD);
        return normalized.replaceAll("[\\p{InCOMBINING_DIACRITICAL_MARKS}]", "")
                .replaceAll("[^\\w\\s]", "")
                .replaceAll("[\\s+]", "")
                .toLowerCase();
    }
}
