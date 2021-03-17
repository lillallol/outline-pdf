## 3.0.4

### Bug fixes

-   Esm entry point was importing module `@lillallol/outline-pdf-data-structure` without `.js` extension.
-   Fixed bug that was introduced from version 2.0.0 and was caused by creating more pdf refs than the number of outline nodes, which made the outlined pdf file get corrupted if it was edited with a pdf annotator.

### Other

-   Added `CHANGELOG.md`.
