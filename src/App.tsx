import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
  AppBar,
  Toolbar,
  Fab,
  Box,
  Chip
} from '@mui/material';
import { TaskForm } from './components/TaskForm';
import AddIcon from '@mui/icons-material/Add';
import { SortMenu } from './components/SortMenu';
import { useFormModal } from './context/useFormModal';
import { TaskGrid } from './components/TaskGrid';
import { TaskList } from './components/TaskList';
import { useTaskContext } from './context/useTaskContext';

function App() {
  const { tasks, taskProperties, filterTasks } = useTaskContext();
  const { openForm } = useFormModal();

  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline enableColorScheme />
      <TaskForm />
      <AppBar position="static">
        <Toolbar variant="dense">
          <SortMenu />
          <Fab
            onClick={() => openForm()}
            color="secondary"
            aria-label="Add task"
            sx={{
              position: 'absolute',
              zIndex: 1,
              top: 30,
              left: 0,
              right: 0,
              margin: '0 auto'
            }}
          >
            <AddIcon />
          </Fab>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ pt: { xs: 2, md: 8 }, pb: 6 }}>
        <Container
          maxWidth="sm"
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'column'
          }}
        >
          {taskProperties && <TaskGrid />}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            {taskProperties &&
              Object.keys(taskProperties.statoos).map((t) => (
                <Chip
                  onClick={() => filterTasks('status', t)}
                  key={t}
                  label={`${t}: ${taskProperties.statoos[t]}`}
                  variant="outlined"
                  color="primary"
                />
              ))}
          </Box>
          {tasks && <TaskList title="Todo" tasks={tasks} />}
        </Container>
      </Container>
    </ThemeProvider>
  );
}

export default App;
