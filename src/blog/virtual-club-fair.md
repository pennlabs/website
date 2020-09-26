---
title: 'Creating a Virtual Club Fair: Redesigning & Repurposing Penn Clubs'
slug: virtual-club-fair
authors: ['snie']
publishedAt: 2020-09-25
coverPhoto: ../images/blog/clubs-screenshot.png
---

# Creating a Virtual Club Fair: Redesigning & Repurposing Penn Clubs

- **Team:** Eric W. (team lead, developer), Davis H. (developer), Daniel T. (developer), Campbell P. (developer), Lucy X. (developer), Jong Min C. (developer), Lanting C. (developer), Ying X. (developer), Peyton W. (platform), Armaan T. (Penn Labs director, platform), Misty L. (business developer).

- **My role:** Product management, UI Design, Frontend development.

- **Tools used:** Sketch, HTML/CSS, Typescript.

## The Problem

One year ago, I joined Penn Labs, student group on campus at the University of Pennsylvania that works on a handful of products that aims at improving student life for students. From a course review tool to a central mobile application, Penn Labs is an amazing group of designers, engineers, and business developers (all undergraduates!) committed to helping students. [Last year, Penn Labs launched pennclubs.com](https://www.thedp.com/article/2020/08/penn-clubs-virtual-event-activities-fair), an online directory meant to help students peruse the hundreds of clubs our university offers in a more user-friendly way than their legacy system (which was, essentially, just a list of clubs) had. At the end of the 2019–2020 school year, we secured a partnership with Penn’s official Office of Student Affairs to move the official registry of student organizations onto our platform.

The wake of COVID-19 has created lots of opportunity in the realm of online connectivity: over the summer, I have seen many peers of mine pursue products that aim at filling the gap left by face-to-face experiences. One problem in particular that sparked conversation that arose in mid-July was the annual club fair. Once an exciting event that could best be categorized as exciting chaos, the fair used to take place on Locust Walk, the central, half-mile walking street that could be thought of as the _Autobahn_ or the _Route 50_ of Penn. Attended by over 500 clubs and thousands of undergraduate students, it has always been an energetic, loud, and exciting day, full of new Quakers trying to find their homes—only to be completely stripped away from the Penn experience this fall.

On August 11, [the University of Pennsylvania revoked their previous hybrid model in favor of a fully-online one](https://www.thedp.com/article/2020/08/penn-fall-2020-move-online-remote), changing much of what makes the red-and-blue experience would be like, especially for first-year students who haven’t met their people yet, who haven’t found their communities. We were approached with the opportunity to make sure that they could.

## Goals

- Provide a platform through which new students can browse university organizations.

- Find a way to replicate the on-campus fair process online for a synchronous experience, through a video chatting platform.

- Design an asynchronous way for students in different timezones to still interact with clubs in a relatively informal and centralized location.

## The Stakeholders & Users

We understood the landscape of the stakeholders we would be dealing with, given our relations with the official offices of the university, including OSA, which is responsible for student life on campus, and the Student Activities Council (SAC), which typically manages the club fair, and handles over \$1 million in funding for club each school year.

We identified three key types of users:

- **New students**, typically freshmen or transfer students, as well as some sophomores who want to find new clubs to join. They may know varying amounts of information on certain clubs, and will want to browse clubs in the same manner that they would if we had a live fair, on campus. There are about 2.7k new students on a given year to Penn. It is important to note that 20% of Penn students are international, and live in a wide variety of timezones.

- **Club officers**, who want to market their organizations to prospective members. They want to provide details about their organization, hold information sessions, and find new members to recruit. There are approximately 600 clubs on campus, each with between 1–3 officers on average.

- **University officials,** including representatives from OSA and SAC (who are actually also undergraduate students). They want to be able to manage which clubs can participate in the fair, and ensure clubs are abiding by university branding guidelines. We worked with three of these officials on a daily basis.

![](https://cdn-images-1.medium.com/max/3022/1*OtZ-hbb9sYHJTkObxWoE8w.png)

These different types of users would need to have different permissions to view the sections of pennclubs.com, as well as different action items that we would need to lay out.

## Existing Tools

![Penn Clubs, circa August 2019.](https://cdn-images-1.medium.com/max/2880/1*CaJmNJ9gmgJY9uj1kX5_Kg.png)_Penn Clubs, circa August 2019._

Penn Clubs, launched in the Fall of 2019, already had some pretty awesome features. There was a great filtering and search system, a recommendations algorithm that took a student’s school (Arts & Sciences, Nursing, Wharton, or Engineering) and major into account in showing relevant clubs, and the ability to subscribe to a club’s email listserv for updates. Most of these features were in place to reach goal #1 pretty seamlessly.

The biggest tool we wanted to take advantage of was the school wide access to **premium Zoom accounts** (Eric had actually created a plan to build a video conferencing platform from scratch, but given our tight deadline and the existing access to the system, we figured it’d be wise to just use Zoom). Key features about Zoom include the ability to create [breakout rooms](https://support.zoom.us/hc/en-us/articles/206476093-Enabling-breakout-rooms) for one-on-one or small group interactions, as well as the ability to use a chat feature for students who may feel too shy to come off mute and ask questions.

Further research revealed that we could also leverage the existing **[Zoom API](https://marketplace.zoom.us/docs/api-reference/zoom-api)** to make scheduling meetings for the synchronous part of the fair easier for club officers. With settings hidden behind educational accounts, three different dates, and timezone confusion, we wanted to streamline the Zoom meeting creation process by automating this process.

## The Asynchronous Problem

As previously noted, there are hundreds of Penn Students that live in timezones that are completely incompatible with American timezones. We wanted to ensure that aside from the scheduled Zoom meetings, there would be opportunity for students to interact with club owners in a less formal setting than sending an email with questions.

Clubs already had the ability to input a handful of information, including a description, basic contact information, a section on “how to get involved”, and select pertinent tags.

We toyed with the idea of having a chat box for each club, where users could interact with club officers — but also knew that this would depend on club officers being on the platform to answer live chats. Instead, we opted for a **Q&A feature**, taking some inspiration from Reddit’s AMA structure, where users can ask questions (anonymously or not) to club officers, to be answered for all users to benefit from.

![Clubs can provide a variety of information, including a description, contact info, a section of how to get involved, and can also answer questions!](https://cdn-images-1.medium.com/max/4004/1*0k3_UPEaApQ-Unou0ijniQ.png)_Clubs can provide a variety of information, including a description, contact info, a section of how to get involved, and can also answer questions!_

## Executing the Project

We assembled a team of Penn Labs designers, developers, and business developers who had a couple free weeks of their summers to transform Penn Clubs from a simple database into a fully-fledged product ready to handle events, a club fair, and administrative capabilities.

Three weeks, dozens of [Clubhouse](https://clubhouse.io/) cards, [hundreds of git commits](https://github.com/pennlabs/penn-clubs/), and thousands of emails later, we launched the new-and-improved version of Penn Clubs that included dozens of new features, large and small, including:

- the ability to browse clubs through four different **orderings** (alphabetical, random, bookmarked, featured — which rewards clubs for inputting more information for prospective students),

- a more mature **event creation process**, that included Zoom integration and the ability to upload a cover photo,

- **a live events page**, fetching and featuring all current events created by clubs, searchable, and filterable by club tags,

- **automatic event creation** using the Zoom API,

- **a Q&A section** featured on each club’s homepage,

- two **user guides** for the fair (a version for students, and a version for club officers),

- an **analytics** page for club officers to view pertinent statistics such as page views, bookmarks, subscriptions, and the breakdown of viewers on their pages,

- and **administrative** **tools** for University officials, including approving clubs for the fair, report generation, and more.

![Screenshot of Penn Clubs’s live event page](https://cdn-images-1.medium.com/max/2848/1*50-zae33skLcpvi2sbhQkA.png)_Screenshot of Penn Clubs’s live event page_

## The Impact

Aside from a slight hiccup on our first day when our servers overloaded due to a much higher attendance rate than we anticipated, the club fair ran extremely smoothly. Here are some standout statistics during the September 1–3 period:

- 642 registered clubs,

- 128,367 page views,

- 5,284 users in 84 countries,

and we are still, at the time of writing this in mid-September, averaging approximately 1,000 users per day. Pretty crazy stuff!

## The Future

We have several goals we, as a team, are working towards to keep improving Penn Clubs as a platform — we recognize that this platform can continue to be a hub of information for students, well past the period of the club fair. We are continuing to partner with several other offices in the administration, and are excited to welcome a couple more designers, developers, and business developers later this week to continue to mature our product!

Check out the other amazing work that Penn Labs is doing at [pennlabs.org](https://pennlabs.org/)!
