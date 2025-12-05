// Set the timestamp when the page loads
document.addEventListener('DOMContentLoaded', function () {
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        const now = new Date();
        timestampField.value = now.toISOString();
    }
});

const cards = document.querySelector('#card');
const section = document.createElement('section');
section.classList.add('sec');
const heading = document.createElement('h1');
heading.classList.add('head');
const div = document.createElement('div');
div.classList.add('div');
const divy = document.createElement('div');
divy.classList.add('divy');
const divye = document.createElement('div');
divye.classList.add('divye');
const divyer = document.createElement('div');
divyer.classList.add('divyer');
heading.textContent = 'Membership Levels';
div.innerHTML = `
    <p>Educator Membership Level</p>
    <button id="openbutton3">Learn More</button>
    <dialog id="dialogbox3">
        <div class="dialog-animation"></div>
        <p>it offers trainings to educators</p>
        <button id="closebutton3">Close</button>
    </dialog>
`;
divy.innerHTML = `
    <p>Institution Membership Level</p>
    <button id="openbutton1">Learn More</button>
    <dialog id="dialogbox1">
        <div class="dialog-animation"></div>
        <p>it offers adversiting services</p>
        <button id="closebutton1">Close</button>
    </dialog>`;
divye.innerHTML = `
    <p>Student Membership Level</p>
    <button id="openbutton2">Learn More</button>
    <dialog id="dialogbox2">
        <div class="dialog-animation"></div>
        <p>it offers discount for the marketing event</p>
        <button id="closebutton2">Close</button>
    </dialog>`;
divyer.innerHTML = `
    <p>Sponsor Membership Level</p>
    <button id="openbutton4">Learn More</button>
    <dialog id="dialogbox4">
        <div class="dialog-animation"></div>
        <p>it is organizing a meet event with the governement officials</p>
        <button id="closebutton4">Close</button>
    </dialog>`;
section.appendChild(heading);
section.appendChild(div);
section.appendChild(divy);
section.appendChild(divye);
section.appendChild(divyer);
cards.appendChild(section);

// Add event listeners for dialogs
document.getElementById('openbutton3').addEventListener('click', () => {
    document.getElementById('dialogbox3').showModal();
});
document.getElementById('closebutton3').addEventListener('click', () => {
    document.getElementById('dialogbox3').close();
});

document.getElementById('openbutton1').addEventListener('click', () => {
    document.getElementById('dialogbox1').showModal();
});
document.getElementById('closebutton1').addEventListener('click', () => {
    document.getElementById('dialogbox1').close();
});

document.getElementById('openbutton2').addEventListener('click', () => {
    document.getElementById('dialogbox2').showModal();
});
document.getElementById('closebutton2').addEventListener('click', () => {
    document.getElementById('dialogbox2').close();
});

document.getElementById('openbutton4').addEventListener('click', () => {
    document.getElementById('dialogbox4').showModal();
});
document.getElementById('closebutton4').addEventListener('click', () => {
    document.getElementById('dialogbox4').close();
});

