import { Typography, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useTaskContext } from '../context/useTaskContext';

export function TaskGrid() {
  const { filterTasks, filter, taskProperties } = useTaskContext();

  return (
    <Grid container spacing={2} marginY={2}>
      {taskProperties?.categories &&
        Object.keys(taskProperties.categories).map((t: string) => (
          <Grid xs={4} key={t}>
            <Button
              key={t}
              variant={t === filter?.name ? 'contained' : 'outlined'}
              onClick={() => filterTasks('category', t)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%'
              }}
            >
              <Typography textTransform="capitalize" fontSize={14}>
                {t}
              </Typography>
              <Typography fontSize={10} lineHeight={2}>
                {taskProperties?.categories[t]}{' '}
                {taskProperties?.categories[t] === 1 ? 'task' : 'tasks'}
              </Typography>
            </Button>
          </Grid>
        ))}
    </Grid>
  );
}
