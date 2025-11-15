const url = 'data/members.json';
const cards = document.querySelector('#cards');
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");

// Function to fetch members data
async function getMembers(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            cache: 'force-cache'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const members = await response.json();
        console.table(members); // Optional: log the data to see it in console
        displayMembers(members); // Call function to display the members
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}

// Function to display members
function displayMembers(members) {
    // Use document fragment for better performance
    const fragment = document.createDocumentFragment();

    members.forEach((member) => {
        // Create elements for each member
        let memberCard = document.createElement('section');
        memberCard.classList.add("pic");
        let memberName = document.createElement('h3');
        let memberAdress = document.createElement("p");
        let memberImage = document.createElement('img');
        let memberPhone = document.createElement('p');
        memberPhone.classList.add("phone");
        let memberWebsite = document.createElement('a');
        let memberLevel = document.createElement("p");
        memberLevel.classList.add("level");

        // Set content
        memberName.textContent = member.name;
        memberAdress.textContent = `${member.addresses.street}, ${member.addresses.city}`;
        memberPhone.textContent = member.phone_numbers;
        memberWebsite.textContent = 'Visit Website';
        memberWebsite.href = member.website_urls;
        memberWebsite.target = '_blank';
        memberWebsite.rel = 'noopener';
        memberLevel.textContent = `Level is ${member.membership_level}`

        // Set image attributes
        memberImage.setAttribute('src', member.image_or_icon_file_names);
        memberImage.setAttribute('alt', `${member.name} logo`);
        memberImage.setAttribute('loading', 'lazy');
        memberImage.setAttribute('decoding', 'async');
        memberImage.setAttribute('width', '200');
        memberImage.setAttribute('height', '150');

        // Append elements to card
        memberCard.appendChild(memberName);
        memberCard.appendChild(memberImage);
        memberCard.appendChild(memberAdress);
        memberCard.appendChild(memberPhone);
        memberCard.appendChild(memberWebsite);
        memberCard.appendChild(memberLevel);

        // Append card to fragment instead of directly to DOM
        fragment.appendChild(memberCard);
    });

    // Single DOM update
    if (cards) {
        cards.appendChild(fragment);
    }
}

// Call the function to load members
getMembers(url);



gridbutton.addEventListener("click", () => {
    // example using arrow function
    cards.classList.add("grid");
    cards.classList.remove("list");
});

listbutton.addEventListener("click", showList); // example using defined function

function showList() {
    cards.classList.add("list");
    cards.classList.remove("grid");
}
