# React Webpack Typescript Electron Journal Applciation

Users use a form to create custom journal forms for desired journals.

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

1. Change directory to electron
2. Run `./build.ps1`to launch application


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

## See also
* [React Webpack Babel Starter](https://github.com/vikpe/react-webpack-babel-starter)
* [Isomorphic Webapp Starter](https://github.com/vikpe/isomorphic-webapp-starter)
