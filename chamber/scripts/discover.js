import { places } from '../data/places.mjs';
const discover = document.querySelector('#discover');

// Build 8 cards for places
places.forEach(place => {
    // Create card container
    const card = document.createElement('article');
    card.className = 'place-card';

    // h2 for title
    const title = document.createElement('h2');
    title.textContent = place.name;
    card.appendChild(title);

    // figure for image
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = `images/${place.photo_url}`;
    img.alt = place.name;
    img.loading = 'lazy';
    figure.appendChild(img);
    card.appendChild(figure);

    // address tag
    const address = document.createElement('address');
    address.textContent = place.address;
    card.appendChild(address);

    // paragraph for description
    const description = document.createElement('p');
    description.textContent = place.description;
    card.appendChild(description);

    // button
    const button = document.createElement('button');
    button.textContent = 'learn more';
    button.type = 'button';
    card.appendChild(button);

    // Append card to container
    discover.appendChild(card);
});
