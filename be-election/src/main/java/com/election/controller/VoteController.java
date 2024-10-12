package com.election.controller;

import com.election.entity.Candidate;
import com.election.service.VoteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vote")
public class VoteController {

    private final VoteService voteService;

    public VoteController(VoteService voteService) {
        this.voteService = voteService;
    }

    @PostMapping
    public ResponseEntity<String> vote(@RequestParam Long candidateId) {
        try {
            voteService.vote(candidateId);
            return ResponseEntity.ok("Vote registered successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @GetMapping("/results")
    public ResponseEntity<List<Candidate>> getResults() {
        List<Candidate> results = voteService.getResults();
        return ResponseEntity.ok(results);
    }
}
