const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim() {
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })

    .to(".boundinglem", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger: .2
    })

    .from("#herofooter", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut
    })
}

var timeout;

function circleSqueezing() {

    // default scale value 
    var xscale = 1;
    var yscale = 1;

    xprev = 0;
    yprev = 0;

    window.addEventListener("mousemove",function(details) {
        this.clearTimeout(timeout);
        xscale = gsap.utils.clamp( 0.8, 1.2, details.clientX - xprev);
        yscale = gsap.utils.clamp( 0.8, 1.2, details.clientY - yprev);

        xprev = details.clientX;  
        yprev = details.clientY;  

        miniCircleFollower(xscale, yscale);

        timeout = setTimeout(function () {
        document.querySelector("#minicircle").style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(1, 1)`
            
        }, 100);
    })
}

circleSqueezing();

function miniCircleFollower(xscale, yscale) {
    window.addEventListener('mousemove', function(details) {
        document.querySelector("#minicircle").style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(${xscale}, ${yscale})`
    })
}

miniCircleFollower();
firstPageAnim();


document.querySelectorAll(".elem").forEach(function(elem) {

    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function(details) {

        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5,
        });
    });

    elem.addEventListener("mousemove", function(details) {

        var diff = details.clientY - elem.getBoundingClientRect().top;

        diffrot = details.clientX - rotate;
        rotate = details.clientX;
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff, 
            left: details.clientX,
            rotate: gsap.utils.clamp( -20, 20, diffrot*0.5),
        });
    });
});