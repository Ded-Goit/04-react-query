# React + TypeScript + Vite

## 📂 Project structure

           03-react-movies/
           ├── 📁public         Contains static assets that are copied directly to the final build
           ├── 📁src/                 Main source directory where all the application code resides.
           │ ├── 📁assets Stores general-purpose static files used in the app (e.g., images, icons).
           │ ├── 📁components/ Folder for all React UI components, structured by feature or purpose.
           │ │ ├── 📁App/     Contains the root application component and its CSS styles.
           │ │ │ ├── 📄App.tsx      — Main component where application logic is initiated.
           │ │ │ └── 📄App.module.css             — CSS Module for styling App.tsx.
           │ │ ├── 📁ErrorMessage/           UI component for displaying error messages.
           │ │ │ ├── 📄ErrorMessage.tsx           — Component for showing error alerts.
           │ │ │ └── 📄ErrorMessage.module.css    — Styles specific to ErrorMessage.
           │ │ ├── 📁Loader/                 UI loader/spinner component.
           │ │ │ ├── 📄Loader.tsx                 — Loading animation or spinner component.
           │ │ │ └── Loader.module.css            — Styling for the loader.
           │ │ ├── 📁MovieGrid/                  Component for displaying a grid of movies.
           │ │ │ ├── 📄MovieGrid.tsx              — Grid layout for showing movie items.
           │ │ │ └── 📄MovieGrid.module.css       — Styling for the movie grid.
           │ │ └── 📁MovieModal/  Modal component for displaying detailed movie information.
           │ │ │ ├── 📄MovieModal.tsx             — Modal window with movie details.
           │ │ │ └── 📄MovieModal.module.css      — Modal-specific styles.
           │ │ ├── 📁SearchBar/              Search input and button component.
           │ │ │ ├── 📄SearchBar.tsx              — Handles search input and form submission.
           │ │ │ └── 📄SearchBar.module.css       — Styling for the search bar.
           │ ├── 📁services/        Contains service functions for external API interactions.
           │ │ └── 📄movieService.ts              — Logic for fetching movie data from TMDB API.
           │ ├── 📁types/           TypeScript type definitions.
           │ │ └── 📄movie.ts              — Type definitions for movie-related data structures.
           │ ├── 📄declarations.d.ts    Global TypeScript declarations
           │ ├── 📄global.css           Global styles applied throughout the app.
           │ ├── 📄main.tsx             Entry point of the React application.
           │ └── 📄vite-env.d.ts Environment type declarations for Vite's special variables like
           ├── 📄.gitignore          Lists files/folders that Git should ignore
           ├── 📄README.md           Project documentation and setup instructions.
           ├── 📄eslint.config.js    ESLint configuration for code linting and formatting rules.
           └── 📄index.html Main HTML template used by Vite to inject the app during build and dev.
           └── 📄package-lock.json   Lockfile that ensures consistent npm install behavior.
           └── 📄package.json        Lists project dependencies, scripts, and metadata.
           └── 📄tsconfig.app.json   TypeScript configuration specific to the application code.
           └── 📄tsconfig.json       Root TypeScript config file.
           └── 📄tsconfig.node.json  TypeScript config for Node.js-specific tooling or scripts.
           └── 📄vite.config.ts      Vite configuration file for build and development settings.

### This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
