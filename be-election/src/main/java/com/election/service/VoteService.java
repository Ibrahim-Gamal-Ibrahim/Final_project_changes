package com.election.service;

import com.election.entity.Candidate;
import com.election.repository.CandidateRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VoteService {

    private final CandidateRepository candidateRepository;

    public VoteService(CandidateRepository candidateRepository) {
        this.candidateRepository = candidateRepository;
    }

    public void vote(Long candidateId) {
        Candidate candidate = candidateRepository.findById(candidateId)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));
        candidate.setVotes(candidate.getVotes() + 1);
        candidateRepository.save(candidate);
    }

    public List<Candidate> getResults() {
        return candidateRepository.findAll();
    }
}
