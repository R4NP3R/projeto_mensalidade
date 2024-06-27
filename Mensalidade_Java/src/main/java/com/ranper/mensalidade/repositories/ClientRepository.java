package com.ranper.mensalidade.repositories;

import com.ranper.mensalidade.domain.client.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, String> {
}
