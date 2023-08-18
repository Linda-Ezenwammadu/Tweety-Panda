const section = document.querySelectorAll('section');
const link = document.querySelectorAll('.nav-link');

window.onscroll = function(){
    section.forEach(sec=> {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id     = sec.getAttribute('id');

        if(top >= offset && top < offset+height){
        link.forEach(lin => {
            lin.classList.remove('active');
            document.querySelector('.nav-link[href*='+id+']').classList.add('active');
        })
    }
    })
}

const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll("img")[0],
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    // showing and hiding prev/next icon according to carousel scroll left value
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the carousel scroll left else add to it
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
    });
});

const autoSlide = () => {
    // if there is no image left to scroll then return from here
    if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    // getting difference value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // if user is scrolling to the left
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    // updatating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);

// Message slideshow
let currentIndex = 0;
const sender = document.querySelector('.sender');
const message = document.querySelector('.theMessage');
let prev = document.querySelector('.prev');
let next = document.querySelector('.next');

const messages = [
    {
        sender: "OgeLinda",
        message: "Happy married life"
    },
    {
        sender: "TobeChukwu",
        message: "Enjoy your new home"
    },
    {
        sender: "ToChukwu",
        message: `Congratulations on your wedding day! May your journey together be filled with love, joy, 
                and endless laughter. As you embark on this new chapter of your lives, 
                may your love continue to grow stronger with each passing day. May your days be filled with shared dreams, 
                cherished moments, and unwavering support for one another. Here's to a lifetime of happiness, love, 
                and beautiful memories. Cheers to the newlyweds!`
    }
];

sender.textContent = messages[0].sender;
message.textContent = messages[0].message;

const showMessage = (index) => {
    sender.textContent = messages[index].sender;
    message.textContent = messages[index].message;
}

// Next/previous controls
const slideControl = (n) => {
    currentIndex >= messages.length - 2 ? next.style.display = 'none' : next.style.display = 'block';
    currentIndex <=  0? prev.style.display = 'none' : prev.style.display = 'block';
    showMessage(currentIndex += n);   
    console.log(currentIndex) 
  }

showMessage()
