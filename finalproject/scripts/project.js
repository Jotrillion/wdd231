const currentyear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const now = new Date();
currentyear.innerHTML = ` <span class="highlight">${now.getFullYear()}</span>`;
lastModified.innerHTML = `Last Modification: <span class="light">${document.lastModified}</span>`;
const menuButton = document.getElementById('top');
const navBar = document.querySelector('.nav-list');
const heading = document.querySelector('.heading');
if (menuButton && navBar && heading) {
    menuButton.addEventListener('click', () => {
        const expanded = menuButton.classList.toggle('show');
        navBar.classList.toggle('show');
        heading.classList.toggle('hide');
        menuButton.setAttribute('aria-expanded', expanded);
    });
}

// Import ES Module functions with dynamic import and try/catch
async function loadScholarships() {
    const addSection = document.getElementById('addsect');

    if (!addSection) return;

    try {
        // ES MODULE IMPORT: Import helper functions from external module
        const { createScholarshipSection, filterScholarshipsByType } = await import('./scholarshipHelper.mjs');

        // ASYNC FETCH: Fetch scholarship data from local JSON file
        const response = await fetch('data/bursary.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const bursary = await response.json();

        if (bursary && bursary.scholarships) {
            // Use imported module function to filter scholarships
            const congoleseScholarships = filterScholarshipsByType(bursary.scholarships, 'Congolese');
            const internationalScholarships = filterScholarshipsByType(bursary.scholarships, 'International');

            // Use imported module function to create sections
            const congoleseSection = createScholarshipSection('Congolese Scholarships', congoleseScholarships);
            addSection.appendChild(congoleseSection);

            const internationalSection = createScholarshipSection('International Scholarships', internationalScholarships);
            addSection.appendChild(internationalSection);
            
        }
    } catch (error) {
        // TRY/CATCH: Handle any errors during module import or data fetching
        console.error('Error loading scholarship data:', error);

        // Display user-friendly error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.innerHTML = `
            <h3>Unable to Load Scholarships</h3>
            <p>We're having trouble loading scholarship data. Please try refreshing the page.</p>
            <p class="error-details">Error: ${error.message}</p>
        `;
        addSection.appendChild(errorMessage);
    }
}

// Call the async function to load scholarships
loadScholarships();
