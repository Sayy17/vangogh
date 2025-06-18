window.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  
  const header = document.querySelector("header");
  // hero on-load animation
  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

  tl
    .to("header", {
      "--border-width": "100%",
      duration: 3,
    }, 0)

    .from(".nav a", {
      y: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    }, 0.2)

    .fromTo(".social-link", 
      {
        y: -50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      }, 0.5)

    .to(".hero-content h1", {
      opacity: 1,
      duration: 1,
    }, 0)

    .to(".hero-content .line", {
      color: "#D4AF37",
      "-webkit-text-stroke": "0px #D4AF37",
    })

    .from(".hero-content .line", {
      x: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    }, 1)

    .to(".hero-vann-wrapper", {
      opacity: 1,
      scale: 0.8,
      duration: 1.3,
      ease: "power3.out",
    }, 1.5)

    .from(".hero-content p", {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power2.out",
    }, 1.5);

  // journey scroll (needs adjustments)
  const heroVan = document.querySelector(".hero-vann-wrapper");

  const vanTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".journey-section",
      start: "top center",
      end: "bottom center",
      scrub: 1
    }
  });

  // left
  vanTimeline.to(heroVan, { 
    y: 700,
    x: 900, 
    duration: 1
  });

  // right
  vanTimeline.to(heroVan, {
    x: -60, 
    y: 1300,
    duration: 1
  });

  // left
  vanTimeline.to(heroVan, { 
    x: 1000,
    y: 1950, 
    duration: 1 
  });

  // right
  vanTimeline.to(heroVan, {
    x: -100,
    y: 2510, 
    duration: 1
  });

  // journey period cards scroll
  gsap.utils.toArray(".journey-period").forEach((period) => {
    gsap.from(period, {
      scrollTrigger: {
        trigger: period,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    });
  });

  // section header scroll 
  gsap.utils.toArray('.section-header').forEach(section => {
    gsap.fromTo(section, 
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        }
      }
    );
  });

  // quote cards scroll 
  gsap.utils.toArray('.quote-card').forEach((card, index) => {
    const direction = index % 2 === 0 ? -100 : 100;
    
    gsap.fromTo(card, 
      { 
        x: `${direction}vw`, 
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse none none"
        }
      }
    );
  });

  // quotes section title scroll
  gsap.fromTo('.quotes-title', 
    {
      y: -100,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: '.quotes-title',
        start: "top 80%",
      }
    }
  );

  // TV gallery scroll
  gsap.from(".tv-gallery-title", {
    scrollTrigger: {
      trigger: ".tv-gallery-section",
      start: "top 80%",
      toggleActions: "play none none none"
    },
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  });

  gsap.from(".tv-screen", {
    scrollTrigger: {
      trigger: ".tv-gallery-section",
      start: "top 70%",
      toggleActions: "play none none none"
    },
    scale: 0.7,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out"
  });

  gsap.from(".painting-info", {
    scrollTrigger: {
      trigger: ".tv-gallery-section",
      start: "top 60%",
      toggleActions: "play none none none"
    },
    y: 100,
    opacity: 0,
    duration: 1.2,
    ease: "power2.out"
  });
});
