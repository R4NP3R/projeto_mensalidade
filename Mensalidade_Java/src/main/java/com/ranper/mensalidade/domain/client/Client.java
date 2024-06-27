package com.ranper.mensalidade.domain.client;


import com.ranper.mensalidade.domain.gym.Gym;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "clients")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(nullable = false)
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String cpf;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(name = "initial_date", nullable = false)
    private LocalDateTime initialDate;

    @Column(name = "payment_day", nullable = false)
    private LocalDateTime paymentDay;

    @Column(nullable = false)
    private String address;

    @Column(name = "address_number", nullable = false)
    private String addressNumber;

    @ManyToOne
    @JoinColumn(name = "gym_id", nullable = false)
    private Gym gym;

}
