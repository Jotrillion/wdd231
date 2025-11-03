const currentyear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const now = new Date();
currentyear.innerHTML = ` <span class="highlight">${now.getFullYear()}</span>`;
lastModified.innerHTML = `Last Modification: <span class="light">${document.lastModified}</span>`;