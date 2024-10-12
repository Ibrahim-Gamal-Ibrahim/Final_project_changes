package com.election.controller;

import com.election.entity.Candidate;
import com.election.service.CandidateService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/api/candidate")
public class CandidateController {

    private final CandidateService candidateService;

    public CandidateController(CandidateService candidateService) {
        this.candidateService = candidateService;
    }

    @GetMapping
    public ResponseEntity<List<Candidate>> getCandidates() {
        List<Candidate> candidates = candidateService.getCandidates();
        return new ResponseEntity<>(candidates, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addCandidate(@RequestParam("name") String name,
                                               @RequestParam("photo") MultipartFile photoFile,
                                               @RequestParam("party") String party,
                                               @RequestParam("age") int age,
                                               @RequestParam("experience") String experience) {
        try {
            System.out.println("Received photo size: " + photoFile.getSize() + " bytes");

            // Convert the image file to Base64 string
            byte[] photoBytes = photoFile.getBytes();
            String base64Photo = Base64.getEncoder().encodeToString(photoBytes);
            candidateService.addCandidate(name, base64Photo, party, age, experience);
            return new ResponseEntity<>("Candidate added successfully", HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>("Failed to process photo", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to add candidate", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCandidate(@PathVariable Long id) {
        try {
            candidateService.deleteCandidate(id);
            return ResponseEntity.ok("Candidate deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
