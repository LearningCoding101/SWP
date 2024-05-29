package com.example.BadCourts.service;

import com.example.BadCourts.model.Court;
import org.springframework.stereotype.Service;

import java.util.List;


public interface CourtService {
    List<Court> getAllCourt();
}
