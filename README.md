# Vite Todo

## Get Started

Using localstorage for demo purposes.

### Tech used

- **Vite**: Lightweight and fast. Also fun to try.
- **Material UI**: Quick styling. HAve also been wanting to try it.
- **React Hook Forms**: For forms. Also picked because I wanted to try it.
- **Day.js**: 2kb date helper.

### Project structure choices.

- Using two React Contexts: FormModalContext and TaskContext to avoid prop drilling.

- TaskContext is also the only point of access for useApi. This limits dependencies of the project. as components are only dependant on the contexts.

- React.StrictMode is turned off, as it broke autofocus of the form.
