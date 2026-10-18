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

    constructor(selector, options = {}) {
        this.#container = document.querySelector(selector);
        if (!this.#container) {
            console.error(`Slider: Container "${selector}" not found.`);
            return;
        }
        this.#opt = {
            ...options
        }
        this.#slides = Array.from(this.#container.children);
        this.#currentIndex = 0;
        this.#init();
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
        this.#slides.forEach(slide => {
            slide.classList.add('slider-slide');
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

    // API
    moveSlide(step) {
        this.#currentIndex = Math.min(Math.max(this.#currentIndex + step, 0), this.#slides.length - 3);
        this.#offset = -(this.#currentIndex * (100 / 3));
        this.#track.style.transform = `translateX(${this.#offset}%)`;
    }
}