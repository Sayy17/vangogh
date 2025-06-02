document.documentElement.style.setProperty('--border-width', '100%'); //this for line (works with ::after)
window.addEventListener("DOMContentLoaded", () => {
  // register ScrollTrigger plugin from GSAP
  gsap.registerPlugin(ScrollTrigger);

  const header = document.querySelector("header");

  // mobile menu toggle

  // togglesvisibility
  function toggleMobileNav() {
    document.getElementById("mobileMenu").classList.toggle("show");
  }

  // to expose function globally to use in inline HTML
  window.toggleMobileNav = toggleMobileNav;


  // initial page load animations
  // remember to practise this again for god's sake
 

  function runInitialAnimations() {
    // create a timeline with default easing
    const onLoadTl = gsap.timeline({ defaults: { ease: "power2.out" } });

    onLoadTl
      // animate header border width expansion

     .to(
        ".van-pos",
       {
        opacity: 1,
        duration: 1,
        delay: 0.8,
       },
       0
      )

      .to(
        "header",
        {
          "--border-width": "100%",
          duration: 3,
        },
        0
      )
      // slide in desktop nav links & sidebar icons from above
      .from(
        ".desktop-nav a, .social-sidebar a",
        {
          y: -100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        },
        0
      )
      // animate sidebar border height
      .to(
        ".social-sidebar",
        {
          "--border-height": "100%",
          duration: 10,
        },
        0
      )
      // fade in hero heading
      .to(
        ".hero-content h1",
        {
          opacity: 1,
          duration: 1,
        },
        0
      )
      // animate text stroke to solid color
      .to(
        ".hero-content h1",
        {
          delay: 0.5,
          duration: 2,
          color: "var(--sienna)",
          "-webkit-text-stroke": "0px var(--sienna)",
        },
        0
      )
      // slide in each line of the heading from the right
      .from(
        ".hero-content .line",
        {
          x: 100,
          delay: 1,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        },
        0
      )
      // reveal the vann wrapper
      .to(
        ".hero-vann-wrapper",
        {
          opacity: 1,
          scale: 0.8,
          delay: 1.5,
          duration: 1.3,
          ease: "power3.out",
        },
        0
      )

      //reveal the butterfly - FIXED: removed duplicate duration
      .to(
        ".quote-img",
        {
          opacity: 1,
          duration: 1.3,
          delay: 1.5,
          ease: "power3.out",
        },
        0
      )
  }


  function pinAndAnimate({
    trigger,
    endTrigger,
    pin,
    animations,
    markers = false,
    headerOffset = 0,
  }) {
    // define scroll end position with header offset
    const end = `top top+=${headerOffset}`;

    // create a GSAP timeline connected to ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: `top top+=${headerOffset}`,
        endTrigger,
        end,
        scrub: true,
        pin,
        pinSpacing: false,
        markers: markers, // for debugging
        invalidateOnRefresh: true, // ensures recalculation on resize
      },
    });

    // loop through each animation object
    animations.forEach(({ target, vars, position = 0 }) => {
      tl.to(target, vars, position);
    });
  }


  function setupScrollAnimations() {
    const headerOffset = header.offsetHeight - 1;

    // use matchMedia to handle responsive behaviors
    ScrollTrigger.matchMedia({
      // Desktop scroll animations
      "(min-width: 769px)": function () {
        // 1. vann animates on scroll from hero to intro
        pinAndAnimate({
          trigger: ".section-intro",
          endTrigger: ".section-intro",
          pin: ".hero-vann-wrapper",
          animations: [
            { target: ".hero-vann", vars: { rotate: 10, scale: 1 } },
          ],
          headerOffset,
        });

        // 2. vann shifts right during the intro section
        pinAndAnimate({
          trigger: ".section-intro",
          endTrigger: ".timeline-entry:nth-child(even)",
          pin: ".hero-vann-wrapper",
          animations: [
            { target: ".hero-vann", vars: { rotate: 10, scale: 0.7 } },
            { target: ".hero-vann-wrapper", vars: { x: "40%" } },
          ],
          markers: false,
          headerOffset,
        });

        // 3. vann shifts left during the first timeline entry
        pinAndAnimate({
          trigger: ".timeline-entry:nth-child(even)",
          endTrigger: ".timeline-entry:nth-child(odd)",
          pin: ".hero-vann-wrapper",
          animations: [
            { target: ".hero-vann", vars: { rotate: -10, scale: 0.7 } },
            { target: ".hero-vann-wrapper", vars: { x: "-30%" } },
          ],
          markers: false,
          headerOffset,
        });

        // 4. timeline entry 3 to 4
        pinAndAnimate({
          trigger: ".timeline-entry:nth-child(3)", 
          endTrigger: ".timeline-entry:nth-child(4)",
          pin: ".hero-vann-wrapper",
          animations: [
            { target: ".hero-vann", vars: { rotate: 10, scale: 0.7 } },
            { target: ".hero-vann-wrapper", vars: { x: "30%" } },
          ],
          markers: false,
          headerOffset,
        });

        // 5. timeline entry 4 to 5
        pinAndAnimate({
          trigger: ".timeline-entry:nth-child(4)",
          endTrigger: ".timeline-entry:nth-child(5)",
          pin: ".hero-vann-wrapper",
          animations: [
            { target: ".hero-vann", vars: { rotate: -10, scale: 0.7 } },
            { target: ".hero-vann-wrapper", vars: { x: "-30%" } },
          ],
          markers: false,
          headerOffset,
        });

        // 6. timeline entry 5 to 6 (FIXED)
        pinAndAnimate({
          trigger: ".timeline-entry:nth-child(5)",
          endTrigger: ".timeline-entry:nth-child(6)",
          pin: ".hero-vann-wrapper",
          animations: [
            { target: ".hero-vann", vars: { rotate: 10, scale: 0.7 } },
            { target: ".hero-vann-wrapper", vars: { x: "30%" } },
          ],
          markers: false,
          headerOffset,
        });

      },

      // mobile fallback animation (no scroll-based logic)
      "(max-width: 768px)": function () {
        gsap.to(".hero-vann-wrapper", {
          opacity: 1,
          duration: 1,
          delay: 0.5,
        });
      },
    });
  }

  // quote cards 
  gsap.utils.toArray('.quote-card').forEach((card, index) => {
    // create timeline for each card
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // determine direction based on index (alternate directions)
    const direction = index % 2 === 0 ? -100 : 100;
    
    // animation: slide in from one side, pause, then slide out to other side
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
    )
  });

  // title animation
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

  runInitialAnimations(); 
  setupScrollAnimations(); 

  ScrollTrigger.refresh();
});