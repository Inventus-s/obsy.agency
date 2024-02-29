function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function loader() {
  let tl = gsap.timeline();

  tl.from(".loader h1", {
    y: 100,
    opacity: 0,
    // duration:.5,
    stagger: 0.2,
    delay: 0.3,
  });

  tl.from(".line1-count h5", {
    opacity: 0,
    onStart: () => {
      let count = 0;
      let counter = setInterval(() => {
        if (count <= 100) {
          document.querySelector(".count").textContent = count++;
        } else {
          clearInterval(counter);
        }
      }, 20);
    },
  });

  tl.to(".line h4", {
    opacity: 1,
    animationName: "anime",
  });

  tl.from(".bottom h3", {
    y: 100,
  });

  tl.to(".loader", {
    opacity: 0,
    delay: 0.7,
    display: "none",
  });

  tl.from("main", {
    y: 1500,
    opacity: 0,
  });

  tl.from(
    ".hero h1",
    {
      y: 100,
      stagger: 0.2,
    },
    "-=.5"
  );
}

function sheryAnimation() {
  Shery.imageEffect(".img-page3", {
    style: 6,
    gooey: true,
    config: {
      noiseDetail: { value: 6.11, range: [0, 100] },
      distortionAmount: { value: 2.9, range: [0, 10] },
      scale: { value: 59.54, range: [0, 100] },
      speed: { value: 0.58, range: [0, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.8333333134651184 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: true },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.27, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 0 },
      noise_speed: { value: 0.84, range: [0, 10] },
      metaball: { value: 0.44, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0, range: [0, 0.1] },
      noise_height: { value: 0.38, range: [0, 2] },
      noise_scale: { value: 8.4, range: [0, 100] },
    },
  });
  Shery.mouseFollower({
    //Parameters are optional.
    // skew: true,
    // ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    // duration: .5,
  });
  Shery.makeMagnet("nav h4");
}

let flag = 0;
let videoBtn = document.querySelector('.video-crsr');
let videoContainer = document.querySelector('.video-container');
let videoVideo = document.querySelector('.video-container video');
function page2Animation(){
  videoContainer.addEventListener('mouseenter',()=>{
    gsap.to('.mousefollower',{
      opacity:0
    });
    videoContainer.addEventListener('click', () => {
      if (flag == 0) {
        videoVideo.play();
        videoVideo.style.opacity=1;
        document.querySelector('.video-crsr').innerHTML = `<i class="ri-pause-fill"></i>`;
        gsap.to('.video-crsr',{
          scale:.5
        });
        flag = 1;
      } else{
        videoVideo.pause();
        videoVideo.style.opacity=0;
        document.querySelector('.video-crsr').innerHTML = `<i class="ri-play-fill"></i>`
        gsap.to('.video-crsr',{
          scale:1
        })
        flag = 0;
      }
  })
  });

  videoContainer.addEventListener('mousemove',(e)=>{
    // console.log(e);
    gsap.to('.video-crsr',{
      left:e.x - 70,
      y:e.y - 170
    })
  });

  videoContainer.addEventListener('mouseleave',()=>{
    gsap.to('.mousefollower',{
      opacity:1
    })
    document.querySelector('.video-adjust').innerHTML = `<div class="video-crsr" style="top:115vh; right: 15vw;">
                                  <i class="ri-play-fill"></i>
                                </div>`
  });
};


function page1(){
  document.addEventListener('mousemove',(e)=>{
    console.log(e);
    gsap.to('.flag',{
      x:e.clientX - 150
    })
  })
  document.querySelector('.hero-hover .web').addEventListener('mouseenter',()=>{
    gsap.to('.flag',{
      opacity:1
    })
  })
  document.querySelector('.hero-hover .graphic').addEventListener('mouseenter',()=>{
    gsap.to('.flag',{
      opacity:1
    })
  })
  document.querySelector('.hero-hover .web').addEventListener('mouseleave',()=>{
    gsap.to('.flag',{
      opacity:0
    })
  })
  document.querySelector('.hero-hover .graphic').addEventListener('mouseleave',()=>{
    gsap.to('.flag',{
      opacity:0
    })
  })
}

locomotiveAnimation();
sheryAnimation();
loader();
page1();
page2Animation();



