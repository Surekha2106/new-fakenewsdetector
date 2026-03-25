const API_BASE_URL = 'http://localhost:8081/api';

// DOM Elements
const newsInput = document.getElementById('newsInput');
const analyzeBtn = document.getElementById('analyzeBtn');
const analyzeLoader = document.getElementById('analyzeLoader');
const btnText = document.querySelector('.btn-text');
const resultCard = document.getElementById('resultCard');
const predictionLabel = document.getElementById('predictionLabel');
const confidenceScore = document.getElementById('confidenceScore');
const confidenceCircle = document.getElementById('confidenceCircle');
const analyzedText = document.getElementById('analyzedText');

const totalCount = document.getElementById('totalCount');
const fakeCount = document.getElementById('fakeCount');
const realCount = document.getElementById('realCount');
const historyList = document.getElementById('historyList');

let chartInstance = null;

// Page Level Protection
(function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn && !window.location.href.includes('auth.html')) {
        window.location.href = 'auth.html';
    }
})();

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchDashboardStats();
    fetchHistory();
    initScrollReveal();
});

function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    alert("Logging out...");
    window.location.href = 'auth.html'; // Leaves the page
}

function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

// Analyze Buton Click
analyzeBtn.addEventListener('click', async () => {
    const text = newsInput.value.trim();
    if (!text) {
        alert("Please enter some text to analyze.");
        return;
    }

    // UI Loading state
    btnText.textContent = 'Processing...';
    analyzeLoader.classList.remove('hidden');
    analyzeBtn.disabled = true;

    try {
        const response = await fetch(`${API_BASE_URL}/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        });

        if (!response.ok) throw new Error("Server Error");

        const data = await response.json();
        
        // Show result
        displayResult(data);
        
        // Refresh dashboard and history after small delay logic allows DB to sync
        fetchDashboardStats();
        fetchHistory();

    } catch (error) {
        console.error('Error:', error);
        alert('Failed to analyze the news. Please ensure the backend server is running.');
    } finally {
        // Reset UI
        btnText.textContent = 'Analyze News';
        analyzeLoader.classList.add('hidden');
        analyzeBtn.disabled = false;
        newsInput.value = ''; // clear input
    }
});

function displayResult(data) {
    resultCard.classList.remove('hidden');
    
    // Set Label
    predictionLabel.textContent = data.prediction;
    
    // Style label based on prediction
    if (data.prediction.includes('FAKE')) {
        predictionLabel.className = 'result-label fake';
        confidenceCircle.style.borderColor = '#ef4444';
        confidenceCircle.style.boxShadow = '0 0 15px rgba(239, 68, 68, 0.4)';
    } else {
        predictionLabel.className = 'result-label real';
        confidenceCircle.style.borderColor = '#4ade80';
        confidenceCircle.style.boxShadow = '0 0 15px rgba(74, 222, 128, 0.4)';
    }

    // Animate counter for confidence
    animateValue(confidenceScore, 0, data.confidenceScore, 1500);
    
    // Show preview text
    const previewText = data.text.length > 250 ? data.text.substring(0, 250) + '...' : data.text;
    analyzedText.textContent = '"' + previewText + '"';
    
    // Scroll to result slightly
    setTimeout(() => {
        resultCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = (progress * (end - start) + start).toFixed(1) + '%';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Fetch dashboard stats from API
async function fetchDashboardStats() {
    try {
        const res = await fetch(`${API_BASE_URL}/stats`);
        if (!res.ok) return;
        const data = await res.json();

        // Animate count update
        animateValueNumber(totalCount, parseInt(totalCount.innerText) || 0, data.totalAnalyses, 1000);
        animateValueNumber(fakeCount, parseInt(fakeCount.innerText) || 0, data.fakeNewsCount, 1000);
        animateValueNumber(realCount, parseInt(realCount.innerText) || 0, data.realNewsCount, 1000);

        // Update Chart
        renderChart(data.realNewsCount, data.fakeNewsCount);
    } catch (error) {
        console.error("Failed to fetch stats");
    }
}

function animateValueNumber(obj, start, end, duration) {
    if(end === 0) {
        obj.innerHTML = 0;
        return;
    }
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Fetch history from API
async function fetchHistory() {
    try {
        const res = await fetch(`${API_BASE_URL}/history`);
        if (!res.ok) return;
        const data = await res.json();

        historyList.innerHTML = '';
        
        if (data.length === 0) {
            historyList.innerHTML = '<p class="text-muted" style="text-align: center;">No history available.</p>';
            return;
        }

        data.slice(0, 50).forEach(item => { // Show last 50
            const date = new Date(item.createdAt).toLocaleString();
            const isFake = item.predictionLabel.includes('FAKE');
            const typeClass = isFake ? 'fake' : 'real';
            const badgeClass = isFake ? 'badge-fake' : 'badge-real';
            
            const textPreview = item.newsText.length > 80 ? item.newsText.substring(0, 80) + '...' : item.newsText;

            const html = `
                <div class="history-item ${typeClass}">
                    <div class="history-content">
                        <div class="history-text">${textPreview}</div>
                        <div class="history-meta">${date} • ${item.confidenceScore.toFixed(1)}% Confidence</div>
                    </div>
                    <div class="history-badge ${badgeClass}">
                        ${item.predictionLabel}
                    </div>
                </div>
            `;
            historyList.insertAdjacentHTML('beforeend', html);
        });

    } catch (error) {
        console.error("Failed to fetch history");
    }
}

function renderChart(real, fake) {
    const ctx = document.getElementById('statsChart').getContext('2d');
    
    // Destroy previous instance
    if (chartInstance) {
        chartInstance.destroy();
    }

    Chart.defaults.color = '#E0E0E0';
    Chart.defaults.font.family = "'Inter', sans-serif";

    if (real === 0 && fake === 0) {
        // Chart container is empty
        return;
    }

    chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Real News', 'Fake News'],
            datasets: [{
                data: [real, fake],
                backgroundColor: [
                    'rgba(74, 222, 128, 0.8)', // Green
                    'rgba(239, 68, 68, 0.8)'   // Red
                ],
                borderColor: [
                    '#4ade80',
                    '#ef4444'
                ],
                borderWidth: 2,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        font: { size: 14 }
                    }
                }
            },
            cutout: '70%',
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });
}
