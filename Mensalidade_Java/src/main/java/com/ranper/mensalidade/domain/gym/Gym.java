package com.ranper.mensalidade.domain.gym;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "gyms")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Gym {

    @Id
    @Column(nullable = false)
    private String gymid;

    @Column(nullable = false)
    private String name;
}
