## Stakeholders

Stakeholders are those that may not directly interact with the system, but are concerned or effected by its development.
In my initial project idea I documented a small number of [stakeholders][internal:project-idea:stakeholders] with little
detail on their connection to the project. Here I will expand on this list and introduce some non-functional
requirements the stakeholders may expect.

### Product Owners & Product Stakeholders

Here I am effectively referring to those non-technical team members who are responsible for the application being
developed. These users will generally expect the following:

* That the system reliably detect vulnerabilities in the software.
* That the system is able to provide reports over time on the effectiveness of mitigations.

### Cyber-security Teams

* That vulnerabilities are detected before they are introduced to the production version of the application.
* That vulnerabilities are prioritised based on their impact and urgency.
* That vulnerability reports include a relevant [Common Vulnerabilities and Exposures (CVE)][web:cve] reference.


Developers will need the system to support scanning the running web application.

There are a number of initial decisions to make with regard to my project. The following questions will shape both the
technical implementation and overall design of my final product.

* Which programming languages should my system support?
* What types of security scanning should my system support?
  I am aware of the following categories of tools.
    * Dynamic application security testing (DAST) tools.
    * Static application security testing (SAST) tools.
    * Interactive application security testing (IAST) tools.
* How might I ensure my system is compatible with the following platforms?
    * MacOS - both [x86][wiki:x86] and [arm][wiki:arm] (for M1 Mac)
    * Windows - [x86][wiki:x86] and [arm][wiki:arm] (although I do not have access to arm based hardware)
    * Linux - both [x86][wiki:x86] and [arm][wiki:arm]
* What formats should the resulting reports be produced in?

I can use a number of techniques to better understand the needs of my [identified users][internal:project-idea:users]
and [stakeholders][internal:project-idea:stakeholders]. I shall explore these and their effectiveness within this post.

### Qualitative vs. Quantitative Research


### Survey Questionnaires

In order to collect opinions from prospective users I can conduct research questionnaires with them.

### Technical Survey


### Options


### Licensing, Legal and Ethical

Concerned with how the software in use is licensed and what legal restrictions exist.

* All users will need confidence that the system and it's components are distributed legally.
* All users will need confidence that their use case for the system does not break the law or software licensing.
