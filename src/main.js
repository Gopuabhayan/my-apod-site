import { initNasaBackground } from "./nasaBackground.js";


initNasaBackground();

const savedTheme = localStorage.getItem("theme") || "dark";
document.body.classList.add(savedTheme);


const clock = document.getElementById("clock");
const date = document.getElementById("date");

function updateClock() {
  if (!clock || !date) return;
  
  const now = new Date();

 
  clock.textContent = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  
  date.textContent = now.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}


updateClock();
setInterval(updateClock, 1000);

const API_KEY = import.meta.env.VITE_NASA_API_KEY || "DEMO_KEY";
const APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&thumbs=true`;

async function loadNasaNewsCard() {
  const container = document.querySelector("#news-container");
  if (!container) return;

  try {
    const response = await fetch(APOD_URL);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    
    const mediaUrl =
      data.media_type === "image"
        ? data.hdurl || data.url
        : data.thumbnail_url || data.url;

    container.innerHTML = `
      <div class="news-card">
        <div class="news-card-image">
          <img src="${mediaUrl}" alt="${data.title}" />
        </div>
        <div class="news-card-body">
          <h3>${data.title}</h3>
          <p class="news-explanation">${data.explanation}</p>
          <div class="news-footer">
            <span class="source">🚀 NASA APOD</span>
            <span class="date">• ${data.date}</span>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Error loading APOD:", error);
    container.innerHTML = `<p style="color: #ff6b6b;">Failed to load NASA APOD news card.</p>`;
  }
}


loadNasaNewsCard();