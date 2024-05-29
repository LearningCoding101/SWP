package com.example.BadCourts.service.impl;

import com.example.BadCourts.model.Court;
import com.example.BadCourts.repository.CourtRepository;
import com.example.BadCourts.service.CourtService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourtServiceImpl implements CourtService {
    private CourtRepository courtRepository;

    public CourtServiceImpl(CourtRepository CourtRepository) {
        super();
        this.courtRepository = CourtRepository;
    }

    @Override
    public List<Court> getAllCourt() {
        return courtRepository.findAll();
    }
}
