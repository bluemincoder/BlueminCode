# BlueminCode

## Overview

**BlueminCode** is a next-gen online coding platform designed to provide an immersive and customizable development environment. Built using **Next.js 15**, **TypeScript**, **Convex**, **Clerk**, and **Razorpay**, it offers a seamless experience with a powerful multi-language IDE, smart output handling, flexible theming, and community-driven features. Whether you're learning, collaborating, or showcasing code, BlueminCode is your go-to tool for a modern, feature-rich coding workflow.

---

## Problem/Why?

Online code editors often lack customizability, smart execution handling, and community features. BlueminCode solves these problems by combining the best of real-time execution, community engagement, and user experience—delivering a powerful tool for both hobbyists and professionals.

---

## Background

As the demand for collaborative, cloud-based development environments grows, BlueminCode emerges to empower developers with tools that go beyond basic code execution. It introduces theme personalization, detailed execution history, and real-time interaction—all in a unified platform designed with performance and accessibility in mind.

---

## Core Features

### **Editor Experience:**

- **Online IDE:** Real-time, browser-based IDE supporting 10+ programming languages.
- **Monaco Editor Integration:** VSCode-like editing experience with IntelliSense.
- **Theme Switcher:** Choose from 5 modern VSCode-inspired themes.
- **Font Customization:** Adjust font sizes for optimal readability.

### **Smart Execution:**

- **Output Status:** Clear distinction between success, error, and runtime issues.
- **Execution History:** Track and revisit your past code executions.

### **User Profile:**

- **Personal Dashboard:** View detailed usage stats and code history.
- **Authentication:** Seamless and secure login/signup using **Clerk**.

### **Community & Sharing:**

- **Code Sharing:** Share code snippets with the BlueminCode community.
- **Search & Filter:** Advanced tools to find and discover relevant code posts.

### **Premium Experience:**

- **Free & Pro Plans:** Choose your ideal plan with Razorpay integration.
- **Webhook Support:** For custom integrations and analytics.

---

## Screenshots

### Landing Page

![Landing Page](/public/Landing.png)
The landing page introduces users to BlueminCode with an overview of key features and benefits.

### Code Editor

![Code Editor](/public/Editor.png)
The powerful Monaco-based editor supports multiple languages with syntax highlighting and intelligent suggestions.

### Comments Section

![Comments](/public/Comments.png)
Engage with the community through the interactive comments section for shared code snippets.

### Pro Features

![Pro Features](/public/Pro.png)
Premium features available to Pro subscribers for an enhanced coding experience.

### Pricing Options

![Pricing](/public/Price.png)
Transparent pricing tiers with feature comparison to help users choose the right plan.

### Profile

![Profile](/public/Profile.png)
Manage your personal information, view coding activity, and track your progress.

---

## Technologies Used

- **Frontend:**

    - Next.js 15 & TypeScript
    - Tailwind CSS & Aceternity UI
    - Monaco Editor for IDE experience

- **Backend:**

    - Convex for real-time data handling and storage
    - Razorpay for secure payments and subscription management

- **Authentication:**
    - Clerk for user management and access control

---

## Setup Instructions

### Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
NEXT_PUBLIC_RAZORPAY_KEY_ID=
```

---

### Running the Application

1. Install dependencies:

    ```bash
    npm install
    ```

2. Start the development server:

    ```bash
    npm run dev
    ```

3. Open your browser and go to:
    ```
    http://localhost:3000
    ```

---

## Future Enhancements

- Live collaboration in the code editor
- AI-assisted code suggestions and debugging
- User leaderboard and gamification
- Public and private code repositories
- Export code in multiple formats

BlueminCode empowers developers to code, collaborate, and grow in a flexible, modern environment tailored to their needs.
