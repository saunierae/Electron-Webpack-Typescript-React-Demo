# React Webpack Typescript Electron Journal Application

Electron application that allows users to have modular journals to create a one stop location for all of their journaling needs. Some examples are Mindfulness journals, Food journals, and Exercise journals. The journal UI is presented in React along with storing the state of the components. This should help reduce bugs and makes testing more predictable. 

* **[Electron](https://www.electronjs.org/)** (9.x)
* **[React](https://facebook.github.io/react/)** (16.x)
* **[Webpack](https://webpack.js.org/)** (4.x)
* **[Typescript](https://www.typescriptlang.org/)** (3.x)
* [Jest](https://facebook.github.io/jest/) - Testing framework for React applications
* Production build script
* Image loading/minification using [Image Webpack Loader](https://github.com/tcoopman/image-webpack-loader)
* Typescript compiling using [Awesome Typescript Loader](https://github.com/s-panferov/awesome-typescript-loader) (5.x)
* Code quality (linting) for Typescript.

## Installation
1. Clone/download repo
2. `yarn install` (or `npm install` for npm)

## Usage
**Development**

1. Change directory to the electron folder
2. Run `./build.ps1`to launch application
3. Select Create Journal Template
4. Type in journal name 
5. Select Edit next to the journal name
6. Click the dropdown to select the type for the section
7. Type in the section Name
8. Click add item
9. Update the text to display the labels or questions desired for the items
10. Repeat steps 6-9 until desired journal template is complete
11. Click complete Journal
12. Click Go to Journal
13. Fill out the custom journal


* App served @ `http://localhost:8080`

**Production**

`yarn run start-prod`

* Build app once (HMR disabled) to `/dist/`
* App served @ `http://localhost:3000`

---

**All commands**

Command | Description
--- | ---
`build.ps1` | (Script to build app to `/electron/` and `/web/`
`yarn build` | (Build app to `/electron/`
`yarn launch-electron` | (Launch app to `/electron/`
`yarn run start-dev` | Build app continuously (HMR enabled) and serve @ `http://localhost:8080`
`yarn run start-prod` | Build app once (HMR disabled) to `/dist/` and serve @ `http://localhost:3000`
`yarn run build` | Build app to `/dist/`
`yarn run test` | Run tests
`yarn run lint` | Run Typescript linter
`yarn run lint --fix` | Run Typescript linter and fix issues
`yarn run start` | (alias of `yarn run start-dev`)



**Note**: replace `yarn` with `npm` in `package.json` if you use npm.
**Debug Electron**: update the electron's `package.json` 
from "launch-electron": "node_modules/electron/dist/electron.exe dist/main.js" 
to : "launch-electron": "node_modules/electron/dist/electron.exe --inspect-brk dist/main.js"

