package io.ATTTT.classGPT.models;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Replies {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String body;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    @ManyToOne
    private Account author;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    @JsonBackReference
    private Post post;

    private boolean fromInstructor;
    private boolean llmGenerated;
    private boolean endorsed;

    @Column(name = "parent_reply_id")
    private Long parentReplyId;


    @PrePersist
    protected void onCreate(){
        createdAt = LocalDateTime.now();
    }



}
