# Quick Notes v3

## Project Overview

Quick Notes v3 is a note-taking web application built with React and TypeScript, bootstrapped using Create React App. The project is structured for modularity and maintainability, featuring components for adding, editing, and searching notes. 

### Key Files and Folders
- **public/**: Static assets and the main HTML template.
- **src/**: Main source code for the React app.
	- **App.tsx**: Main application component.
	- **components/**: Contains modular React components for note management:
		- `AddNote.tsx`, `EditNote.tsx`, `SearchNotes.tsx` and their respective CSS files.
	- **index.tsx**: Entry point for the React app.
	- **App.test.tsx**: Test file for the main app component.
	- **setupTests.ts**: Test setup configuration.
- **package.json**: Project dependencies and scripts.
- **tsconfig.json**: TypeScript configuration.
- **webpack.config.js**: Webpack configuration (if ejected or customized).

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Current Features List

- Add and save notes
- Edit existing notes
- Search for notes 
- Edit the searched notes within the tab
- Save drafts on new notes to add

## Features to add

- Add date created and last edited date on each note
- Add a cool bg
- Add Quick Notes icon
- Move around order of notes
- Notes trash can
- Export data