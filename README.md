## Table of contents

-   [Description](#Description)
-   [Installation](#Installation)
-   [Example](#Example)
-   [Motivation](#Motivation)
-   [You might find interesting](#You-might-find-interesting)
-   [Acknowledgments](#Acknowledgments)

## Description

This module can add outline to an outline-less pdf.

-   only javascript dependencies
-   option for collapsing the outline
-   outline can be nested
-   fast download from npm
-   high level API

## Installation

```bash
npm install @lillallol/outline-pdf
```

## Example

```js
const { outlinePdf } = require("@lillallol/outline-pdf");

(async () => {
    outlinePdf({
        loadPath: "./path/to/pdf/to/outline.pdf",
        savePath: "./path/to/save/outlined.pdf",
        // first column  : page number
        //                 negative for collapsing outline
        // second column : outline depth
        // third column  : outline title
        outline: `
              1||some title
             12|-|some title
            -30|--|some title
             34|---|some title
             35|---|some title
             60|--|some title
             67|-|some title
             80||some title
        `,
    });
})();
```

## Motivation

I searched in the npm registry for a module that has the functionality described [here](#Description), because I had to use it in one of my projects <!-- ([documentation-to-pdf](@TODO)) -->, and I could not find one, so I decided to create my own.

## You might find interesting

Here are some other modules that deal with creating pdf outline and you might find them interesting :

-   [hummus-toc](https://www.npmjs.com/package/@ocelot-consulting/hummus-toc)
    -   uses [hummus](https://www.npmjs.com/package/hummus)
        -   takes a lot of time to download
        -   deprecated
    -   only javascript dependencies
-   [pdfjs](https://www.npmjs.com/package/pdfjs)
    -   look at the tests folder for an outline example
    -   only javascript dependencies
    -   downloads fast

## Acknowledgments

The following comments : [1](https://github.com/Hopding/pdf-lib/issues/127#issuecomment-502450179) , [2](https://github.com/Hopding/pdf-lib/issues/127#issuecomment-641710694) , contributed tremendously in the creation of this module.
