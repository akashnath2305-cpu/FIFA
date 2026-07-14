# FIFA World Cup Management Portal

A comprehensive, all-in-one digital platform engineered to elevate the experience for fans while providing powerful, real-time logistical control for event organizers and staff. Built with cutting-edge web technologies, this portal serves as a centralized hub for navigating, managing, and enjoying the world's largest sporting event.

## 🌟 Overview

This application bridges the gap between stadium operations and fan engagement. By utilizing dynamic role-based access, the platform seamlessly transforms based on who is logging in—providing an immersive, gamified experience for fans, and a secure, data-driven command center for staff and organizers.

## ✨ Key Features

### 🏟️ For Fans
*   **Interactive Vibe Map:** Explore stadium zones, view live crowd density metrics, and engage in real-time "Watch Party" chat rooms.
*   **Smart Transit & AI Routing:** Live tracking of buses and VIP convoys, complete with an AI-powered transit advisor to calculate optimal departure times and gate routes.
*   **Dynamic Match Tickets:** Digital "Living Tickets" featuring live-updating gate assignments, QR codes, and integrated weather/match alerts to streamline entry.
*   **Engagement Fan Cards:** A gamified experience center featuring 3D interactive trivia, live polls, and point-based rewards to keep fans engaged before, during, and after the match.
*   **Eco Scanner:** A sustainability initiative allowing fans to scan QR codes on recyclable items to earn "Green Points" and climb the community leaderboard.
*   **AI Copilot:** A 24/7 intelligent digital assistant ready to answer fan queries, from finding the nearest restrooms to checking merchandise stock.

### 🛡️ For Organizers & Staff
*   **The Nexus Dashboard (Command Center):** A secure, high-level overview of stadium metrics, live weather updates, capacity tracking, and operational analytics.
*   **Smart Alerts & Broadcasting:** A centralized communication system enabling organizers to instantly broadcast targeted notifications (e.g., Critical, Warning, Info) to specific roles (Fans, Staff, or Everyone).
*   **Mission Log & Dispatch Center:** A robust task management system where organizers can create multi-step directives and dispatch them to field staff. Staff can then update progress in real-time.
*   **Edge Middleware Security:** Enterprise-grade security powered by Next.js Edge Middleware, strictly protecting administrative routes from unauthorized access and enforcing API rate limits.

## 🛠️ Technical Stack

*   **Framework:** Next.js 16 (App Router) & React 19
*   **Styling & UI:** Vanilla CSS, Framer Motion (Micro-animations), React Three Fiber (3D Elements)
*   **Database & ORM:** PostgreSQL & Prisma ORM
*   **Security:** Zod schema validation, Bcrypt password hashing, Strict Content Security Policies (CSP), and Edge Middleware Route Protection.
*   **Performance:** Leveraging React Compiler for automatic memoization and optimal rendering efficiency.

## 🚀 Getting Started

### Prerequisites
Ensure you have Node.js (v20+) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/akashnath2305-cpu/FIFA.git
   cd FIFA
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Database Setup:**
   Configure your environment variables and initialize the database.
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```

5. **Access the Application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Testing

The application is configured with a robust testing suite to ensure high reliability.
```bash
npm run test
```
