package io.ATTTT.classGPT.models;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Authority {

    @Id
    @Column(length = 32)
    private String name; // e.g. "ROLE_USER", "ROLE_ADMIN"

    @Override
    public String toString() {
        return "Authority{name='" + name + "'}";
    }
}
