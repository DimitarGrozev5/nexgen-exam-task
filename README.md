# Running the App

## Check if the post bin is still active

- First go to [HookBin](https://hookbin.com/YVkaKJalYbUQjy0QmeZa) to check if the **_post bin_** is still active
- If the bin is not active, you will need to create a new bin, by going to [HookBin](https://hookbin.com/) and clicking on _CREATE NEW ENDPOINT_
- If you created a new bin, you'll have to copy the _bin **id**_ to the `.env` file in the project root.

## Starting the App

- To start the App first run `npm i` in the project folder, to install dependencies
- Run `npm start` to start the development server

# Project structure

## Tech Stack

The project is build using _create-react-app_. Component styling is handled with the build in _css modules_. No third party libraries are used.

The App posts data to a _post bin_ - [HookBin](https://hookbin.com/)

## App structure

The App tries to solve three problems, related to Forms:

1. Upgrade the default _html input elements_ to provide a consistent development and user experience

2. Find a way to build a Form and manage its state, that minimizes code duplication and allows for simple development of forms

3. Build a function that takes care of the configuring `fetch` requests, in order to again minimize code and logic duplication

My solution is the following:

- Create a **Form** Component, that provides a **Context** for all of the child Input elements inside it.
- Create **Input** Components, that are build on top of the default _html input elements_.
- The **Input** Components can be controlled in one of two ways:

1. By providing a **value** and **onChange** props and handling the Component state the usual React way - useState, useReducer etc.
2. By **not** providing these props and letting the parent Form take control, trough a **useForm** custom hook. The hook handles Input onChange events, takes care of validation and stores all of the form values in one place

- The **Form** Component accepts an _onSubmit_ function, that will be called when the user submits the form. The _onSubmit_ function will receive an object of key-value pairs - `{ [inputName]: inputValue }`

- Every **Input** Component also can accept an _error message_ and a _validator function_. These values will be used for input validation.

- A custom `useHTTPClient` hook is used to send and fetch data.

## CSS Styling

The CSS layout relies on _Flex_ and _Grid_. It uses _@media_ queries to provide a responsive design. _@media_ breakpoints are selected, as to provide for a consistent user experience, across various device sizes.

The CSS targets the current versions of major browsers. Support for older browsers can be added, through browser prefixes, @supports rules and js polyfills.
