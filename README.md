# Vite Todo

## Get Started

The file `.env.local.example` need to be renamed to `.env.local.example` with a valid URL to your backend.

### Tech used

- **Vite**: Lightweight and fast. Also fun to try.
- **Material UI**: Quick styling. HAve also been wanting to try it.
- **React Hook Forms**: For forms. Also picked because I wanted to try it.
- **Day.js**: 2kb date helper.

### Project structure choices.

- Using two React Contexts: FormModalContext and TaskContext to avoid prop drilling.

- TaskContext is also the only point of access for useApi. This limits dependencies of the project. as components are only dependant on the contexts.

- React.StrictMode is turned off, as it broke autofocus of the form.

## Known errors

- Errors are logge from duplicate ID's in database. I let these be logged in console, and does not adjust the code for these events, as this indicates a problem in backend that should not be hidden.

- Status doesn't seem to change on save.

- Sort function doesn't seem to work well.

## To improve

- Adding testing.
- Handle filter and sort via url rather then state.
