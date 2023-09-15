package com.example.practice.repository;

import com.example.practice.model.Resume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Resume,Integer> {
    @Query("SELECT DISTINCT r.knownLanguages FROM Resume r")
    List<String> findDistinctKnownLanguages();

}
