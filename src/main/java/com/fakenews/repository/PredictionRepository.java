package com.fakenews.repository;

import com.fakenews.model.PredictionRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PredictionRepository extends JpaRepository<PredictionRecord, Long> {
    List<PredictionRecord> findAllByOrderByCreatedAtDesc();
    long countByPredictionLabel(String predictionLabel);
}
