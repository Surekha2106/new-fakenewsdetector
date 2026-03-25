package com.fakenews.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "predictions")
public class PredictionRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String newsText;

    @Column(nullable = false)
    private String predictionLabel; // "REAL NEWS" or "FAKE NEWS"

    @Column(nullable = false)
    private double confidenceScore;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // Default constructor required by JPA
    public PredictionRecord() {}

    public PredictionRecord(String newsText, String predictionLabel, double confidenceScore) {
        this.newsText = newsText;
        this.predictionLabel = predictionLabel;
        this.confidenceScore = confidenceScore;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNewsText() { return newsText; }
    public void setNewsText(String newsText) { this.newsText = newsText; }

    public String getPredictionLabel() { return predictionLabel; }
    public void setPredictionLabel(String predictionLabel) { this.predictionLabel = predictionLabel; }

    public double getConfidenceScore() { return confidenceScore; }
    public void setConfidenceScore(double confidenceScore) { this.confidenceScore = confidenceScore; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
