package com.ranper.mensalidade.repositories;

import com.ranper.mensalidade.domain.gym.Gym;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GymRepository extends JpaRepository<Gym, Integer> {

    Optional<Gym> findBygymid(String gymId);
}
