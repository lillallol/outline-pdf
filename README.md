## Table of contents

-   [Description](#Description)
-   [Installation](#Installation)
-   [Example](#Example)
-	[Dependencies](#Dependencies)
-   [Motivation](#Motivation)
-   [You might find interesting](#You-might-find-interesting)
-   [Acknowledgments](#Acknowledgments)
-   [License](#License)

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
    await outlinePdf({
        loadPath: "absolute/or/relative/path/to/pdf/to/outline.pdf",
        savePath: "absolute/or/relative/path/to/save/outlined.pdf",
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
## Dependencies

The only direct dependency is [pdf-lib](https://www.npmjs.com/package/pdf-lib), a low level pdf library for both browser and nodejs. 

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

## License

MIT License

Copyright (c) 2020 lillallol

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.