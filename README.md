# 🧩 Customizable Dashboard

A highly flexible dashboard built with **Next.js**, **React Grid Layout**, and **Drizzle ORM**. Add, move, resize, and persist widgets effortlessly — perfect for admin panels, analytics dashboards, or internal tools.
<p align="center"> <img src="https://img.shields.io/badge/Next.js-13+-000?logo=next.js&logoColor=white" alt="Next.js Badge" /> <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React Badge" /> <img src="https://img.shields.io/badge/Tailwind_CSS-2dd4bf?logo=tailwindcss&logoColor=white" alt="Tailwind CSS Badge" /> <img src="https://img.shields.io/badge/Drizzle%20ORM-ff9900?logo=sequelize&logoColor=white" alt="Drizzle ORM Badge" /> <img src="https://img.shields.io/badge/PostgreSQL-4169e1?logo=postgresql&logoColor=white" alt="PostgreSQL Badge" /> <img src="https://img.shields.io/github/license/darzhz/darshboard?style=flat-square" alt="License Badge" /> </p>
![Dashboard Preview](./public/preview.png)

---

## ✨ Features

- 🛠 **Drag-and-drop, resizable widgets** with React Grid Layout
- 🔐 **JWT-based authentication**
- 💾 **Persistent layouts** stored via Drizzle ORM
- 🔌 **Easily extensible** with new widgets
- 🎨 **Rapid UI customization** with Tailwind CSS
- ⚡ **Dockerized** for ease of deployment

---

## 🧰 Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, Shadcn
- **Grid System**: [React Grid Layout](https://github.com/react-grid-layout/react-grid-layout)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team)
- **Database**: PostgreSQL
- **Styling**: Tailwind CSS

---

## 🗂 Project Structure

```plaintext
├── components.json           # (Optional) External UI components or theme configuration
├── docker/                   # Dockerfile for app containerization
├── docker-compose.yml        # Compose setup for PostgreSQL and app services
├── drizzle.config.js         # Drizzle ORM configuration
├── eslint.config.mjs         # ESLint configuration
├── next.config.ts            # Next.js project settings
├── next-env.d.ts             # Next.js TypeScript environment
├── package.json              # Project metadata and scripts
├── postcss.config.mjs        # PostCSS configuration
├── public/                   # Publicly accessible static assets
│   ├── preview.png           # Dashboard preview image
│   ├── *.svg                 # SVG icons and assets
├── README.md                 # Project documentation
├── tsconfig.json             # TypeScript configuration
└── src/                      # Main application source code
    ├── app/                  # Next.js app directory (routes, layout, pages)
    ├── components/           # Reusable React UI components
    ├── db/                   # Database schema and ORM logic
    ├── hooks/                # Custom React hooks
    ├── lib/                  # Utilities, helpers, API clients
    ├── middleware.ts         # Next.js middleware (auth, redirects)
    ├── service/              # Business logic and integrations
    └── types/                # TypeScript types and interfaces
```

---

## ⚙️ Key Technical Decisions

- **React Grid Layout** was chosen for its flexibility, mature ecosystem, and easy integration compared to alternatives like `react-mosaic`.
- **Drizzle ORM** ensures strong type-safety and fits naturally with Next.js API routes.
- **Database-stored layouts** guarantee consistency across sessions and devices.
- **Component-driven architecture** allows modular scaling—each widget is an independent React component.

---

## 🧩 Challenges Faced & Solutions

### 1. Preserving Layout State Across Sessions
- **Challenge**: Maintaining widget position and size per user/session.
- **Solution**: Layouts are serialized and persisted in the database using Drizzle ORM, updated via API on layout change.

### 2. Optimizing Grid Layout for Mobile Devices
- **Challenge**: Widgets behaved inconsistently on smaller screens.
- **Solution**: Fine-tuned `cols`, `breakpoints`, and adopted a mobile-first layout approach.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/darzhz/darshboard.git
cd darshboard
```

---

## 🐳 Running with Docker

> Ensure **Docker** and **Docker Compose** are installed on your machine!

### Build and Start Containers

```bash
docker compose up --build
```

This will:
- Build the app inside a `node:22` container
- Install dependencies (including `netcat`)
- Wait for PostgreSQL to be ready
- Apply database migrations (if enabled)
- Launch the Next.js app at [http://localhost:3000](http://localhost:3000)

### Environment Variables

Docker automatically uses `.env.docker`, or you can configure env variables in `docker-compose.yml`.

Example `.env.docker`:

```plaintext
DATABASE_URL=postgresql://postgres:yourpassword@db:5432/yourdbname
NODE_ENV=production
```

---

## ⚡ Useful Docker Commands

- **Build the Docker image:**

  ```bash
  docker compose build
  ```

- **Start containers (without rebuilding):**

  ```bash
  docker compose up
  ```

- **Stop containers:**

  ```bash
  docker compose down
  ```

- **Rebuild and refresh everything:**

  ```bash
  docker compose down -v
  docker compose up --build
  ```

---

## 🛠️ Local Development Setup

### Install Dependencies

Since the project uses **React 19**, you may encounter dependency warnings. To resolve them:

```bash
npm i --force
# or
npm i --legacy-peer-deps
```

### Configure the Database

Create a `.env` file:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/darshboard
JWT_SECRET="Thisissupersecret123"
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Push the database schema:

```bash
npx drizzle-kit push
```

### Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to view your dashboard.

---

## ➕ Adding New Widgets

1. Create a new component in `src/components/widgets/`.
2. Register the widget in the layout object.
3. Define its default size and position.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙋‍♀️ Author

Built with 💙 by [Darsh Shyam Kumar](https://github.com/darzhz)

---

## 🤝 Contributions

Pull requests, bug reports, and feature suggestions are welcome!

---