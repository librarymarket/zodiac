# Zodiac

Zodiac is a dependency-free carousel written in TypeScript.

What makes Zodiac unique is that it handles responsive options with plain media
queries, backed by the `matchMedia()` function.
[Click here](#media-query-options-interface) for an overview of media query
options made available by Zodiac.

## Usage

### Installation

We recommend installing Zodiac via NPM in most cases:

``` shell
npm i @library-market/zodiac
```

Zodiac can also be manually downloaded from its releases page.

The `dist` directory contains transpiled JavaScript and CSS for Zodiac, in
addition to minified and ES module versions.

``` html
<html>
  <head>
    <!-- ... -->
    <link href="node_modules/@library-market/zodiac/dist/zodiac.css" rel="stylesheet">
  </head>
  <body>
    <div id="zodiac" class="zodiac">
      <!-- ... -->
    </div>

    <script src="node_modules/@library-market/zodiac/dist/zodiac.js"></script>
    <script>
      new Zodiac('#zodiac').mount();
    </script>
  </body>
</html>
```

### HTML

Zodiac uses `zodiac`, `zodiac-inner` and `zodiac-track` CSS classes for styling
and DOM manipulation. The below snippet demonstrates Zodiac's markup:

``` html
<div id="zodiac" class="zodiac">
  <div class="zodiac-inner">
    <div class="zodiac-track">
      <div>1.</div>
      <div>2.</div>
      <div>3.</div>
      <div>4.</div>
      <div>5.</div>
      <div>6.</div>
      <div>7.</div>
      <div>8.</div>
    </div>
  </div>
</div>
```

Options are available to modify these classes; [click here](#classes-interface)
for more information about these options.

#### Controls

One or more `<button>` elements with a `data-zodiac-direction` attribute can be
added anywhere within the initialized carousel for left or right navigation:

``` html
<div id="zodiac" class="zodiac">
  <div class="zodiac-inner">
    <button data-zodiac-direction="left" type="button">Left</button>
    <div class="zodiac-track">
      <div>1.</div>
      <div>2.</div>
      <div>3.</div>
      <div>4.</div>
      <div>5.</div>
      <div>6.</div>
      <div>7.</div>
      <div>8.</div>
    </div>
    <button data-zodiac-direction="right" type="button">Right</button>
  </div>
</div>
```

### JavaScript

To initialize Zodiac, create a new `Zodiac` class instance, specifying a
selector targeting a carousel element and any desired [options](#options):

``` javascript
// Example using default options:
window.addEventListener('load', () => {
  new Zodiac('#zodiac').mount();
});

// Example with custom options:
window.addEventListener('load', () => {
  new Zodiac('#zodiac-with-options', {
    autoplay: false,
    itemsPerView: 2,
    mediaQueryOptions: {
      "(min-width: 768px)": {
        itemsPerView: 3,
      },
      "(min-width: 992px)": {
        itemsPerView: 4,
      },
      "(min-width: 1200px)": {
        itemsPerView: 5,
      },
      "(min-width: 1400px)": {
        itemsPerView: 6,
      },
    },
  }).mount();
});
```

## Options

| Name              | Datatype                                                     | Default Value               | Description                                                                                                                            |
|-------------------|--------------------------------------------------------------|-----------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| autoplay          | boolean                                                      | `true`                      | Whether or not the slider should autoplay.                                                                                             |
| autoplaySpeed     | boolean                                                      | `5000`                      | The delay before the carousel will transition.                                                                                         |
| classes           | [ClassesInterface](#classes-interface)                       | See Classes Interface table | A collection of classes used by the slider to identify specific elements. These settings are not available in the media query options. |
| gap               | number                                                       | `8`                         | The gap between slides.                                                                                                                |
| itemsPerView      | number                                                       | `5`                         | The total number of items to display per view.                                                                                         |
| mediaQueryOptions | [MediaQueryOptionsInterface](#media-query-options-interface) | None by default             | A collection of options applied at a specific media query.                                                                             |
| pauseOnHover      | boolean                                                      | `true`                      | Whether or not autoplay should pause on hover.                                                                                         |
| transitionSpeed   | number                                                       | `500`                       | The speed at which slides will transition.                                                                                             |

### Classes Interface

The classes interface is an object that defines which classes Zodiac will use
to target specific carousel elements.

| Name     | Datatype | Default Value     | Description                                               |
|----------|----------|-------------------|-----------------------------------------------------------|
| controls | string   | `zodiac-controls` | The classes used by the slider controls.                  |
| inner    | string   | `zodiac-inner`    | The class used for the inner slider container.            |
| items    | string   | `zodiac-item`     | The class used by the slider items.                       |
| track    | string   | `zodiac-track`    | The class for the track slider div surrounding the items. |

### Media Query Options Interface

The media query options interface is an object that allows for a media query
to define a set of options. When using an option, Zodiac will locate the first
passing media query and use its options, falling back to the carousel's global
options.

``` javascript
new Zodiac('#zodiac', {
  // Display 2 items per view by default, ...
  itemsPerView: 2,
  mediaQueryOptions: {
    // But display 3 items per view if the screen width is >= 768px.
    "(min-width: 768px)": {
      itemsPerView: 3,
    },
  },
});
```

It's optimal to use a homogeneous set of media query conditions (i.e., only
`min-width` conditions). Mixing conditions may prevent Zodiac from evaluating
media query option sets.
