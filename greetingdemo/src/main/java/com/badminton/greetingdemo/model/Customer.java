package com.badminton.greetingdemo.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Set;


@Data
@Entity
@Table(name = "Customer")
public class Customer {
    @Id
    @Column(name = "CustomerID")
    private String customerID;

    @Column(name = "customername")
    private String customerName;



    // Constructor, getters, setters
}

