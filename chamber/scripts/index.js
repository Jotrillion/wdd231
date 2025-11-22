const url = 'data/members.json';





const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const high = document.querySelector('#high');
const low = document.querySelector('#low');
const humidity = document.querySelector('#hum');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');
const myKey = "0158eb2916acc3da239bd4d88d9fa4c0"
const myLat = "-4.301324296128832"
const myLon = "15.284269374554892"
const url1 = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=imperial`
async function apiFetch() {
    try {
        const response = await fetch(url1);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // testing only
            displayResults(data); // uncomment when ready
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

apiFetch();

function displayResults(data) {
    currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = `${desc}`;

    // Display humidity from main object
    humidity.innerHTML = `${data.main.humidity}%`;

    // Display high and low from main object
    high.innerHTML = `${Math.round(data.main.temp_max)}&deg;F`;
    low.innerHTML = `${Math.round(data.main.temp_min)}&deg;F`;

    // Format sunrise and sunset from sys object
    const sunriseTimestamp = data.sys.sunrise * 1000;
    const sunsetTimestamp = data.sys.sunset * 1000;

    // Helper function to format the timestamp
    const timeFormatter = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    const sunriseTime = timeFormatter.format(sunriseTimestamp);
    const sunsetTime = timeFormatter.format(sunsetTimestamp);
    sunrise.innerHTML = `${sunriseTime}`;
    sunset.innerHTML = `${sunsetTime}`;
}

// Forecast API
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=imperial`;
const forecastContainer = document.querySelector('#idcast');

async function apiFetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            console.log('Forecast data:', data);
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log('Forecast error:', error);
    }
}

function displayForecast(data) {
    // Clear existing content
    forecastContainer.innerHTML = '';

    // Get forecast for next 3 days (data is every 3 hours, so we take one per day at noon)
    const dailyForecasts = [];
    const processedDates = new Set();

    // Loop through the forecast list and get one forecast per day
    for (let i = 0; i < data.list.length && dailyForecasts.length < 3; i++) {
        const forecast = data.list[i];
        const date = new Date(forecast.dt * 1000);
        const dateString = date.toDateString();

        // Get forecast around noon (12:00) for each day
        const hour = date.getHours();
        if (!processedDates.has(dateString) && (hour >= 11 && hour <= 14)) {
            processedDates.add(dateString);
            dailyForecasts.push(forecast);
        }
    }

    // If we don't have enough midday forecasts, just take the first 3 unique days
    if (dailyForecasts.length < 3) {
        dailyForecasts.length = 0;
        processedDates.clear();
        for (let i = 0; i < data.list.length && dailyForecasts.length < 3; i++) {
            const forecast = data.list[i];
            const date = new Date(forecast.dt * 1000);
            const dateString = date.toDateString();

            if (!processedDates.has(dateString)) {
                processedDates.add(dateString);
                dailyForecasts.push(forecast);
            }
        }
    }

    // Display each day's forecast
    dailyForecasts.forEach((forecast, index) => {
        const date = new Date(forecast.dt * 1000);
        const dayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long' });
        const dayName = index === 0 ? 'Today' : dayFormatter.format(date);

        const forecastDay = document.createElement('div');
        forecastDay.classList.add('forecast-day');

        forecastDay.innerHTML = `
            <p class="day-name">${dayName}</p>
            <p class="temp">${Math.round(forecast.main.temp)}&deg;F</p>
        `;

        forecastContainer.appendChild(forecastDay);
    });
}

apiFetchForecast();


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
        // displayMembers(members); // Call function to display the members
        displayRandomBusinessMembers(members); // Display 3 random members in business section
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
        let memberName = document.createElement('h2');
        let memberAdress = document.createElement("p");
        let memberImage = document.createElement('img');
        memberImage.classList.add("photo");
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
        memberImage.setAttribute('width', '180');
        memberImage.setAttribute('height', '180');

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

// Function to display 3 random business members
function displayRandomBusinessMembers(members) {
    const businessContainer = document.querySelector('#business');

    if (!businessContainer) return;

    // Clear existing content
    businessContainer.innerHTML = '<h2>Spotlight Members</h2>';

    // Filter members with Gold or Silver membership level (optional - remove filter to include all)
    const qualifiedMembers = members.filter(member =>
        member.membership_level === 'Gold' || member.membership_level === 'Silver'
    );

    // If not enough qualified members, use all members
    const membersPool = qualifiedMembers.length >= 3 ? qualifiedMembers : members;

    // Get 3 random members
    const randomMembers = getRandomMembers(membersPool, 3);

    // Create a container for the cards
    const cardsContainer = document.createElement('div');
    cardsContainer.classList.add('business-spotlight');

    // Display each random member
    randomMembers.forEach((member) => {
        const memberCard = document.createElement('section');
        memberCard.classList.add('spotlight-card');

        const memberName = document.createElement('h3');
        const memberImage = document.createElement('img');
        const memberPhone = document.createElement('p');
        const memberAddress = document.createElement('p');
        const memberWebsite = document.createElement('a');
        const memberLevel = document.createElement('p');

        // Set content
        memberName.textContent = member.name;
        memberPhone.textContent = `📞 ${member.phone_numbers}`;
        memberAddress.textContent = `📍 ${member.addresses.street}, ${member.addresses.city}`;
        memberWebsite.textContent = 'Visit Website';
        memberWebsite.href = member.website_urls;
        memberWebsite.target = '_blank';
        memberWebsite.rel = 'noopener';
        memberLevel.textContent = `⭐ ${member.membership_level} Member`;
        memberLevel.classList.add('membership-badge');

        // Set image attributes
        memberImage.setAttribute('src', member.image_or_icon_file_names);
        memberImage.setAttribute('alt', `${member.name} logo`);
        memberImage.setAttribute('loading', 'lazy');
        memberImage.setAttribute('width', '150');
        memberImage.setAttribute('height', '150');

        // Append elements to card
        memberCard.appendChild(memberImage);
        memberCard.appendChild(memberName);
        memberCard.appendChild(memberLevel);
        memberCard.appendChild(memberPhone);
        memberCard.appendChild(memberAddress);
        memberCard.appendChild(memberWebsite);

        cardsContainer.appendChild(memberCard);
    });

    businessContainer.appendChild(cardsContainer);
}

// Helper function to get random members from array
function getRandomMembers(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}



