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
