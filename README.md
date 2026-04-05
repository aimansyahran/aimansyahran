# Premium Designer Portfolio

A high-end portfolio landing page for a professional Graphic Designer with 8+ years of experience. Built with React + Tailwind CSS, featuring a luxurious, minimal, and editorial design aesthetic.

---

## 🎨 Features

- **Premium Dark Theme**: Sophisticated dark mode with accent colors
- **Minimal Design**: Clean typography, generous whitespace, balanced composition
- **Responsive Layout**: Fully adaptive from desktop to mobile
- **Smooth Animations**: Subtle transitions and hover effects
- **Project Modal**: Fullscreen project view with smooth animations
- **Premium Loading Screen**: Animated progress indicator
- **Smart Navigation**: Sticky navbar with smooth scroll
- **Performance Optimized**: Lazy loading images, optimized assets

---

## 🚀 Getting Started

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open your browser to `http://localhost:5173`

### Production Build

```bash
npm run build
```

Build output will be in the `dist/` directory.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── About.jsx           # About section with stats
│   ├── Footer.jsx          # Footer with contact info
│   ├── Hero.jsx            # Hero section with CTA
│   ├── LoadingScreen.jsx   # Premium loading animation
│   ├── Navbar.jsx          # Sticky navigation
│   ├── ProjectCard.jsx     # Individual project card
│   ├── ProjectModal.jsx    # Fullscreen project modal
│   ├── Services.jsx        # Services/expertise section
│   └── WorkGrid.jsx        # Grid layout for projects
├── data/
│   └── portfolio.js        # Portfolio data and content
├── App.jsx                 # Main app component
├── index.css               # Global styles and Tailwind
└── main.jsx                # Entry point
```

---

## 🎯 Customization

All content is stored in `src/data/portfolio.js`. You can easily customize:

- Designer name and bio
- Hero headline and CTA
- Project portfolio (add/remove/edit projects)
- Services offered
- Contact information and social links
- Color scheme (in `tailwind.config.js`)

---

## 🎨 Design Specifications

- **Fonts**: Inter (body) + Playfair Display (headlines)
- **Colors**: Dark theme with accent gold (#d4a574)
- **Spacing**: Generous margins and padding
- **Animations**: Smooth transitions (300-700ms)
- **Grid**: Adaptive 3-column on desktop, 2 on tablet, 1 on mobile

---

## 📱 Responsive Breakpoints

- **Desktop**: ≥1024px (3-column grid)
- **Tablet**: 768px - 1023px (2-column grid)
- **Mobile**: <768px (single column)

---

## ⚡ Performance

- Images lazy-loaded
- Minimal JavaScript (React only)
- Optimized Tailwind CSS bundle
- No external dependencies beyond React & Tailwind

---

## 📄 License

Free to use and modify for personal or commercial projects.
