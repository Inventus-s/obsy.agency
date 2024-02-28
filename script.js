function locomotiveAnimation(){
  gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("main").style.transform ? "transform" : "fixed"
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
    delay: .7,
    display: "none",
  });

  tl.from("main", {
    y: 1500,
    opacity: 0,
  });
  
  tl.from('.hero h1',{
    y:100,
    stagger:.2
  },"-=.5")
}

function mouseAnimate() {
  document.addEventListener("mousemove", (e) => {
    gsap.to(".crsr", {
      left: e.x,
      top: e.y,
    });
  });
  Shery.makeMagnet("nav h4");
}

locomotiveAnimation();
loader();
mouseAnimate();