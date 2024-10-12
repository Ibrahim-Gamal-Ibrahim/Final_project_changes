package com.election.service;

import com.election.entity.Candidate;
import com.election.repository.CandidateRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CandidateService {

    private final CandidateRepository candidateRepository;

    public CandidateService(CandidateRepository candidateRepository) {
        this.candidateRepository = candidateRepository;
    }

    public List<Candidate> getCandidates() {
        return candidateRepository.findAll();
    }

    public void addCandidate(String name, String photo, String party, int age, String experience) {
        Candidate candidate = new Candidate();
        candidate.setName(name);
        candidate.setPhoto(photo);
        candidate.setVotes(0);
        candidate.setParty(party);
        candidate.setAge(age);
        candidate.setExperience(experience);
        candidateRepository.save(candidate);
    }

    public void deleteCandidate(Long id) {
        Candidate candidate = candidateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));
        candidateRepository.delete(candidate);
    }
}
