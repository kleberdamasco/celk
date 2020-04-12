package br.com.kleber.celk.repository;

import br.com.kleber.celk.domain.FederatedState;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the State entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FederatedStateRepository extends JpaRepository<FederatedState, Long> {
}
