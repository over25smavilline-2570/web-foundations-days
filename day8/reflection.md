# Reflection: Web Foundations Course

## The most difficult concept and how I overcame it

The most difficult concept for me was preventing double-booking when many people request the same seat at the same time. I first assumed that checking "is this seat free?" in application code was enough, but two concurrent requests can both pass that check before either one saves. I overcame this by studying transactions, isolation levels and row-level locking, and by tracing two competing requests step by step through a conditional `UPDATE`. I also used Redis (`SETNX`) only as a fast pre-check that can reject duplicate attempts, but I made the database the final authority, using a conditional update and a `UNIQUE (event_id, seat_id)` constraint, because it stays correct even if the cache fails.

## What I would improve in my capstone

Based on the feedback I received, I would improve how my design handles failure. I focused mostly on the happy path: browsing, selecting and buying. To make it more production-ready, I would add handling for payment provider outages, such as retries and circuit breakers, and a reconciliation job and a dead-letter queue for orders where payment and ticket creation get out of sync.

## What I will learn next

Next I will turn these designs into running software. I will build the REST API with Node.js and Express, set up a PostgreSQL database with indexes and constraints, add Redis for caching, and learn Docker to deploy it. My first step is building the first three QuickNotes routes with in-memory data.