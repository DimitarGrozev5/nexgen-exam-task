# Running the App

## Check if the post bin is still active

- First go to [HookBin](https://hookbin.com/YVkaKJalYbUQjy0QmeZa) to check if the **_post bin_** is still active
- If the bin is not active, you will need to create a new bin, by going to [HookBin](https://hookbin.com/) and clicking on _CREATE NEW ENDPOIN_
- Copy the _bin **id**_ to the `.env` file

## Starting the App

- To start the App first run `npm i` in the project folder, to install dependencies
- Run `npm start` to start the development server

# Project structure

## Tech Stack

The project is build using _create-react-app_. Component styling is handled with _css modules_. No external libraries are used.

The App posts data to a _post bin_ - [HookBin](https://hookbin.com/)

## App structure

The App tries to solve three problems, related to Form creation, state managment and data posting:

1. Upgrade the default _html input elements_ to provide a consistent development and user experience

2. Finding a way to build a Form and manage its state, that minimizes code duplication and allows for simple development of forms

3. Sending data to a remote server, while again minimizing code duplication and allowing for user feedback

My solution is the following:

- Create a **Form** Component, that provides a **Context** for all of the child Input elements inside it.
- Create **Input** Components, that are build on top of the default _html input elements_.
- The **Input** Components can be controlled in one of two ways:

1. By providing a **value** and **onChange** props and handling the Component state the usual way
2. By **not** providing these props and letting the parent Form take controll, trough a **useForm** custom hook

- The **Form** Component accepts an _onSubmit_ function, that will be called when the user submits the form, with an object of key-value pairs - { [inputName]: inputValue }

- Every **Input** Component also can accept an _error message_ and a _validator function_. These values will be used for input validation.
