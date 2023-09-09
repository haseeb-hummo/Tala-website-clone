let nav = document.querySelector("nav");
let menuTop = document.querySelector(".menu-top");
let menuIcon = document.querySelector(".nav-right i");

let flag = 0;

menuIcon.addEventListener("click" , function(){
    
    if (flag === 0) {
        menuTop.style.transform = `translateY(0%)`;
        nav.style.color = "#232025";
        flag = 1;
    } else {
        menuTop.style.transform = `translateY(-100%)`;
        nav.style.color = "#d1d1d1";
        flag = 0;
    }
})
