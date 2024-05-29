package com.example.BadCourts.model;

import jakarta.persistence.*;
import jdk.jfr.DataAmount;

import java.util.List;


@Entity
@Table(name = "Court")
public class Court {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CourtID", nullable = false, length=10)
    private String courtId;

    @Column(name = "Name", nullable = false, length=50)
    private String name;


    private Float price;


    @ManyToOne // Establish the many-to-one relationship
    @JoinColumn(name = "ClubID")
    private Club clubId;



    // Constructors, getters, setters, and other methods
    public Court(){

    }

    public Court(String courtId, Club clubId, Float price, String name) {
        super();
        this.courtId = courtId;
        this.clubId = clubId;
        this.price = price;
        this.name = name;
    }

    public String getCourtId() {
        return courtId;
    }

    public void setCourtId(String courtId) {
        this.courtId = courtId;
    }

    public Club getClubId() {
        return clubId;
    }

    public void setClubId(Club clubId) {
        this.clubId = clubId;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
