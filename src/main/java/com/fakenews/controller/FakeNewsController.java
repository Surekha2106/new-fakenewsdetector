package com.fakenews.controller;

import com.fakenews.ml.WekaModelService;
import com.fakenews.model.DashboardStatsDto;
import com.fakenews.model.PredictionRecord;
import com.fakenews.model.PredictionRequest;
import com.fakenews.model.PredictionResponse;
import com.fakenews.repository.PredictionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allow all origins for the frontend
public class FakeNewsController {

    @Autowired
    private WekaModelService wekaModelService;

    @Autowired
    private PredictionRepository predictionRepository;

    @PostMapping("/predict")
    public ResponseEntity<PredictionResponse> predict(@RequestBody PredictionRequest request) {
        String text = request.getText();
        
        // Pass through ML Prediction service
        WekaModelService.PredictionResult mlResult = wekaModelService.predict(text);
        
        // Save to Database
        PredictionRecord record = new PredictionRecord(text, mlResult.getLabel(), mlResult.getConfidence());
        predictionRepository.save(record);
        
        // Map to Response DTO
        PredictionResponse response = new PredictionResponse(
                text,
                mlResult.getLabel(),
                mlResult.getConfidence(),
                record.getCreatedAt()
        );
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/history")
    public ResponseEntity<List<PredictionRecord>> getHistory() {
        // Fetch all predictions ordered by newest first
        return ResponseEntity.ok(predictionRepository.findAllByOrderByCreatedAtDesc());
    }

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDto> getStats() {
        // Calculate stats for the dashboard
        long total = predictionRepository.count();
        long fake = predictionRepository.countByPredictionLabel("FAKE NEWS");
        long real = predictionRepository.countByPredictionLabel("REAL NEWS");
        
        return ResponseEntity.ok(new DashboardStatsDto(total, fake, real));
    }
}
