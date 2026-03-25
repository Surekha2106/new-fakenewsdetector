package com.fakenews.model;

import java.time.LocalDateTime;

public class PredictionResponse {
    private String text;
    private String prediction;
    private double confidenceScore;
    private LocalDateTime timestamp;

    public PredictionResponse(String text, String prediction, double confidenceScore, LocalDateTime timestamp) {
        this.text = text;
        this.prediction = prediction;
        this.confidenceScore = confidenceScore;
        this.timestamp = timestamp;
    }

    public String getText() { return text; }
    public String getPrediction() { return prediction; }
    public double getConfidenceScore() { return confidenceScore; }
    public LocalDateTime getTimestamp() { return timestamp; }
}
