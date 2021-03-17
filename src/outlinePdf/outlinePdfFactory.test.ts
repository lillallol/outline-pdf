import * as fs from "fs";
import * as path from "path";
import * as pdfLib from "pdf-lib";
import { outlinePdfFactory, _errorMessages, IOutlinePdf } from "./outlinePdfFactory";

let outlinedPdfFileName: string;
let outlinePdf: IOutlinePdf;

beforeAll(() => {
    outlinedPdfFileName = "test.outline.pdf";
    try {
        fs.unlinkSync(path.resolve(__dirname, outlinedPdfFileName));
    } catch (e) {
        //file does not exist so no problem
    }
});

beforeEach(() => {
    outlinePdf = outlinePdfFactory(pdfLib);
});

jest.setTimeout(60 * 10e3);

describe(outlinePdfFactory.name, () => {
    it("throws error when someone gets the outline without having it set first", () => {
        expect(() => outlinePdf.outline).toThrow(_errorMessages.thereIsNoOutlineToGet);
    });
    it("return a rejected promise when someone tries to save a pdf without loading it first", async () => {
        await expect(outlinePdf.savePdf()).rejects.toThrow(_errorMessages.thereIsNoPdfToSave);
    });
    it("throws error when someone tries to add an outline to a pdf without providing the outline", () => {
        outlinePdf.outline = "whatever";
        outlinePdf.loadPdf(fs.readFileSync(path.resolve(__dirname, "test.pdf")));
        expect(() => outlinePdf.applyOutlineToPdf()).toThrow(_errorMessages.thereIsNoPdfToAddOutline);
    });
    it("adds the provided outline to the loaded pdf", async () => {
        await outlinePdf.loadPdf(await fs.promises.readFile(path.resolve(__dirname, "test.pdf")));
        outlinePdf.outline = `
        6||Acknowledgements
        -7||Introduction
         7|-|Who This Book is For
         7|-|What This Book is Not
         9|-|How to Read This Book
       -10||PART 1: RESUMES AND THE HIRING PROCESS
       -11|-|Chapter 1: Why Resumes and CVs are Important
        11|--|The Goal of a Resume
        13|--|Good Resumes, Great Resumes
        15|--|Why LinkedIn is Not Enough
        16|--|A Resume Is (Still) Not Enough
       -17|-|Chapter 2: The Hiring Pipeline
        17|--|People in the Recruitment Process
        20|--|The Typical Hiring Pipeline
        22|--|The Applicant Tracking System
        24|--|ATS Myths Busted
        27|--|Referrals
        31|--|The Priority of Your Resume
        34|--|Less Competitive Hiring Pipelines
        38|--|Job Aggregators
        39|--|Recap
       -40|-|Chapter 3: Resumes and COVID-19
        40|--|The COVID-19 Job Market
        41|--|The COVID-19 Hiring Pipeline: What Hiring Managers Say
        42|--|COVID-19 and New Grads/Interns
        42|--|Experienced Engineers and The Need For Resumes During COVID-19
       -43||PART 2: WRITING THE RESUME
       -44|-|Chapter 4: Tech Resume Basics
        44|--|The First Glance
        46|--|Ground Rules
        47|--|Simplicity and Consistency
        48|--|Avoiding Biases: Personal Details and Photos
        51|--|Recap: Actions to Improve Your Resume
       -52|-|Chapter 5: Resume Structure
        53|--|Structure for Interns, New Grads and Bootcamp Grads
        56|--|Structure with Work Experience
        58|--|Languages and Technologies
        61|--|Tell a Story
        63|--|The Summary Section
        65|--|Structure for Senior and Above People
        69|--|Recap: Actions to Improve Your Resume
       -70|-|Chapter 6: Standing Out
        71|--|Results, Impact and Your Contribution
        75|--|Don't Be Humble
        79|--|Write a Resume for That Job
        82|--|Different Companies, Different Focus
        86|--|Keyword Stuffing
        88|--|Recap: Actions to Improve Your Resume
       -89|-|Chapter 7: Common Mistakes
        89|--|Poor Format
        92|--|Forgetting About Your Audience
        93|--|Unnecessary Details
        97|--|Links
       101|--|Recap: Actions to Improve Your Resume
      -102|-|Chapter 8: Different Experience Levels, Different Career Paths
       102|--|Current college and university students
       103|--|Bootcamp grads
       107|--|Career Changers
       110|--|Career Breaks
       112|--|Senior and Above Engineers
       113|--|Tech Leads
       114|--|Engineering Managers
      -116|-|Chapter 9: Exercises to Polish Your Resume
       116|--|Write Two Different Resumes
       116|--|Find Out the Impact of Your Past Projects
       117|--|Do a Grammar Check, Not Just a Spellcheck
       117|--|Ask for Friends or Family to Proofread
       118|--|Get Feedback on the Internet
       119|--|Keyword Check for That Position
       120|--|Recap: Actions to Improve Your Resume
      -121|-|Chapter 10: Beyond the Resume
       121|--|LinkedIn Profile
       126|--|GitHub
       129|--|Technical Blogs
       129|--|StackOverflow, Twitter, Instagram, Quora and Other Social Sites
       130|--|Cover Letters
       134|--|Recap: Actions to Improve Your Application Beyond the Resume
      -135||PART 3: EXAMPLES AND INSPIRATION
      -136|-|Chapter 11: Good Resume Template Principles
       138|--|Good Resume Template Layout and Principles
       139|--|The Top-Down Layout
       141|--|Two-Column Layouts
       144|--|How Recruiters and Hiring Managers Scan Resumes
       149|--|The Results of Using a Good Resume Template
       152|--|Recap: Good Resume Template Principles
      -153|-|Chapter 12: Resume Templates
       153|--|Resume Generators vs Resume Templates
       157|--|Standard Resume: By Developers, for Developers
       159|--|Template Reviews
       159|--|Recommended Resume Templates
       167|--|Other Resume Templates
      -176|-|Chapter 13: Resume Improvement Examples
       177|--|Software Engineer with 2 Years Experience
       183|--|Machine Learning Engineer with 5 Years Experience
       190|--|Backend Developer with 6 Years Experience
       195|--|Remote Software Engineer With 8 Years Experience
       202|--|SRE Engineer with 20 Years Experience
       208|--|Other Real Resume Examples
      -209|-|Chapter 14: Advice for Hiring Managers on Running a Good Screening Process
       209|--|Know that your screening process is broken
       211|--|Treat recruitment as a partner function
       212|--|Write a good job description
       213|--|Have a feedback loop
       214|--|Learn how others do it
       215||Further Reading
       217||Conclusion
        `;
        outlinePdf.applyOutlineToPdf();
        await fs.promises.writeFile(path.resolve(__dirname, outlinedPdfFileName), await outlinePdf.savePdf());
        //@TODO this test just checks whether the function produces a new pdf
        //it does not check whether the created pdf has the expected outline
        //to improve this test I should read the outline from a pdf
        await expect(fs.promises.access(path.resolve(__dirname, outlinedPdfFileName))).resolves.toBeUndefined();
    });
});
