# AI Fake News Detector

A full-stack web application built with **Java (Spring Boot)** and **Machine Learning (Weka)** to classify whether a news article is **Real or Fake**. 
Features a **premium Lavender and Purple themed user interface** constructed with Glassmorphism design principles.

## Features
- **Machine Learning Analysis**: Classifies text using a trained Naive Bayes classifier with TF-IDF vectorization.
- **Natural Language Processing**: Built-in Java text preprocessor for tokenization, stopword removal, lowercasing, and punctuation removal.
- **REST API**: Clean endpoints for predicting news accuracy, fetching history, and viewing stats.
- **Premium UI**: Responsive, animated, dark-mode Glassmorphism UI.
- **Analytics Dashboard**: View aggregate statistics and interactive Chart.js widgets.
- **Persistent Storage**: Save history and stats to a MySQL database using Spring Data JPA.

## Prerequisites
- Java 17+
- Maven 3.6+
- MySQL Server (Running on localhost:3306)

## Database Setup
1. Ensure your local MySQL server is running.
2. Create a database named `fake_news_db` or ensure your MySQL user has privileges to create it:
   ```sql
   CREATE DATABASE fake_news_db;
   ```
3. Update `src/main/resources/application.properties` if your MySQL username and password differ from the default (`root` / *empty*).

## How to Run
1. Open a terminal in the project root directory.
2. Run the application using Maven:
   ```bash
   mvn spring-boot:run
   ```
3. The server will start on port 8080.
4. Open your web browser and navigate to:
   ```text
   http://localhost:8080
   ```

## API Endpoints
- `POST /api/predict`: Send JSON `{ "text": "news here" }` to get a prediction.
- `GET /api/history`: Returns a list of all past predictions.
- `GET /api/stats`: Returns analytics numbers.

## Tech Stack
**Frontend**: HTML5, CSS3 (Glassmorphism), Vanilla JavaScript, Chart.js, Google Fonts (Inter, Poppins)
**Backend**: Java 17, Spring Boot, Spring Data JPA, Hibernate
**Database**: MySQL
**Machine Learning**: Weka (StringToWordVector filter, NaiveBayes Classifier)
