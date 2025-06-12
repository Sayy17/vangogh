document.documentElement.style.setProperty('--border-width', '100%');  //this for line (works m3a ::after)
window.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const header = document.querySelector("header");

  function runInitialAnimations() {
    const onLoadTl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // remember to practise this again for god's sake
    onLoadTl
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
      .to(
        ".social-sidebar",
        {
          "--border-height": "100%",
          duration: 10,
        },
        0
      )
      .to(
        ".hero-content h1",
        {
          opacity: 1,
          duration: 1,
        },
        0
      )
      .to(
        ".hero-content h1",
        {
          delay: 0.5,
          duration: 2,
          color: "#EAB003",
          "-webkit-text-stroke": "0px #EAB003",
        },
        0
      )
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
      );
  }

  function pinAndAnimate({
    trigger,
    endTrigger,
    pin,
    animations,
    markers = false,
    headerOffset = 0,
  }) {
    const end = `top top+=${headerOffset}`;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: `top top+=${headerOffset}`,
        endTrigger,
        end,
        scrub: true,
        pin,
        pinSpacing: false,
        markers: markers,
        invalidateOnRefresh: true,
      },
    });

    animations.forEach(({ target, vars, position = 0 }) => {
      tl.to(target, vars, position);
    });
  }

  function setupScrollAnimations() {
    const headerOffset = header.offsetHeight - 1;

    ScrollTrigger.matchMedia({
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
          endTrigger: ".journey-period:nth-child(2)",
          pin: ".hero-vann-wrapper",
          animations: [
            { target: ".hero-vann", vars: { rotate: 10, scale: 0.7 } },
            { target: ".hero-vann-wrapper", vars: { x: "40%" } },
          ],
          headerOffset,
        });

        // 3. vann shifts left during journey periods
        pinAndAnimate({
          trigger: ".journey-period:nth-child(2)",
          endTrigger: ".journey-period:nth-child(3)",
          pin: ".hero-vann-wrapper",
          animations: [
            { target: ".hero-vann", vars: { rotate: -10, scale: 0.7 } },
            { target: ".hero-vann-wrapper", vars: { x: "-30%" } },
          ],
          headerOffset,
        });

        // 4. journey period animations
        pinAndAnimate({
          trigger: ".journey-period:nth-child(3)",
          endTrigger: ".journey-period:nth-child(4)",
          pin: ".hero-vann-wrapper",
          animations: [
            { target: ".hero-vann", vars: { rotate: 10, scale: 0.7 } },
            { target: ".hero-vann-wrapper", vars: { x: "30%" } },
          ],
          headerOffset,
        });

        pinAndAnimate({
          trigger: ".journey-period:nth-child(4)",
          endTrigger: ".journey-period:nth-child(5)",
          pin: ".hero-vann-wrapper",
          animations: [
            { target: ".hero-vann", vars: { rotate: -10, scale: 0.7 } },
            { target: ".hero-vann-wrapper", vars: { x: "-30%" } },
          ],
          headerOffset,
        });

        pinAndAnimate({
          trigger: ".journey-period:nth-child(5)",
          endTrigger: ".journey-period:nth-child(6)",
          pin: ".hero-vann-wrapper",
          animations: [
            { target: ".hero-vann", vars: { rotate: 10, scale: 0.7 } },
            { target: ".hero-vann-wrapper", vars: { x: "30%" } },
          ],
          headerOffset,
        });
      },

      "(max-width: 768px)": function () {
        gsap.to(".hero-vann-wrapper", {
          opacity: 1,
          duration: 1,
          delay: 0.5,
        });
      },
    });
  }

  // quote cards animation
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

  // quotes title animation
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
