package com.example.BadCourts.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name="Club")
public class Club {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CourtID", nullable = false, length=10)
    private String id;
    @Column(name = "Name", nullable = false, length=50)
    private String name;
    private String address;
    private int OpenHour;
    private int CloseHour;
    private String ClubImage;
    private String CourtOwnerID;
    private String StaffID;
    @OneToMany(mappedBy = "clubId")
    private List<Court> courtList;
}
