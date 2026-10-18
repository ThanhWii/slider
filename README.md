# Slider.js

A lightweight, dependency-free JavaScript slider/carousel for displaying a group of slides with navigation controls, pagination dots, optional looping, and autoplay.

**Slider.js is a personal learning and portfolio project.** It was developed after studying an educational video tutorial that implemented the slider with prototype-based JavaScript. I reimplemented the concepts using modern JavaScript (ES6 classes and private fields) and use the library in my own projects to practise reusable component design and DOM manipulation.

## Features

- Configure how many slides are visible at once.
- Navigate with previous and next controls.
- Show pagination dots and jump between pages.
- Optionally loop through slides using cloned slides.
- Configure transition speed.
- Enable autoplay with a configurable interval.
- Pause autoplay while the pointer is over the slider.
- Use built-in controls or provide existing previous/next buttons.
- Implement the slider without external JavaScript dependencies.

## Installation

### Use the CDN

Add the script after the slider markup, or load it with `defer`:

```html
<script src="https://cdn.jsdelivr.net/gh/thanhwii/slider@v1.0.0/slider.min.js" defer></script>
```

The CDN link above loads the JavaScript file only. Slider.js also relies on CSS for layout and presentation. Include a stylesheet that defines the generated classes (`slider-wrapper`, `slider-content`, `slider-track`, `slider-slide`, `slider-prev`, `slider-next`, `slider-nav`, and `slider-dot`). The repository's `styles.css` is used by the demo page; adapt or separate its slider styles when integrating the library into another project.

### Use the source file locally

```html
<script src="./slider.min.js" defer></script>
```

Adjust the path to match your project structure.

## Quick Start

### 1. Add a container with slides

Slider.js treats the container's direct children as slides. Each child can contain any suitable HTML content.

```html
<div class="product-slider" id="product-slider">
  <article>
    <h3>Product One</h3>
    <p>First slide content.</p>
  </article>
  <article>
    <h3>Product Two</h3>
    <p>Second slide content.</p>
  </article>
  <article>
    <h3>Product Three</h3>
    <p>Third slide content.</p>
  </article>
  <article>
    <h3>Product Four</h3>
    <p>Fourth slide content.</p>
  </article>
</div>
```

### 2. Initialize the slider

```html
<script>
  const slider = new Slider('#product-slider', {
    items: 2,
    loop: true,
    speed: 300,
    nav: true,
    controls: true,
  });
</script>
```

The selector passed to `Slider` identifies the container. Make sure the script runs after the container exists in the DOM, for example by using `defer` or placing the script after the markup.

## Options

Pass an optional configuration object as the second argument to `new Slider(selector, options)`.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `number` | `1` | Number of slides visible at once. |
| `loop` | `boolean` | `false` | Enables looping by adding cloned slides at the beginning and end of the track. |
| `speed` | `number` | `300` | CSS transition duration in milliseconds. |
| `nav` | `boolean` | `true` | Shows pagination dots when there are more slides than visible items. |
| `controls` | `boolean` | `true` | Shows previous and next controls when navigation is needed. |
| `controlsText` | `[string, string]` | `['<', '>']` | Text for the previous and next controls, respectively. |
| `prevBtn` | `string \| null` | `null` | CSS selector for an existing previous button. If omitted, Slider.js creates one. |
| `nextBtn` | `string \| null` | `null` | CSS selector for an existing next button. If omitted, Slider.js creates one. |
| `slideBy` | `number \| 'page'` | `1` | Number of slides to move per action. Use `'page'` to move by the configured `items` count. |
| `autoPlay` | `boolean` | `false` | Enables automatic slide movement. |
| `autoPlayTimeout` | `number` | `5000` | Time between autoplay movements, in milliseconds. |
| `autoPlayHoverPause` | `boolean` | `true` | Pauses autoplay while the pointer is over the slider container. Applies when autoplay is enabled. |

## Examples

### Show three slides at a time

```js
const slider = new Slider('#product-slider', {
  items: 3,
  slideBy: 'page',
});
```

### Enable looping and autoplay

```js
const slider = new Slider('#featured-slider', {
  items: 1,
  loop: true,
  autoPlay: true,
  autoPlayTimeout: 4000,
  autoPlayHoverPause: true,
});
```

### Use your own navigation buttons

```html
<button id="previous-slide" type="button" aria-label="Previous slide">Previous</button>
<button id="next-slide" type="button" aria-label="Next slide">Next</button>

<div id="custom-slider">
  <div>Slide One</div>
  <div>Slide Two</div>
  <div>Slide Three</div>
</div>
```

```js
const slider = new Slider('#custom-slider', {
  prevBtn: '#previous-slide',
  nextBtn: '#next-slide',
  controls: true,
});
```

When custom button selectors are supplied, Slider.js uses those elements instead of creating its own buttons. The current implementation does not remove their existing event handlers when the slider is discarded.

## Public API

### `slider.moveSlide(step)`

Moves the slider by the specified number of slides. Positive values move forward; negative values move backward.

```js
slider.moveSlide(1);  // Move forward by one slide
slider.moveSlide(-1); // Move backward by one slide
```

When `slideBy` is used to configure the built-in controls, it determines how many slides those controls move. Calling `moveSlide()` directly uses the `step` argument you pass.

## Styling

The JavaScript adds the following classes to the container and generated elements:

- `slider-wrapper`
- `slider-content`
- `slider-track`
- `slider-slide`
- `slider-prev`
- `slider-next`
- `slider-nav`
- `slider-dot`
- `active` (on the selected pagination dot)

Use these classes to style the slider layout and appearance. At a minimum, the track should be a flex container and each slide should not shrink, so the horizontal transform can position slides as intended. For example:

```css
.slider-content {
  position: relative;
  overflow: hidden;
}

.slider-track {
  display: flex;
  will-change: transform;
}

.slider-slide {
  flex-shrink: 0;
  box-sizing: border-box;
}

.slider-nav {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.slider-dot.active {
  /* Add your active-dot styling here. */
}
```

The complete appearance depends on your stylesheet. See `styles.css` in this repository for the demo's styling.

## Project Structure

```text
.
├── src/
│   └── slider.js
├── slider.min.js
├── styles.css
├── index.html
├── package.json
├── package-lock.json
└── .gitignore
```

## Learning Goals

This project provided practice with:

- ES6 classes and private fields/methods.
- DOM manipulation and event handling.
- Managing slider state and calculating slide positions.
- CSS transforms and transition events.
- Cloning slides to support looping behavior.
- Configurable component APIs and autoplay timers.

## Limitations

- Slider.js is intended for learning and use in personal projects; it has not been presented as a production-hardened or extensively tested carousel framework.
- The library expects each slide to be a direct child of the selected container when it is initialized.
- Responsive behavior is based on the configured `items` option; this version does not provide separate breakpoint-specific settings.
- The library does not include an explicit public `destroy()` method to restore the original markup and remove all created event listeners and timers.
- The CDN URL in this README points to the minified JavaScript file. Include and maintain the appropriate CSS separately.

## Acknowledgements

This project was developed as a learning exercise after studying a video tutorial that used prototype-based JavaScript. I rewrote the implementation using ES6 classes and private fields for learning and personal use.

**Original tutorial:** Add the title, instructor, and URL of the specific tutorial here to credit the learning source accurately.

## License

No license has been specified for this repository in this README. Before distributing the library or adding an open-source license, review the terms of the original tutorial and any applicable rights for the tutorial-derived implementation.
