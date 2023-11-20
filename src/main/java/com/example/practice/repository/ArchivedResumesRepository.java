package com.example.practice.repository;

import com.example.practice.model.ArchivedResumes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArchivedResumesRepository extends JpaRepository<ArchivedResumes, Integer> {
}
