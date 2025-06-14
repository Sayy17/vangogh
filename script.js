window.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // header underline initial state
  document.documentElement.style.setProperty('--border-width', '0%');

  const header = document.querySelector("header");

  // hero on-load animation
  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

  tl
    .to(".van-pos", {
      opacity: 1,
      duration: 1,
      delay: 0.8,
    }, 0)

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

    .from(".hero-quote", {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power2.out",
    }, 1.5)

    .from(".hero-cta", {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power2.out",
    }, 1.7);

  const headerOffset = header.offsetHeight - 1;

  // journey scroll (needs adjustments)
  const heroVanAnimation = gsap.timeline({
    scrollTrigger: {
      trigger: ".journey-section",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    }
  });

  heroVanAnimation
    .to(".hero-vann", {
      y: 900,
      x: 1100,
      scale: 0.85,
      duration: 0.6,
      ease: "power1.inOut"
    })
    .to(".hero-vann", {
      y: 3000,
      x: -2300,
      scale: 0.7,
      duration: 0.6,
      ease: "power1.inOut"
    })
    .to(".hero-vann", {
      y: 100,
      x: 0,
      scale: 0.9,
      duration: 0.8,
      ease: "power1.inOut"
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
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    const direction = index % 2 === 0 ? -100 : 100;

    tl.fromTo(card, 
      {
        x: `${direction}vw`,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 2,
        ease: "power2.out"
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

  ScrollTrigger.refresh();
});
