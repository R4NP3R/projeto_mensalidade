package com.ranper.mensalidade.domain.latePayment;

import com.ranper.mensalidade.domain.client.Client;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "late_payment")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LatePayment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(nullable = false)
    private String id;

    @Column(nullable = false)
    private LocalDateTime debtAt;

    @OneToOne
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;
}
