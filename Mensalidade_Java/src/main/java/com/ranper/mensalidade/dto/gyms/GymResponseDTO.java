package com.ranper.mensalidade.dto.gyms;

import com.ranper.mensalidade.domain.gym.Gym;
import lombok.Getter;


@Getter
public class GymResponseDTO {
    GymsDetailDTO gym;

    public GymResponseDTO (Gym gym) {
        this.gym = new GymsDetailDTO(gym.getGymid(), gym.getName());
    }
}
