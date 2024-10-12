package com.election.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "candidate")
public class Candidate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100) // Ensure the name is required and limit length
    private String name;

    private String photo;

    @Column(nullable = false) // Ensure votes field cannot be null
    private int votes;

    @Column(nullable = false, length = 50) // Add column definition for party with a length limit
    private String party;

    @Column(nullable = false) // Age is required
    private int age;

    @Column(length = 255) // Optional experience field with a length limit
    private String experience;
}
