// Preload images for the pie chart
const iconImages = {
  "Physical Touch": new Image(),
  "Acts of Service": new Image(),
  "Receiving Gifts": new Image(),
  "Quality Time": new Image(),
  "Words of Affirmation": new Image(),
};

// Set image sources
iconImages["Physical Touch"].src = "./assets/physical_touch.png";
iconImages["Acts of Service"].src = "./assets/acts_of_service.png";
iconImages["Receiving Gifts"].src = "./assets/receiving_gifts.png";
iconImages["Quality Time"].src = "./assets/quality_time.png";
iconImages["Words of Affirmation"].src = "./assets/words_of_affirmation.png";

// Chart.js configuration
const ctx = document.getElementById("lovePieChart").getContext("2d");
const lovePieChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: [
      "Physical Touch",
      "Acts of Service",
      "Receiving Gifts",
      "Quality Time",
      "Words of Affirmation",
    ],
    datasets: [
      {
        label: "Love Languages",
        data: [20, 20, 20, 20, 20],
        backgroundColor: [
          "#f8b6c1",
          "#f48ca6",
          "#f27292",
          "#e35d75",
          "#c94a64",
        ],
        borderColor: "#fff",
        borderWidth: 2,
        hoverOffset: 20,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: true, position: "right" },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.label + ": " + context.parsed + "%";
          },
        },
      },
    },
  },
  plugins: [
    {
      id: "customIcons",
      afterDatasetsDraw(chart) {
        const { ctx, chartArea, data } = chart;
        // Scale icon size based on chart width
        let iconSize;

        if (chartArea.width < 300)
          iconSize = 50; // Smaller for very small screens
        else if (chartArea.width < 400) iconSize = 60; // Medium for tablets
        else if (chartArea.width < 500) iconSize = 60;
        else if (chartArea.width < 200) iconSize = 30;
        else {
          iconSize = 80; // Full size for desktops
        }
        const offset = 1.2; // Position icons 80% from center to edge to avoid overlap

        data.labels.forEach((label, index) => {
          const meta = chart.getDatasetMeta(0);
          const arc = meta.data[index];
          const angle = arc.startAngle + (arc.endAngle - arc.startAngle) / 2;
          const radius = (arc.outerRadius + arc.innerRadius) / 2;
          const x =
            chartArea.left +
            chartArea.width / 2 +
            Math.cos(angle) * radius * offset;
          const y =
            chartArea.top +
            chartArea.height / 2 +
            Math.sin(angle) * radius * offset;

          const img = iconImages[label];
          if (img.complete && img.naturalWidth !== 0) {
            ctx.save();
            ctx.filter = "drop-shadow(0 0 5px rgba(255, 255, 255, 0.7))"; // Glowing effect
            ctx.drawImage(
              img,
              x - iconSize / 2,
              y - iconSize / 2,
              iconSize,
              iconSize
            );
            ctx.restore();
          }
        });
      },
    },
  ],
});

// Notification Pop-Up
const notification = document.getElementById("notification");
setTimeout(() => {
  notification.style.display = "none";
}, 4000);

// Music Play/Pause Toggle
const musicToggle = document.getElementById("music-toggle");
const audio = document.getElementById("background-music");

musicToggle.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    musicToggle.classList.add("playing");
  } else {
    audio.pause();
    musicToggle.classList.remove("playing");
  }
});

// Add touch interaction for photo cubes
document.querySelectorAll(".photo-cube").forEach((cube) => {
  cube.addEventListener("click", () => {
    cube.classList.toggle("active");
  });

  let touchStartX = 0;
  let touchEndX = 0;

  cube.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  cube.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const swipeDistance = touchEndX - touchStartX;

    if (swipeDistance < -50) {
      cube.classList.add("active");
    } else if (swipeDistance > 50) {
      cube.classList.remove("active");
    }
  });
});

document.querySelectorAll(".cube-container").forEach((container) => {
  container.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault();
    },
    { passive: false }
  );
});
