---
title: Initial Project Idea
tags: [ideation]
---

<!--truncate-->

## Problem Definition and Context

I currently work as a lead engineer at a public-sector software engineering consultancy. In my work, I champion open 
technologies, secure by design development and agile methodologies. In many cases, I must approach these subjects with 
care due to the often risk-averse environment of the public sector and the perceived or actual risks associated with 
adopting new approaches and processes.

For any government organisation to launch a service on a "GOV.UK" subdomain, the service must first undergo a security 
audit. An audit is generally procured towards the end of the beta phase of development and therefore introduces a 
lengthy feedback loop for security issues.

Integrating security reporting into an application's continuous integration and deployment pipeline reduces the time 
between feedback points for the team. The decreased feedback loop allows developers to resolve vulnerabilities as they
occur rather than at the end of a project when there is a push to go live with the service.

The problem comes when configuring and setting up the security scanning process in each project. Setting up the 
reporting takes some time, and developers must convince stakeholders of the benefits of these reports. While managed 
services that perform these audits are available, it can take more work to convince stakeholders of the need for this 
expenditure due to the complex procurement procedures in the public sector.

## The end product I will deliver

As an output of this project, I shall create a command line tool that performs both dynamic and static analysis of web 
applications using open-source tools and presents combined and consistent reports, including executive summaries and 
task lists for resolution. The software will offer integrations with several widely used continuous deployment and 
integration pipeline platforms such as GitHub Actions, CircleCI and GitLab CI.

## The stakeholders

* Delivery Managers and Product owners
* Developers
* Cyber-security Teams

## The users

Software Developers who will configure the software, and as the project aims to reduce the time taken to accomplish 
this, they are users.

Delivery managers will use the security reports produced by the end product to prioritise work for the team.

## I have/will be able to find out more by talking with

A key area of decision is the choice of programming languages to support as part of the static analysis feature. I shall 
review common languages present in open-source web services on GOV.UK to understand this decision.

I shall seek to understand the processes used by delivery managers to prioritise the resolution of security issues by 
conducting user research within my current company. I shall use the output of this research to better shape the reports 
that my solution outputs.

To better understand what developers commonly struggle with when configuring security scanning software and interpreting 
the scan results, I will conduct user research with the developers I work with as they represent varied skill levels and 
understanding.

## Relevant skills from my level three study

My project will generally depend upon the research, evaluation and reflection skills developed during my level three 
study.

As the end product focuses on web application security, the project will leverage skills gained during my study of 
TM352. Specifically, web services and architecture and web security issues.

The planning and development of the end product, including its architecture, will be supported by knowledge gained in 
TM354. Particularly the exposure to planning, modelling and testing of a software project.

## Areas beyond level three study

My project will investigate and evaluate cloud technologies applied to containerisation and continuous integration 
platforms. I will also assess various dynamic and static analysis tools designed to test the security of web 
applications.

To plan the execution of my project, I will expand my knowledge of UML to model the software system and evaluate and 
apply agile methodologies. I shall examine and use testing techniques beyond those explored in the TM354 module.

## Legal and ethical ramifications

There are implicit ethical issues with any software designed to identify security vulnerabilities in applications, as 
they can gain unauthorised access to a system. I can implement mitigations that only allow scanning application services
or code hosted locally. However, a sufficiently motivated actor will be capable of circumventing these controls.

As the project will involve combining open-source software libraries and applications, any work produced must comply 
with the various conditions of use accompanying each. Reusing open-source applications generally requires attribution
and including details of licenses associated with such software. Further research is needed case-by-case to ensure 
compliance with copyright and distribution rights.
