package br.com.kleber.celk.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

@Entity
@Table(name = "jhi_federated_state")
public class FederatedState implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(min = 2, max = 2)
    @Column(name = "initials", length = 2, nullable = false)
    private String initials;

    @NotNull
    @Size(min = 4, max = 50)
    @Column(name = "name", length = 50, nullable = false)
    private String name;

    @NotNull
    @Column(name = "created_date", nullable = false)
    private Instant createdDate;

    public Long getId() {
        return id;
    }

    public String getInitials() {
        return initials;
    }

    public String getName() {
        return name;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setInitials(String initials) {
        this.initials = initials;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FederatedState that = (FederatedState) o;
        return Objects.equals(id, that.id) &&
            Objects.equals(initials, that.initials);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, initials);
    }
}
