package com.example.practice.service;

import com.example.practice.model.Resume;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import java.util.List;

@Service
@Transactional
public class ResumeService {

    @PersistenceContext
    private EntityManager entityManager;

    public List<Resume> filterResumes(String skills, String gender, String knownLanguages) {
        // Construct the base query
        StringBuilder queryString = new StringBuilder("SELECT r FROM Resume r WHERE 1=1");

        // Add conditions based on the provided filter criteria
        if (skills != null && !skills.isEmpty()) {
            queryString.append(" AND r.skills LIKE :skills");
        }

        if (gender != null && !gender.isEmpty()) {
            queryString.append(" AND r.gender = :gender");
        }

        if (knownLanguages != null && !knownLanguages.isEmpty()) {
            queryString.append(" AND r.knownLanguages LIKE :knownLanguages");
        }

        // Create a JPA query from the constructed query string
        Query query = entityManager.createQuery(queryString.toString(), Resume.class);

        // Set parameter values based on the filter criteria
        if (skills != null && !skills.isEmpty()) {
            query.setParameter("skills", "%" + skills + "%");
        }

        if (gender != null && !gender.isEmpty()) {
            query.setParameter("gender", gender);
        }

        if (knownLanguages != null && !knownLanguages.isEmpty()) {
            query.setParameter("knownLanguages", "%" + knownLanguages + "%");
        }

        // Execute the query and return the filtered resumes
        List<Resume> filteredResumes = query.getResultList();
        return filteredResumes;
    }
}
