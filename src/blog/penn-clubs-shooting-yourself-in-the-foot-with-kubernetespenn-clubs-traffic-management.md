---
title: 'Penn Clubs: Shooting Yourself in the Foot with Kubernetes'
slug: penn-clubs-shooting-yourself-in-the-foot-with-kubernetes
authors: ['esinx']
publishedAt: 2025-09-18
customExcerpt: 'The Fall 2025 War Room reminded us why we watch so closely: scaling isn't about "more" — it's about scaling "everything" together.'
coverPhoto: ../images/blog/penn-clubs-shooting-yourself-in-the-foot-cover.png
---

# Penn Clubs: Shooting Yourself in the Foot with Kubernetes

Every semester, hundreds of Penn students apply to dozens of Wharton Council clubs through Penn Clubs, a product of Penn Labs. It might look like a simple web app — a few forms, a few clicks — but behind the scenes, Penn Clubs must withstand one of the most intense and predictable traffic surges on campus.

Here’s how we prepare for it, what went wrong this fall, and the lessons we took away to make the platform even stronger.

## The Problem: Midnight Traffic Surges

For Wharton Council–affiliated organizations, the application process has a unique constraint:
- There are 68 clubs on the Wharton Council, and
- All must set their application deadline for the same time — midnight.

This creates a perfect storm:
- Roughly 1,300 students submit applications in the one-hour window before midnight
- That means about 10,000 application response objects are written to the database in that single hour

It’s our most intense load of the semester — and if anything fails, students lose their shot at joining clubs. With the anticipation of peak load, we take the preparations necessary to ensure the platform is ready for the surge.

## Our Solution: Preparing for the Surge

Over the years, we’ve made several improvements to ensure Penn Clubs stays fast and reliable during the crunch:

**Backend Query Optimization**

We profiled and optimized our Django queries, adding missing indexes, eliminating redundant writes, and restructuring slow filters to make application submissions lightning-fast.

**Aggressive Read Caching**

Many students refresh the site repeatedly to confirm their submissions. We cache common reads aggressively to prevent the database from getting overwhelmed, while still keeping data fresh.

**Preemptive Horizontal Scaling on EKS**

Before the deadline, we scale up our EC2 instances running on EKS (Elastic Kubernetes Service) — using non-spot instances to avoid sudden preemption — so we can handle thousands of concurrent requests with headroom to spare.

This has allowed us to handle years of midnight surges with zero downtime. But in Fall 2025, we made a critical (false positive) mistake.

## The War Room

The Penn Labs War Room is a tradition every semester. The team gathers — usually in a GSR — dashboards up, snacks in hand, ready to make sure Penn Clubs survives its biggest night.

This semester, that watch party turned into a real firefight.

**9:00 PM — War Room Goes Live**
As usual, the Clubs & Platform team spins up monitoring dashboards and keeps an eye on alerts. This hour is usually calm — but not tonight.

**10:00 PM — Something Feels Off**
> “We have 800 database connections already — why?”
This was completely abnormal for 10 PM. CPU, memory, and disk I/O were perfectly healthy — no blocking queries, no I/O saturation — just a wall of open database connections.

**10:20 PM — First Attempts**
We debate scaling up the RDS instance, but that would require a restart, and the midnight deadline is too close. Setting up an RDS Proxy isn’t viable either — it would take too long. We hold steady, but keep digging.

**10:50 PM — The Plot Twist**
Someone scrolls back through historical metrics.
> “Wait — this started at 5:30 PM, exactly when we scaled up our deployments.”
The room goes quiet. This wasn’t user load. **This was us**.

**11:00 PM — The Puzzle Snaps Together**
Julian, Clubs lead, joins and adds the missing piece:
> “We also increased the number of worker threads this semester.”
The realization hits:

> tripled deployments × more workers per deployment = triple the database connections.

We hadn’t been attacked — **we’d accidentally DDoS’d our own database**.

**11:05 PM — The Fix**
We scale down our deployments. Instantly, the database connection graph drops like a rock. The War Room erupts in cheers. The database is healthy, the platform is stable, and we go into the busiest hour of the semester with confidence.

By 12:00 AM, the deadline passes without a single outage. Another successful application season — and a hard-earned lesson for the team.

We survived the application season with the smallest RDS instance in history, with just 8GB of RAM.

## Key Takeaway: Scaling is Holistic

This experience taught us that:

> Scaling horizontally isn’t just about adding more servers — you must scale your database alongside them, or you risk creating the bottleneck yourself.

Connection pooling, database capacity, and worker counts all need to be considered together. Otherwise, you can overwhelm your own infrastructure before the first user request even hits.

## The Future: Message Queues for Even More Reliability

For a long time, I've had some thoughts about the next chapter of Penn Clubs: adding message queues(like Amazon SQS, Kafka, or RabbitMQ) to the Club application pipeline to improve reliability and reduce EC2 costs.

Instead of writing directly to the database during peak load, we could:
- Enqueue submissions and immediately acknowledge them to users
- Process them asynchronously, smoothing out traffic spikes
- Scale background workers independently of the web layer
- Allow delayed database writes to spread out over time

This will improve reliability, reduce EC2 costs, and give us better observability into throughput and retries. We're hoping this will help us avoid a similar situation in the future.

## Final Thoughts

Penn Clubs isn’t just a website — it’s a platform that has to perform perfectly during one of the most stressful hours of the semester. The Fall 2025 War Room reminded us why we watch so closely: scaling isn’t about “more” — it’s about scaling "everything" together.

With continued improvements — smarter connection pooling, better autoscaling, and message queues — we’ll keep making Penn Clubs a platform students can count on, even at 11:59 PM on deadline night.

As a final remark, I want to thank the Clubs & Platform team for their hard work and dedication to making Penn Clubs a success. I'm proud to be a part of this team and I'm looking forward to seeing what we can accomplish together in the future!