## Table of contents

-   [Description](#description)
-   [Installation](#installation)
-   [Examples](#examples)
    -   [Node](#node)
    -   [Browser](#browser)
-   [Dependencies](#dependencies)
-   [Motivation](#motivation)
-   [You might find interesting](#you-might-find-interesting)
-   [Acknowledgments](#acknowledgments)
-   [Future plans](#future-plans)
-   [FAQs](#faqs)
-   [License](#license)

## Description

This module can add outline to pdf that do not have one. As of right now, it is the only module in the npm registry that has the following characteristics :

-   Only javascript dependencies. No code from other programming languages is used.
-   Enables collapsing and nesting in the outline.
-   Fast download from the npm registry.
-   High level API.
-   Works in both the browser and node.

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

An example of loading a pdf file from the browser via an input tag of type file. After the outline has been applied, the pdf gets downloaded.

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

You will have to manually inject [pdf-lib](https://www.npmjs.com/package/pdf-lib), and [fs](https://nodejs.org/api/fs.html) (only when used in node), like its is done in the [examples](#examples).

So you will need to install [pdf-lib](https://www.npmjs.com/package/pdf-lib):

```bash
npm install pdf-lib;
```

## Motivation

I searched in the npm registry for a module that had some of the functionalities described [here](#description), because I had to use it in one of my projects <!-- ([documentation-to-pdf](@TODO)) -->.I could not find one, so I decided to create my own.

## You might find interesting

Here are some other modules that deal with outlining pdf :

-   [pdf-lib](https://www.npmjs.com/package/pdf-lib)
    -   low level pdf library for both browser and node
-   [hummus-toc](https://www.npmjs.com/package/@ocelot-consulting/hummus-toc)
    -   uses [hummus](https://www.npmjs.com/package/hummus) which is deprecated
    -   only javascript dependencies
    -   takes a lot of time to download
-   [pdfjs](https://www.npmjs.com/package/pdfjs)
    -   look at the tests folder for an outline example
    -   only javascript dependencies
    -   downloads fast

## Acknowledgments

The following comments : [1](https://github.com/Hopding/pdf-lib/issues/127#issuecomment-502450179) , [2](https://github.com/Hopding/pdf-lib/issues/127#issuecomment-641710694) , contributed tremendously in the creation of this module.

## Future plans

Add functionality that enables someone to :

-   read the outline of a pdf
-   delete the outline of a pdf

After that I will update [merge-pdf](https://www.npmjs.com/package/@lillallol/merge-pdf), so that it preserves outlines.

## FAQs

<details>
<summary>Why does the consumer have to inject <code>pdf-lib</code> to use this module.</summary>

No <code>pdf-lib</code> code is hard coded in this module. When someone wants to use this module and also use <code>pdf-lib</code>, to create a new module, there will be no <code>pdf-lib</code> code repeated in the generated bundle (remember that this module can be used in both node and browser).
</details>

<details>
<summary>Why does the consumer have to inject <code>fs</code>, if they want to use this module in node?</summary>

Like this the code of this module is compatible with every environment that supports ecmascript.
</details>

## License

[MIT](https://github.com/lillallol/outline-pdf/blob/master/LICENSE)
