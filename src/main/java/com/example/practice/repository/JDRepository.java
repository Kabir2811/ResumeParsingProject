package com.example.practice.repository;

import com.example.practice.model.JD;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JDRepository extends JpaRepository<JD,Integer> {
}
