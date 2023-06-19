# HeyCOVID19 Version 3.0

**Core technologies:**

- [Astro.js](https://docs.astro.build/en/getting-started/)
- [TailwindCSS](https://tailwindcss.com/docs/installation)
- [React](https://react.dev/reference/react)

**Libraries used for animations:**

- [Framer Motion](https://www.framer.com/motion/)
- [GSAP](https://greensock.com/docs/)

**Other packages:**

- [react-share](https://www.npmjs.com/package/react-share) - for sharing functionality on desktop (devices where native sharing is not possible)
- [html-to-image](https://www.npmjs.com/package/html-to-image) - for converting card component into an downloadable image

## Data

The previous year website was fetching data from HyGraphCMS.
This version has hard-coded data available in JSON format.
File can be found in the **_src/data_** directory.
It has the following format:

- **data** - list/array of objects/dictionaries where each object/dict has the following properties:
  - **_languageLabel_** - string - what user sees on the screen, a 2-letter ISO code with a full language name in parenthesis
    - **_languageValue_** - string - a 2-letter ISO code used as query parameter in URL. Should match to the ISO code specified in languageLabel
    - **_bannerText_** - string - was not translated and thus always will be in English
    - **_cards_** - list/array of objects/dictionaries where each object/dict has the following properties:
      - **_cardId_** - string - id of the card used as a query parameter in the URL. Continues indexing from the 2020 and 2021 versions (because of that for some languages it does not start from 0)
    - **_name_** - string - author name
    - **_location_** - string - location of the author
    - **_title_** - string that contains emoji characters that are replaced by custom emojis- main title that users see in the bubble message
    - **_text_** - string - subtitle that users see under the bubble message
    - **_fact_** - string that contains emoji characters that are replaced by custom emojis - fact that users see when modal window is open
    - **_link_** - string - absolute URL

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```

/

├── public/

│ └── favicon.svg

├── src/

│ ├── components/

│ │ └── Card.astro

│ ├── layouts/

│ │ └── Layout.astro

│ └── pages/

│ └── index.astro

└── package.json

```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.
Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:3000`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

> To run Astro Project, you should have Node v16.12.0 or higher
