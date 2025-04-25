```md
# 🧩 Customizable Dashboard

A customizable dashboard built with **Next.js**, **React Grid Layout**, and **Drizzle ORM**. Add, move, resize, and persist widgets effortlessly — perfect for admin panels, analytics dashboards, or internal tools.

![Dashboard Preview](./public/preview.png)

---

## ✨ Features

- 🛠 Drag-and-drop, resizable widgets using React Grid Layout
- ⚙️ Server-side rendered with Next.js
- 💾 Persistent layouts stored using Drizzle ORM
- 🔌 Easy to extend with new widgets
- 🎨 Tailwind CSS for rapid UI customization

---

## 🧰 Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, Shadcn 
- **Grid System**: [React Grid Layout](https://github.com/react-grid-layout/react-grid-layout)  
- **ORM**: [Drizzle ORM](https://orm.drizzle.team)  
- **Database**: PostgreSQL  
- **Styling**: Tailwind CSS

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/darzhz/darshboard.git
cd darshboard
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure the Database

Create a `.env` file in the root:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/darshboard
JWT_SECRET="Thisissupersecret123"
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Then push the schema using Drizzle:

```bash
npx drizzle-kit push
```

### 4. Run the Dev Server

```bash
npm run dev
# or
yarn dev
```

Your dashboard should now be live at `http://localhost:3000`

---


## ➕ Adding New Widgets

1. Create a new widget in `src/components/widgets/`
2. Register it in the layout object
3. Set default size and position

---

## 📄 License

Licensed under the [MIT License](LICENSE).

---

## 🙋‍♀️ Author

Built with 💙 by [Darsh Shyam Kumar](https://github.com/darzhz)

---

## 🤝 Contributions

Pull requests, bug reports, and feature suggestions are welcome!

```

---
