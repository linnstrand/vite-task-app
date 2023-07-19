import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { FormModalProvider } from './context/formModalContext.tsx';
import { TaskProvider } from './context/taskContext.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode> ruins autoFocus
  <TaskProvider>
    <FormModalProvider>
      <App />
    </FormModalProvider>
  </TaskProvider>
);
