/* -------- Fitty Specifications -------- */

if (window.innerWidth >= 800) fitty('#home #big-title');


/* -------- Loading Screen -------- */

const loading = document.querySelector('#loading');

function loadingScreen () {
    setTimeout(() => {loading.style.display = 'none';}, 3500);
    
}

window.addEventListener('DOMContentLoaded', loadingScreen)

/* -------- Nav Link Activation -------- */

const video = document.querySelector('#video');

const linkSections = document.querySelectorAll('section.link');
const headerLinks = document.querySelectorAll('header nav a');

function navLinkActivation () {
    for (let i = 0; i < linkSections.length; i++) {
        let top = linkSections[i].getBoundingClientRect().top;
        let bottom = linkSections[i].getBoundingClientRect().bottom;
        if (i === linkSections.length - 1) bottom = video.getBoundingClientRect().bottom

        if (top <= 60 && bottom > 0) {
            headerLinks[i].style.fontWeight = 'bold';
        } else {
            headerLinks[i].style.fontWeight = 'normal';
        }
    }
}

window.addEventListener('scroll', navLinkActivation);

/* -------- Grid -------- */

const grid = document.querySelector('.grid');
const cards = document.querySelectorAll('.grid > div > div')
let array = Array.from(cards).reverse();
let gridBool = false;

function gridClick() {
        if (gridBool) {
            anime({
                targets: array,
                rotateY: 0,
                duration: 10,
                delay: anime.stagger(100)
            });
            gridBool = false;
        } else {
            anime({
                targets: cards,
                rotateY: 180,
                duration: 10,
                delay: anime.stagger(100)
            });
            gridBool = true;
        }
}

grid.onclick = gridClick;

const left = document.querySelector('#left');
const right = document.querySelector('#right');

left.onclick = () => {
    anime({
        targets: array,
        rotateY: 0,
        duration: 10,
        delay: anime.stagger(100)
    });
    gridBool = false;
}


right.onclick = () => {
    anime({
        targets: cards,
        rotateY: 180,
        duration: 10,
        delay: anime.stagger(100)
    });
    gridBool = true;
}

/* -------- Header -------- */

const aboutUs = document.querySelector('#about-us');
const header = document.querySelector('header');
const headerButton = header.querySelector('button');
const headerLogo = header.querySelector('.logo');

let active = false;

window.addEventListener('scroll', () => {
    let aboutUsTop = aboutUs.getBoundingClientRect().top;
    if (aboutUsTop <= 50 && active == false) {
        header.classList.add('active');
        headerButton.classList.add('active');
        headerLogo.classList.add('active');
        active = true;
    }
    
    if (aboutUsTop >= 50 && active == true) {
        header.classList.remove('active');
        headerButton.classList.remove('active');
        headerLogo.classList.remove('active');
        active = false;
    }


})

/* -------- Menu -------- */

const menu = document.querySelector('.menu');
const menuButton = document.querySelector('.menu-btn');
const lines = menuButton.querySelectorAll('div');

const menuLinks = menu.querySelectorAll('a');
const languages = document.querySelector('.languages');

menuButton.onclick = () => {
    menu.classList.toggle('open');
    document.body.classList.toggle('open-menu');


    lines.forEach(line => {
        line.classList.toggle('cross');
    })


    if (menu.classList.contains('open')) {
        if (headerLogo.classList.contains('active')) {
            headerLogo.style.opacity = '0';
        }

        setTimeout(() => {
            anime({
                targets: menuLinks,
                marginLeft: 0,
                duration: 1500,
                opacity: 1,
                delay: anime.stagger(100)
            });
        }, 400);
        
        setTimeout(() => {languages.classList.toggle('open')}, 1000);
    } else {
        setTimeout(() => {if (headerLogo.classList.contains('active')) {
            headerLogo.style.opacity = '1';
        }}, 600)
        
        anime({
            targets: menuLinks,
            marginLeft: -100,
            duration: 1500,
            opacity: 0,
            delay: anime.stagger(100)
        });

        languages.classList.toggle('open');
    }
}

menuLinks.forEach(link => {
    link.onclick = () => {
        headerLogo.style.opacity = '1';
        document.body.classList.toggle('open-menu');
        languages.classList.toggle('open');
        menu.classList.toggle('open');

        lines.forEach(line => {
            line.classList.toggle('cross');
        })

        anime({
            targets: menuLinks,
            marginLeft: -100,
            duration: 1500,
            opacity: 0,
            delay: anime.stagger(100)
        });
    }
})

