# 🛡️ TruthAI: Advanced Fake News Detector

<p align="center">
  <img src="assets/dashboard_mockup.png" alt="TruthAI Dashboard Mockup" width="800">
</p>

<p align="center">
  <strong>Combating Misinformation with Artificial Intelligence and Linguistic Analysis.</strong>
</p>

---

## 🌟 Overview

**TruthAI** is a high-performance full-stack web application built to verify the credibility of news in real-time. By integrating **Machine Learning (Weka)** with **Natural Language Processing (NLP)**, the system analyzes text patterns to distinguish between factual reporting and deceptive misinformation.

Featuring a cutting-edge **Glassmorphism UI**, TruthAI provides a premium experience for journalists, researchers, and everyday readers to cross-validate information through a data-driven lens.

---

## ✨ Key Features

- **🧠 Intelligent Classification**: Powered by **Naive Bayes** and **TF-IDF vectorization** for high-precision detection.
- **🔡 NLP Preprocessor**: Custom-built engine for semantic cleaning, stop-word removal, and linguistic normalization.
- **📊 Interactive Analytics**: Dynamic dashboards featuring **Chart.js** integration to track global news trends.
- **💎 Premium UX/UI**: Immersive Lavender & Purple themed interface built with modern Glassmorphism principles.
- **⚡ Real-time Verification**: Instant feedback with detailed confidence scores and analysis logs.
- **🗄️ Persistent History**: Securely track and manage past analyses using **Spring Data JPA**.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Backend** | Java 17, Spring Boot, Spring Data JPA |
| **Machine Learning** | Weka, Naive Bayes, StringToWordVector |
| **Frontend** | HTML5, CSS3 (Glassmorphism), Vanilla JS |
| **Visualization** | Chart.js 4.x |
| **Database** | H2 Database (In-Memory) / MySQL |
| **Styling** | Custom Vanilla CSS (Dark Mode Optimization) |

---

## 🚀 Getting Started

### Prerequisites
- **Java 17+**
- **Maven 3.6+**

### Installation & Run
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/truth-ai.git
   cd truth-ai
   ```

2. **Run the application**:
   ```bash
   .\mvnw.cmd spring-boot:run
   ```

3. **Launch the Dashboard**:
   Open [http://localhost:8081](http://localhost:8081) in your browser.

---

## 📐 Architecture

TruthAI follows a modular architecture for scalability:
- **`com.fakenews.ml`**: Core Machine Learning services and model training.
- **`com.fakenews.preprocessing`**: Linguistic analysis and text normalization.
- **`com.fakenews.controller`**: REST API endpoints for seamless frontend-backend communication.
- **`static/js`**: Asynchronous state management and dynamic UI updates.

---

<p align="center">
  Built with ❤️ for a more informed world.
</p>
