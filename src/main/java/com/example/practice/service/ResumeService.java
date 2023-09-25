package com.example.practice.service;

import com.example.practice.model.Resume;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class ResumeService {

    @PersistenceContext
    private EntityManager entityManager;

    public List<Resume> filterResumes(String skills, String gender, String knownLanguages) {
        // Construct the base query
        StringBuilder queryString = new StringBuilder("SELECT r FROM Resume r WHERE 1=1");

        // Create a map to store parameters
        Map<String, Object> parameters = new HashMap<>();

        // Add conditions based on the provided filter criteria
        if (skills != null && !skills.isEmpty()) {
            String[] skillList = skills.split(",");
            queryString.append(" AND (");
            for (int i = 0; i < skillList.length; i++) {
                String paramName = "skill" + i;
                queryString.append(" r.skills LIKE :" + paramName);
                parameters.put(paramName, "%" + skillList[i] + "%");
                if (i < skillList.length - 1) {
                    queryString.append(" AND");
                }
            }
            queryString.append(")");
        }

        if (gender != null && !gender.isEmpty()) {
            queryString.append(" AND r.gender = :gender");
            parameters.put("gender", gender);
        }

        if (knownLanguages != null && !knownLanguages.isEmpty()) {
            String[] languageList = knownLanguages.split(",");
            queryString.append(" AND (");
            for (int i = 0; i < languageList.length; i++) {
                String paramName = "language" + i;
                queryString.append(" r.knownLanguages LIKE :" + paramName);
                parameters.put(paramName, "%" + languageList[i] + "%");
                if (i < languageList.length - 1) {
                    queryString.append(" OR");
                }
            }
            queryString.append(")");
        }

        // Ensure that all selected skills match by checking the count
        if (skills != null && !skills.isEmpty()) {
            int numSkills = skills.split(",").length;
            queryString.append(" GROUP BY r.id HAVING COUNT(DISTINCT r.skills) = :numSkills");
            parameters.put("numSkills", (long) numSkills);
        }

        // Create a JPA query from the constructed query string
        TypedQuery<Resume> query = entityManager.createQuery(queryString.toString(), Resume.class);

        // Set parameter values based on the filter criteria
        for (Map.Entry<String, Object> entry : parameters.entrySet()) {
            query.setParameter(entry.getKey(), entry.getValue());
        }

        // Execute the query and return the filtered resumes
        List<Resume> filteredResumes = query.getResultList();
        return filteredResumes;
    }

}
