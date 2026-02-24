# AutoDeploy EC2

**Zero-touch Docker deployment for modern web applications on AWS EC2**

AutoDeploy EC2 is a smart CLI tool that automatically detects your project type, generates an optimized Dockerfile, builds the container, and exposes your application publicly using Nginx — all with a single command.

This project demonstrates real-world **Cloud + DevOps automation** using AWS EC2, Docker, and Node.js.

---

# Features

## Intelligent Framework Detection

AutoDeploy automatically detects and handles:

* Node.js APIs
* Next.js applications
* React / Vite applications
* Angular applications

No manual Docker setup required.

---

## Automatic Dockerization

* Dynamic Dockerfile generation
* Framework-specific build strategies
* Multi-stage builds for frontend apps
* Production-ready container setup

---

## Built-in Reverse Proxy

* Automatic Nginx installation
* Reverse proxy configuration
* Public exposure on port 80
* Production-style routing

---

## Smart Environment Validation

Before deployment, AutoDeploy verifies:

* Docker availability
* Port conflicts
* Project compatibility
* Runtime safety

---

# How It Works

```
User Project
     ↓
Framework Detection
     ↓
Dynamic Dockerfile Generation
     ↓
Docker Build & Run
     ↓
Nginx Reverse Proxy
     ↓
🌍 Live Application on EC2
```

---

# Installation (Local Development)

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/autodeploy-ec2.git
cd autodeploy-ec2
npm install
```

---

# EC2 Deployment Guide (Step-by-Step)

This section is important for cloud setup.

---

## Step 1 — Launch EC2 Instance

Recommended configuration:

* OS: Ubuntu 22.04 LTS
* Instance type: t2.micro (free tier)
* Storage: 20 GB
* Security Group:
  * Allow **SSH (22)**
  * Allow **HTTP (80)**
  * Allow **Custom TCP (3000–5000)** (optional but helpful)

---

## Step 2 — Connect to EC2

From your Mac/Linux terminal:

```bash
ssh -i your-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
```

---

## Step 3 — Install Required Dependencies on EC2

### Update system

```bash
sudo apt update && sudo apt upgrade -y
```

---

### Install Node.js (recommended LTS)

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Verify:

```bash
node -v
npm -v
```

---

### Install Docker

```bash
sudo apt-get install -y docker.io
```

Start and enable Docker:

```bash
sudo systemctl start docker
sudo systemctl enable docker
```

Allow current user to run Docker:

```bash
sudo usermod -aG docker $USER
newgrp docker
```

Verify:

```bash
docker --version
```

---

## Step 4 — Clone AutoDeploy on EC2

```bash
git clone https://github.com/YOUR_USERNAME/autodeploy-ec2.git
cd autodeploy-ec2
npm install
```

(Optional global link for easier usage)

```bash
npm link
```

---

# Environment Variables (.env Configuration)

AutoDeploy itself does not require environment variables, but  **your application might** .

---

## When Your App Needs .env

If your project uses environment variables:

### Example `.env`

```env
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret
```

---

## Important Rules

1. Place `.env` in your  **application root** , not inside autodeploy
2. Ensure your app reads env variables using `process.env`
3. Do NOT commit `.env` to GitHub
4. Ensure your app works locally before deploying

---

## Docker and .env

If your app depends heavily on environment variables, ensure:

* Your app reads `process.env.PORT`
* Your start script works without manual input

Example in Node app:

```js
const PORT = process.env.PORT || 5000;
app.listen(PORT);
```

---

# Deploying Your Application on EC2

Inside **your application folder** (not autodeploy folder):

```bash
npx autodeploy
```

or if linked:

```bash
autodeploy
```

or via script:

```bash
npm run deploy
```

---

## What Happens Automatically

AutoDeploy will:

1. Detect framework
2. Generate Dockerfile
3. Build Docker image
4. Run container
5. Configure Nginx
6. Expose your app publicly

---

## Access Your Application

Open in browser:

```
http://YOUR_EC2_PUBLIC_IP
```

---

# Project Structure

```
autodeploy-ec2/
├── cli/
│   └── deploy.js
├── detectors/
│   ├── frameworkDetector.js
│   └── portDetector.js
├── docker/
│   └── dockerfileGenerator.js
├── executor/
│   ├── dockerRunner.js
│   └── nginxSetup.js
├── utils/
│   ├── logger.js
│   └── systemChecks.js
├── package.json
└── README.md
```

---

# Supported Frameworks

| Framework   | Status    |
| ----------- | --------- |
| Node.js API | Supported |
| Next.js     | Supported |
| React       | Supported |
| Vite        | Supported |
| Angular     | Supported |

---

# Recommended Test Order

When validating on EC2:

1. Node API
2. React/Vite app
3. Next.js app
4. Angular app

---

# Troubleshooting

## Docker permission denied

Run:

```bash
sudo usermod -aG docker $USER
newgrp docker
```

---

## Port 80 not accessible

Check:

* EC2 security group allows HTTP (80)
* Nginx is running:

```bash
sudo systemctl status nginx
```

---

## Container not starting

Check logs:

```bash
docker ps -a
docker logs <container_id>
```

---

## App works locally but not on EC2

Verify:

* App listens on `0.0.0.0`
* Correct port is exposed
* `.env` is present if required

---

# License

MIT

---

# Why This Project Is Strong

* Demonstrates real DevOps automation
* Shows containerization expertise
* Implements reverse proxy in cloud
* Supports multiple modern frameworks
* Production-oriented design

If you found this useful, consider giving the repository a star.
