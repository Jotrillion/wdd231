const dialogbox = document.querySelector("#dialogbox");
const closebutton = document.querySelector("#closebutton");
const openbutton1 = document.querySelector("#openbutton1");
const openbutton2 = document.querySelector("#openbutton2");
const openbutton3 = document.querySelector("#openbutton3");
const dialogboxtest = document.querySelector("#dialogbox div");
openbutton1.addEventListener("click", () => {
    dialogbox.showModal();
    dialogboxtest.innerHTML = `one peach contains 95 calories`
});
openbutton2.addEventListener("click", () => {
    dialogbox.showModal();
    dialogboxtest.innerHTML = `one mango contains 95 calories`
});
openbutton3.addEventListener("click", () => {
    dialogbox.showModal();
    dialogboxtest.innerHTML = `one orange contains 95 calories`
});
closebutton.addEventListener("click", () => {
    dialogbox.close();
});