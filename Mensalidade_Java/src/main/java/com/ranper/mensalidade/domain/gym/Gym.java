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
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(nullable = false)
    private String Id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String slug;
}
