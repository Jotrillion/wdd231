const currentyear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const now = new Date();
currentyear.innerHTML = ` <span class="highlight">${now.getFullYear()}</span>`;
lastModified.innerHTML = `Last Modification: <span class="light">${document.lastModified}</span>`;

// Visit tracking with localStorage
document.addEventListener("DOMContentLoaded", function () {
    const visitMessageElement = document.querySelector("#visitMessage");

    // Only run if the visitMessage element exists on the page
    if (visitMessageElement) {
        // Get the last visit date from localStorage
        const lastVisit = localStorage.getItem("lastVisit");
        const now = Date.now();
        let message = "";

        if (!lastVisit) {
            // First visit
            message = "Welcome! Let us know if you have any questions.";
        } else {
            const lastVisitTime = parseInt(lastVisit, 10);
            const timeDiff = now - lastVisitTime;
            const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

            if (daysDiff < 1) {
                // Less than a day
                message = "Back so soon! Awesome!";
            } else if (daysDiff === 1) {
                // Exactly 1 day
                message = "You last visited 1 day ago.";
            } else {
                // More than 1 day
                message = `You last visited ${daysDiff} days ago.`;
            }
        }

        // Save the current visit time
        localStorage.setItem("lastVisit", now);

        // Display the message
        visitMessageElement.textContent = message;
    }
});