package com.fakenews;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

@SpringBootApplication
public class FakeNewsDetectorApplication {

	public static void main(String[] args) {
		SpringApplication.run(FakeNewsDetectorApplication.class, args);
	}

	@EventListener(ApplicationReadyEvent.class)
	public void onStarted() {
		System.out.println("\n" + "=".repeat(60));
		System.out.println("   FAKE NEWS DETECTOR IS LIVE!");
		System.out.println("   CLICK HERE TO OPEN: http://localhost:8081");
		System.out.println("=".repeat(60) + "\n");
	}
}

