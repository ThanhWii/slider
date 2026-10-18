class Slider {
    // Slider private properties
    #container;
    #track;
    #slides;
    #prevBtn;
    #nextBtn;
    #currentIndex;
    #offset;
    #opt;
    #isAnimating;

    constructor(selector, options = {}) {
        this.#container = document.querySelector(selector);
        if (!this.#container) {
            console.error(`Slider: Container "${selector}" not found.`);
            return;
        }
        this.#opt = {
            items: 1,
            loop: false,
            ...options
        }
        this.#slides = Array.from(this.#container.children);
        this.#currentIndex = this.#opt.loop ? this.#opt.items : 0;
        this.#init();
        this.#updatePosition();
    }

    // Private methods
    #init() {
        this.#container.classList.add('slider-wrapper');
        this.#createTrack();
        this.#createNavigation();
    }

    #createTrack() {
        this.#track = document.createElement('div');
        this.#track.className = 'slider-track';
        const cloneHead = this.#slides.slice(-this.#opt.items).map(node => node.cloneNode(true));
        const cloneTail = this.#slides.slice(0, this.#opt.items).map(node => node.cloneNode(true));
        this.#slides = [...cloneHead, ...this.#slides, ...cloneTail];
        this.#slides.forEach(slide => {
            slide.classList.add('slider-slide');
            slide.style.flexBasis = `calc(100% / ${this.#opt.items})`;
            this.#track.appendChild(slide);
        });
        this.#container.appendChild(this.#track);
    }

    #createNavigation() {
        this.#prevBtn = document.createElement('button');
        this.#nextBtn = document.createElement('button');
        this.#prevBtn.textContent = '<';
        this.#nextBtn.textContent = '>';
        this.#prevBtn.className = 'slider-prev';
        this.#nextBtn.className = 'slider-next';
        this.#container.append(this.#prevBtn, this.#nextBtn);
        this.#prevBtn.onclick = () => this.moveSlide(-1);
        this.#nextBtn.onclick = () => this.moveSlide(1);
    }

    #updatePosition(instant = false) {
        this.#track.style.transition = instant ? 'none' : `transform ease 0.3s`;
        this.#offset = -(this.#currentIndex * (100 / this.#opt.items));
        this.#track.style.transform = `translateX(${this.#offset}%)`;
    }

    // API
    moveSlide(step) {
        if (this.#isAnimating) return;
        this.#isAnimating = true;
        if (this.#opt.loop) {
            this.#currentIndex = (this.#currentIndex + step + this.#slides.length) % this.#slides.length;
            this.#track.ontransitionend = () => {
                const maxIndex = this.#slides.length - this.#opt.items;
                if (this.#currentIndex <= 0) {
                    this.#currentIndex = maxIndex - this.#opt.items;
                }
                else if (this.#currentIndex >= maxIndex) {
                    this.#currentIndex = this.#opt.items;
                }
                this.#updatePosition(true);
                this.#isAnimating = false;
            }
        }
        else {
            this.#currentIndex = Math.min(Math.max(this.#currentIndex + step, 0), this.#slides.length - this.#opt.items);
        }
        this.#updatePosition();
    }
}