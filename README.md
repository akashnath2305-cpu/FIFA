# FIFA World Cup 2026: GenAI Operations & Fan Experience Portal

A comprehensive, all-in-one digital platform engineered to elevate the experience for fans while providing powerful, real-time logistical control for event organizers and staff. Built with cutting-edge web technologies and Generative AI, this portal serves as a centralized hub for navigating, managing, and enjoying the world's largest sporting event.

---

## 🎯 Chosen Vertical
**Operations & Fan Experience (Stadium Management)**
Our solution directly targets the complex logistical challenges of managing a massive global event like the FIFA World Cup 2026. By bridging the gap between stadium operations and fan engagement, we ensure seamless navigation, crowd safety, operational intelligence, and multilingual accessibility—all powered by Generative AI.

---

## 🧠 Approach and Logic
Our approach is built on the philosophy of **"Unified Intelligence"**. Instead of building separate apps for fans and staff, we created a single, role-based ecosystem where data flows bidirectionally:
1. **Fan Data fuels Operations:** Fans interact with the "Vibe Map," Smart Transit, and Eco Scanner. This generates live data (crowd density, transit occupancy, sentiment).
2. **Operations guide Fans:** The command center (Nexus) monitors this data to dispatch staff, redirect transit routes, and broadcast smart alerts.
3. **Generative AI as the Bridge:** To prevent staff from being overwhelmed by questions and protocols, we implemented a GenAI Copilot that instantly processes operational manuals to assist both fans (wayfinding, translation) and staff (emergency protocols, dispatching).

We prioritized a **"Vibe Coding"** aesthetic—using dynamic glassmorphism, micro-animations, and 3D elements (React Three Fiber) to create a premium, engaging UI that matches the energy of the World Cup.

---

## ⚙️ How the Solution Works

### 🤖 Generative AI Integration (The AI Copilot)
At the core of the platform is the **Operations AI Copilot**, powered by the **Google Gemini API** (`gemini-1.5-flash`). 
- **Context-Aware:** The AI is injected with a system prompt detailing stadium blueprints, emergency triage protocols, and VIP wayfinding.
- **Real-Time Assistance:** Staff and fans can chat with the Copilot to get instant, highly accurate operational instructions (e.g., "A fan needs medical attention in section 104, what do I do?"). 

### 🏟️ For Fans
*   **Interactive Vibe Map:** Explore stadium zones, view live crowd density metrics, and engage in real-time "Watch Party" chat rooms.
*   **Smart Transit & AI Routing:** Live tracking of buses and VIP convoys, complete with an AI-powered transit advisor to calculate optimal departure times and gate routes.
*   **Eco Scanner:** A sustainability initiative allowing fans to scan QR codes on recyclable items to earn "Green Points" and climb the leaderboard.
*   **Global Accessibility:** A robust, dynamic translation engine with ARIA-compliant screen-reader support tailored for diverse, multilingual users.

### 🛡️ For Organizers & Staff
*   **The Nexus Dashboard (Command Center):** A secure, high-level overview of stadium metrics, live weather updates, capacity tracking, and operational analytics.
*   **Smart Alerts & Broadcasting:** A centralized communication system enabling organizers to instantly broadcast targeted notifications (e.g., Critical, Warning, Info) based on live AI analysis.
*   **Mission Log & Dispatch Center:** A robust task management system where organizers can create multi-step directives and dispatch them to field staff.

---

## 🧐 Assumptions Made
1. **API Keys are Available:** The platform assumes the presence of a valid `GEMINI_API_KEY` for the AI Copilot. A fallback mechanism is implemented to return mock protocols if the key is missing during a local demo.
2. **Connectivity:** We assume fans and staff have access to a reliable 4G/5G or stadium Wi-Fi network to stream live data and interact with the AI Copilot.
3. **Hardware Capabilities:** The 3D elements (Fan Cards) and complex animations assume users are on modern smartphones or desktops with basic WebGL support.
4. **Data Privacy:** We assume fans opt-in to anonymous location tracking to populate the live "Vibe Map" density metrics. 

---

## 🛠️ Technical Stack
*   **Framework:** Next.js 16 (App Router) & React 19
*   **Styling & UI:** Vanilla CSS, Tailwind CSS, Framer Motion, React Three Fiber
*   **AI Integration:** `@google/generative-ai` (Gemini 1.5 Flash)
*   **Database & ORM:** PostgreSQL (Neon) & Prisma ORM
*   **Security:** Zod validation, Bcrypt hashing, Strict Content Security Policies (CSP), and Edge Middleware Route Protection.
*   **Testing:** Jest & React Testing Library (Achieved 100% pass rate in CI/CD pipeline).

---

## 🚀 Getting Started

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
3. **Database & Environment Setup:**
   Create a `.env` file and add your `DATABASE_URL` and `GEMINI_API_KEY`.
   ```bash
   npx prisma generate
   npx prisma db push
   ```
4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
5. **Access the Application:** Open [http://localhost:3000](http://localhost:3000)

## 🧪 Testing
The application is configured with a robust testing suite evaluated via GitHub Actions CI/CD.
```bash
npm run test
```
