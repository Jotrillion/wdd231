import { temples } from "../data/temples.js";
import { url } from "../data/temples.js";
const showHere = document.querySelector("#showHere");
const mydialog = document.querySelector("#mydialog");
const h2 = document.querySelector("#mydialog h2");
const p = document.querySelector("#mydialog p");
const button = document.querySelector("#mydialog button");
mydialog.addEventListener("click", () => {
    button.close();
});
function displayItems(data) {
    console.log(data);
    data.forEach(x => {
        console.log(x)
        const photo = document.createElement("img")
        photo.src = `${url}${x.path}`
        photo.alt = x.name
        showHere.append(photo)
    })
}
displayItems(temples)