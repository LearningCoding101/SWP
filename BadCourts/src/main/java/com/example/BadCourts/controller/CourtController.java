package com.example.BadCourts.controller;

import com.example.BadCourts.model.Court;
import com.example.BadCourts.service.CourtService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

//@Controller
//public class CourtController {
//    private CourtService CourtService;
//
//    public CourtController(CourtService courtService) {
//        super();
//        this.CourtService = courtService;
//    }
//
//    @GetMapping(value = "/courts")
//    public String listCourt(Model model) {
//        model.addAttribute("courts", CourtService.getAllCourt());
//        return "courts"; // Assuming "courts.html" is your HTML template
//    }
//
//}

@RestController
@RequestMapping("/api") // Base URL for REST endpoints
public class CourtController {

    private CourtService courtService;

    public CourtController(CourtService courtService) {
        this.courtService = courtService;
    }

    @GetMapping("/courts")
    public List<Court> getAllCourts() {
        return courtService.getAllCourt();
    }
}
