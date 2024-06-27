package com.ranper.mensalidade.controllers;

import com.ranper.mensalidade.dto.gyms.GymIdDTO;
import com.ranper.mensalidade.dto.gyms.GymRequestDTO;
import com.ranper.mensalidade.dto.gyms.GymResponseDTO;
import com.ranper.mensalidade.services.GymService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/gym")
@RequiredArgsConstructor
public class GymController {

    private final GymService gymService;

    @GetMapping("/{gymId}")
    public ResponseEntity<GymResponseDTO> getGym(@PathVariable String gymId) {
        GymResponseDTO gym = gymService.getGymDetail(gymId);
        return ResponseEntity.ok(gym);
    }

    @PostMapping
    public ResponseEntity<GymIdDTO> createGym(@RequestBody GymRequestDTO body, UriComponentsBuilder uriComponentsBuilder) {
        GymIdDTO gymIdDTO = gymService.createGym(body);

        var uri = uriComponentsBuilder.path("/gym/${gymId}").buildAndExpand(gymIdDTO.GymId()).toUri();

        return ResponseEntity.created(uri).body(gymIdDTO);
    }
}
