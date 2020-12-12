## Table of contents

-   [Description](#Description)
-   [Installation](#Installation)
-   [Examples](#Examples)
    -   [Node](#Node)
    -   [Browser](#Browser)
-   [Dependencies](#Dependencies)
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
-   works in browser
-   works in node

## Installation

```bash
npm install @lillallol/outline-pdf
```

## Examples

### Node

```ts
import * as fs from "fs";
import * as pdfLib from "pdf-lib";
import { outlinePdfCjsFactory } from "@lillallol/outline-pdf";

const outlinePdfCjs = outlinePdfCjsFactory(fs, pdfLib);

(async () => {
    await outlinePdfCjs({
        loadPath: "path/to/pdf/to/outline.pdf",
        savePath: "path/to/save/outlined.pdf",
        // first column  : page number
        //                 negative for collapsing outline
        // second column : outline depth
        // third column  : outline title
        outline: `
             1||Title 1
             2|-|Title 2
            -3|--|Title 3
             4|---|Title 4
             5|---|Title 5
             6|-|Title 6
             7||Title 7
        `,
    });
})();
```

### Browser

An example of loading a pdf file from the browser. The pdf is loaded via an input tag of type file. After the outline has been applied, the pdf gets downloaded.

```ts
import { outlinePdfFactory } from "path/to/node_modules/@lillallol/outline-pdf/dist/index.esm.js";
import * as pdfLib from "path/to/node_modules/pdf-lib/dist/pdf-lib.esm.js";

const outlinePdf = outlinePdfFactory(pdfLib);

document.body.innerHTML = `
    <input type="file" accept=".pdf"/>
`;

const input = document.querySelector("input");

input.addEventListener("change", () => {
    const reader = new FileReader();
    reader.onload = async function () {
        await outlinePdf.loadPdf(reader.result);
        // first column  : page number
        //                 negative for collapsing outline
        // second column : outline depth
        // third column  : outline title
        outlinePdf.outline = `
             1||Some random title 1
             2|-|Some random title 2
            -3|--|Some random title 3
             4|---|Some random title 4
             5|---|Some random title 5
             6|-|Some random title 6
             7||Some random title 7
        `;
        outlinePdf.applyOutlineToPdf();
        const pdf = await outlinePdf.savePdf();
        download(pdf, "myPdf.pdf");
    };
    // readAsText throws error and I do not know the reason
    reader.readAsArrayBuffer(input.files[0]);
});

// Got it from here : https://stackoverflow.com/a/30832210/5380904
function download(data, filename, type) {
    var file = new Blob([data], { type: type });
    var a = document.createElement("a"),
        url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}
```

## Dependencies

For this package to give proper intellisense it uses types from [pdf-lib](https://www.npmjs.com/package/pdf-lib) and [@types/nodes](https://www.npmjs.com/package/@types/node). 

You will have to manually inject [pdf-lib](https://www.npmjs.com/package/pdf-lib), and [fs](https://nodejs.org/api/fs.html) (only when used in node), in the exported factories of the package, like its is done in the [examples](#Examples).

So you will need to install [pdf-lib](https://www.npmjs.com/package/pdf-lib):

```bash
npm install pdf-lib;
```

## Motivation

I searched in the npm registry for a module that has the functionality described [here](#Description), because I had to use it in one of my projects <!-- ([documentation-to-pdf](@TODO)) -->, and I could not find one, so I decided to create my own.

## You might find interesting

Here are some other modules that deal with creating pdf outline and you might find them interesting :

-   [pdf-lib](https://www.npmjs.com/package/pdf-lib)
    -   low level pdf library for both browser and nodejs that has to be injected into my package exported factories.
    - consider taking a look at it since high level api functionality for outline might have been added 
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

[MIT](https://github.com/lillallol/outline-pdf/blob/master/LICENSE)
