# AWS Payment App

A $20 checkout page using Stripe (test mode), hosted on AWS EC2.

## Architecture
Browser → Nginx → Node.js app → Stripe

## What I set up
- EC2 server (Ubuntu) with Nginx as a reverse proxy
- Node.js app managed by systemd (auto-start and auto-restart)
- Stripe keys stored in a private env file, not in the code
- Custom teal theme using Stripe's Appearance API
- Version control with Git, hosted on GitHub

## Problem I solved
The site returned 502 Bad Gateway. The logs showed the app crashing
because of an empty Stripe key in the env file. I removed the bad
line, fixed the file permissions (chmod 600), and restarted the service.

## Next steps
- HTTPS with a domain
- Auto-deploy with GitHub Actions
- Docker
