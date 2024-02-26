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
    delay: 1,
    display: "none",
  });

  tl.from("main", {
    y: 1500,
  });
  
  tl.from('.hero h1',{
    y:100,
    stagger:.2
  })
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

loader();
mouseAnimate();
