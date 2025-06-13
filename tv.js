class VintageTV {
  constructor() {
    this.paintings = document.querySelectorAll('.painting-display');
    this.currentIndex = 0;
    this.isTransitioning = false;
    this.autoChangeInterval = null;
    
    this.init();
    this.startAutoChange();
  }

  init() {
    // set up click handlers
    document.getElementById('channelKnob').addEventListener('click', () => this.nextPainting());
    document.getElementById('volumeKnob').addEventListener('click', () => this.previousPainting());
                    
    // initialize first painting info
    this.updatePaintingInfo();
    
    // animate in the painting info
    gsap.to('#paintingInfo', {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.5,
      ease: "power2.out"
    });
  }

  nextPainting() {
    if (this.isTransitioning) return;
    
    this.stopAutoChange();
    const nextIndex = (this.currentIndex + 1) % this.paintings.length;
    this.changePainting(nextIndex);
    this.startAutoChange();
  }

  previousPainting() {
    if (this.isTransitioning) return;
    
    this.stopAutoChange();
    const prevIndex = this.currentIndex === 0 ? this.paintings.length - 1 : this.currentIndex - 1;
    this.changePainting(prevIndex);
    this.startAutoChange();
  }

  changePainting(newIndex) {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    const currentPainting = this.paintings[this.currentIndex];
    const newPainting = this.paintings[newIndex];

    const tl = gsap.timeline({
      onComplete: () => {
        this.currentIndex = newIndex;
        this.isTransitioning = false;
      }
    });

    // TV static effect
    tl.to('.static-overlay', {
      opacity: 1,
      duration: 0.1
    })
    .to(currentPainting, {
      opacity: 0,
      scale: 0.9,
      duration: 0.3,
      ease: "power2.in"
    }, 0.1)
    .set(currentPainting, { className: 'painting-display' })
    .set(newPainting, { 
      className: 'painting-display active',
      opacity: 0,
      scale: 1.1
    })
    .to(newPainting, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: "power2.out"
    })
    .to('.static-overlay', {
      opacity: 0,
      duration: 0.2
    }, '-=0.2');

    tl.to('#paintingInfo', {
      opacity: 0,
      y: 20,
      duration: 0.2,
      ease: "power2.in"
    }, 0.1)
    .call(() => {
      this.currentIndex = newIndex;
      this.updatePaintingInfo();
    }, [], 0.3)
    .to('#paintingInfo', {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out"
    }, 0.5);
  }

  updatePaintingInfo() {
    const currentPainting = this.paintings[this.currentIndex];
    const title = currentPainting.dataset.title || 'Unknown Title';
    const year = currentPainting.dataset.year || 'Unknown Year';
    const description = currentPainting.dataset.description || 'No description available';
    
    document.getElementById('paintingTitle').textContent = title;
    document.getElementById('paintingYear').textContent = year;
    document.getElementById('paintingDescription').textContent = description;
  }

  startAutoChange() {
    this.autoChangeInterval = setInterval(() => {
      this.nextPainting();
    }, 5000);
  }

  stopAutoChange() {
    if (this.autoChangeInterval) {
      clearInterval(this.autoChangeInterval);
      this.autoChangeInterval = null;
    }
  }
}

// initialize the vintage TV when page loads
document.addEventListener('DOMContentLoaded', () => {
  new VintageTV();
  
  gsap.fromTo('.tv-container', {
    scale: 0.8,
    opacity: 0,
    y: 50
  }, {
    scale: 1,
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "back.out(1.7)",
    delay: 0.3
  });
});
