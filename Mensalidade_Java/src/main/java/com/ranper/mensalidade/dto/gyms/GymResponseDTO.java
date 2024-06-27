package com.ranper.mensalidade.dto.gyms;

import com.ranper.mensalidade.domain.gym.Gym;

public class GymResponseDTO {
    GymsDetailDTO gym;

    public GymResponseDTO (Gym gym) {
        this.gym = new GymsDetailDTO(gym.getId(), gym.getGymId(), gym.getName());
    }
}
