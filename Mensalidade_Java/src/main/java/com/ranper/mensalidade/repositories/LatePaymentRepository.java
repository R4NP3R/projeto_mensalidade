package com.ranper.mensalidade.repositories;

import com.ranper.mensalidade.domain.latePayment.LatePayment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LatePaymentRepository extends JpaRepository<LatePayment, String> {
}
