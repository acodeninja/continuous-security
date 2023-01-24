---
title: Setup Documentation
tags: [work-completed]
---

Technical and non-technical users will need documentation to reference when integrating the software system into their deliveries. To make this documentation widely available and easy to maintain, hosting and software must be chosen to manage it.

<!--truncate-->

## Establish initial requirements

* documentation must be accessible as a website
* documentation must be easy to maintain
* documentation must be able to render UML diagrams

## Research approaches

For this decision, I will choose a documentation platform I have previous experience using.

### Previously used software

* [Middleman](https://middlemanapp.com/) via the GOV.UK [technical documentation project](https://github.com/alphagov/tech-docs-template)
* [docusaurus](https://docusaurus.io/)
* [jekyll](https://jekyllrb.com/) via [GitHub Pages](https://pages.github.com/)

All are static website generators and do not need to run on a service that supports a background server process.

### Previously used hosting

* [GitHub Pages](https://pages.github.com/)
* [AWS S3 Website](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)

## Evaluation

### System Requirements

| System                                 | Web Based | Easy Maintenance | Render UML                                                                                                                                                        |
|----------------------------------------|-----------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Middleman](https://middlemanapp.com/) | ✔️        | ✔️ (Via git)     | ❗ (Manual, see [Planning Data Tech Docs](https://github.com/digital-land/technical-documentation/blob/46962e3befcbf718464711712193232e5db63aa5/config.rb#L5-L22)) |
| [docusaurus](https://docusaurus.io/)   | ✔️        | ✔️ (Via git)     | ✔️ (Via [plugin](https://github.com/nice-move/remark-kroki))                                                                                                      |
| [jekyll](https://jekyllrb.com/)        | ✔️        | ✔️ (Via git)     | ✔️ (Via [plugin](https://github.com/yegor256/jekyll-plantuml))                                                                                                    |

### Hosting Requirements

| Host                                                                                        | Cost                         | Deployment                                      |
|---------------------------------------------------------------------------------------------|------------------------------|-------------------------------------------------|
| [GitHub Pages](https://pages.github.com/)                                                   | ✔️ Free                      | Via GitHub actions or manually via command line |
| [AWS S3 Website](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html) | ✔️ Free within AWS free-tier | Via GitHub actions or manually via command line |

## Decision

I have chosen to use [docusaurus](https://docusaurus.io/) as it supports all the features I need and offers UML rendering via the [kroki](https://kroki.io/) service. I will use GitHub pages as it tightly integrates with the code management tools I will be using to test and package changes to my software system.

## Acceptance Criteria

- [x] The documentation site must be accessible via a web address.
- [x] The documentation site must have a landing page with a brief description of the project and links to content.
- [x] The documentation site must have a section for content relevant to developers.
- [x] The documentation site must have a section for content relevant to decision-makers (delivery managers, product owners, etc).
- [x] The documentation site must have a section for content relevant to the Open University academic project.
- [x] The documentation site must render [PlantUML](https://plantuml.com/) diagrams included in the content of pages.

## Estimation of effort

Based on previously setting up [docusaurus](https://docusaurus.io/) I estimate this activity to have a low effort and should therefore take a few hours at most.

## Execution

Confirmed acceptance criteria can be met with the chosen solution.

* Created a new repository to store the documentation at https://github.com/continuous-security-reports/documentation
* Added the required content sections
* Added some placeholder images and copy to highlight the main features of the system
* Added the [Diagram Plugin](https://github.com/nice-move/remark-kroki) and a demo diagram to test functionality.

Deployed the website using [GitHub Pages](https://pages.github.com/) to [this address](https://continuous-security-reports.github.io/documentation/).

All acceptance criteria met.

### Relevant Commits

* https://github.com/continuous-security-reports/documentation/commit/b1124d4b14ff7f5868fea16eee4ea5273d12566b
* https://github.com/continuous-security-reports/documentation/commit/4b466df269e9461e2b347ec642922cc2508cabd8

## Reflection

### Asses solution

The solution was relatively easy to deploy, and changes to the documentation can be associated with code changes in GitHub. Setting up the UML rendering was straight-forwards. Adding new pages to the documentation site consists of creating a new markdown / mdx file and adding to the docs folder.

### Reflect on process

I found the process simple and completed the work within the estimated timescale.
I may refine the checklist for cards as I go to ensure I am capturing all parts of the decision process.
