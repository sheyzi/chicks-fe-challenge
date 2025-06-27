# Chicks Gold Front-End Challenge

## Overview

This project is a front-end mock application built for the Chicks Gold Software Engineering Challenge. The goal is to recreate the provided design using sveltekit.

## Features

- **Framework:** SvelteKit with TypeScript
- **Styling:** Pure CSS (no frameworks as asked)
- **Responsive:** It adapts to mobile, tablet, and desktop screens
- **Mock Data:** Uses [JSON Server](https://github.com/typicode/json-server) to simulate API responses

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [PNPM](https://pnpm.io/) (Should be installed globally `npm install -g pnpm`)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/sheyzi/chicks-fe-challenge.git
   cd chicks-fe-challenge
   ```

2. **Install dependencies:**
   ```sh
   pnpm install
   ```

3. **Start the mock API:**
   ```sh
   pnpm run server
   ```
    This will start JSON Server on port 8000. You can change the port in `package.json` if needed.

4. **Set up the environment:**
   Create a `.env` file in the root directory and add the following line:
   ```env
   PUBLIC_API_BASE_URL=http://localhost:8000
   ```

   This points the app to the mock API.

4. **Run the development server:**
   ```sh
   pnpm run dev
   ```

5. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## Design Choices

- **Why JSON Server?**  
  To simulate realistic data fetching and asynchronous UI updates, I used JSON Server as a local mock API. This keeps the code modular and closer to a real-world setup, while still using only local resources.
- **Responsiveness:**  
  All layouts and components use CSS media queries and flexible units to ensure a smooth experience on any device.
- **Themeability:**  
  The design is kept simple and clean, allowing for easy customization of colors and styles in the CSS files.
- **Accessibility:**  
  Interactive elements are keyboard accessible and use semantic HTML where possible.

## Customization

- You can replace images in the `/static` folder with your own game assets.
- To change the mock data, edit `db.json`.

## Live Demo

My Deployed Link Will be available soon.

## Scripts

- `pnpm run server` — Start the JSON Server mock API
- `pnpm run dev` — Start the development server
- `pnpm run build` — Build for production
- `pnpm run preview` — Preview the production build
- `pnpm run start` — Start the production server (after building)
