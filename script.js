gsap.from(".navbar", {
    y:-70,
    delay:0.3,
    duration:0.56

})

gsap.from(".left2", {
    y:10,
    delay:0.5,
    duration:1.4,
    ease: "power4.out" 
    
})

gsap.to(".myimg",{
    y:-20,
    duration:1,
    repeat:-1,
    yoyo:true,
    ease:"power1.inOut"

})

// Animate skill circles
document.querySelectorAll('.circle').forEach(circle => {
    let percent = circle.getAttribute('data-percent');
    let angle = (percent / 100) * 360;

    // Animate using GSAP
    gsap.to(circle, {
        background: `conic-gradient(#00ed6f 0deg, #00ed6f ${angle}deg, rgba(255,255,255,0.1) ${angle}deg 360deg)`,
        duration: 2,
        ease: "power2.out"
    });
});