/* -------- Home Parallax -------- */

const home = document.querySelector('#home');
const image = document.querySelector('#home img');

home.onmousemove = (event) => {
    let x = 50;
    let y = 40;

    let moveX = event.clientX / window.innerWidth;
    let moveY = event.clientY / window.innerHeight;

    if (window.innerWidth >= 1024) {
        home.style.backgroundPosition = (-moveX * 10 + x) + '% ' + (-moveY * 10 + y) + '%';
        image.style.left = moveX * 2 + 50 + '%';
        image.style.top = moveY * 2 + 50 + '%';
    }
}

/* -------- Intersection Observer -------- */
const docLines = document.querySelectorAll('.line');

const lineObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('slide');
        } else {
            entry.target.classList.add('slide');
        }
    })
})

docLines.forEach(line => lineObserver.observe(line));

const formPassport = document.querySelector('#contact-us img'); 

const formObserver = new IntersectionObserver (entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.style.rotate = 'none';
        } else {
            entry.target.style.rotate = '-20deg';
        }
    })
})

formObserver.observe(formPassport);

const splitImage = document.querySelector('#split-image');

const splitObserver = new IntersectionObserver (entries => {
    entries.forEach(entry => {
        setTimeout(() => {
            if(entry.isIntersecting) {
                entry.target.style.height = '100%';
            } else {
                entry.target.style.height = '50%';
            } 
        }, 200);
    })
})

splitObserver.observe(splitImage);

/* -------- About Us Animation -------- */

const section = document.querySelector('#about-us .carousell');
const images = section.querySelectorAll('img');
let aboutUsBool = false;

function aboutUsClick() {
    if (window.innerWidth < 1024) {
        if (aboutUsBool) {
            images[0].style.left = 0;
            images[1].style.right = 0;
            images[1].classList.toggle('big-image');
            images[1].classList.toggle('small-image');
            images[2].style.right = -65 + '%';

            aboutUsBool = false;
        } else {
            images[0].style.left = -55 + '%';
            images[1].style.right = 60 + '%';
            images[1].classList.toggle('big-image');
            images[1].classList.toggle('small-image');
            images[2].style.right = 0;

            aboutUsBool = true;
        }
    }
}

section.onclick = aboutUsClick;

if (window.innerWidth >= 1024) {
    section.onmouseenter = () => {
        images[0].style.left = -55 + '%';
        images[1].style.right = 60 + '%';
        images[1].classList.toggle('big-image');
        images[1].classList.toggle('small-image');
        images[2].style.right = 0;
    }
    
    section.onmouseleave = () => {
        images[0].style.left = 0;
        images[1].style.right = 0;
        images[1].classList.toggle('big-image');
        images[1].classList.toggle('small-image');
        images[2].style.right = -65 + '%';
    }
}

/* -------- Form Details -------- */

const form = document.querySelector('#contact-us form');
const formButton = form.querySelector('#submit')
formButton.onclick = (ev) => {  
    ev.preventDefault();                     
    let salutation = form.querySelector("#salutation").value;
    let fname = form.querySelector("#fname").value;
    let lname = form.querySelector('#lname').value;
    let nationality = form.querySelector('#nationality').value;
    let country = form.querySelector('#country').value;
    let email = form.querySelector('#email').value;
    let tel = form.querySelector('#tel').value;
    let message = form.querySelector('#message').value;


    if (fname == '' || lname == '' || salutation == '' || nationality == '' || country == '' || email == '') {
        alert('All form fields must be filled');
        return;
    }

    let phoneNumber = 17135038881;

    let url = "https://wa.me/" + phoneNumber + "?text="

    + 'Salutation: ' + salutation + ', ' 
    + 'First name: ' + fname + ', ' 
    + 'Last name: ' + lname + ', '
    + 'Nationality: ' + nationality + ', '
    + 'Current residence: ' + country + ', '
    + 'E-mail: ' + email + ', '
    + 'Phone number: ' + tel + ', '
    + 'Message: ' + message + '. ';
    console.log(url)
    
    window.open(url,'_blank').focus();
}