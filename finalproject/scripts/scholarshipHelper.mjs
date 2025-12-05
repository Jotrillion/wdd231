/**
 * Scholarship Helper Module
 * Provides utility functions for scholarship card creation and data processing
 */

/**
 * Creates a scholarship card element with all relevant information
 * @param {Object} scholarship - The scholarship data object
 * @returns {HTMLElement} The created article element (card)
 */
export function createScholarshipCard(scholarship) {
    const card = document.createElement('article');
    card.className = 'scholarship-card';

    const name = document.createElement('h4');
    name.textContent = scholarship.name;
    card.appendChild(name);

    const institution = document.createElement('p');
    institution.className = 'institution';
    institution.textContent = scholarship.institution;
    card.appendChild(institution);

    const field = document.createElement('p');
    field.className = 'field';
    field.innerHTML = `<strong>Field:</strong> ${scholarship.field_of_study}`;
    card.appendChild(field);

    if (scholarship.amount_usd) {
        const amount = document.createElement('p');
        amount.className = 'amount';
        amount.innerHTML = `<strong>Amount:</strong> $${scholarship.amount_usd.toLocaleString()} USD`;
        card.appendChild(amount);
    }

    if (scholarship.is_fully_funded) {
        const funded = document.createElement('p');
        funded.className = 'fully-funded';
        funded.textContent = '✓ Fully Funded';
        card.appendChild(funded);
    }

    if (scholarship.level) {
        const level = document.createElement('p');
        level.className = 'level';
        level.innerHTML = `<strong>Level:</strong> ${scholarship.level}`;
        card.appendChild(level);
    }

    const deadline = document.createElement('p');
    deadline.className = 'deadline';
    deadline.innerHTML = `<strong>Deadline:</strong> ${scholarship.deadline}`;
    card.appendChild(deadline);

    const link = document.createElement('a');
    link.href = scholarship.application_link;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'Apply Now';
    link.className = 'apply-button';
    card.appendChild(link);

    return card;
}

/**
 * Filters scholarships by type
 * @param {Array} scholarships - Array of scholarship objects
 * @param {string} type - Type to filter by ('Congolese' or 'International')
 * @returns {Array} Filtered scholarships
 */
export function filterScholarshipsByType(scholarships, type) {
    return scholarships.filter(s => s.type === type);
}

/**
 * Creates a section element with heading and grid
 * @param {string} title - Section title
 * @param {Array} scholarships - Array of scholarship objects
 * @returns {HTMLElement} The created section element
 */
export function createScholarshipSection(title, scholarships) {
    const section = document.createElement('section');
    section.className = 'scholarship-section';

    const heading = document.createElement('h3');
    heading.textContent = title;
    section.appendChild(heading);

    const grid = document.createElement('div');
    grid.className = 'scholarship-grid';

    scholarships.forEach(scholarship => {
        const card = createScholarshipCard(scholarship);
        grid.appendChild(card);
    });

    section.appendChild(grid);
    return section;
}
