import { Typography, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useTaskContext } from '../context/useTaskContext';
import { ButtonSelect } from './TaskButtonGroup';

export function TaskGrid() {
  const { filterTasks, config, taskProperties } = useTaskContext();

  const categories = Object.keys(taskProperties?.categories ?? {});
  const hidden = categories.splice(3);
  const applyFilter = (t: string) => {
    filterTasks({
      category: t !== config?.filter?.category ? t : undefined,
      status: config?.filter?.status
    });
  };

  return (
    <Grid container spacing={2} marginY={2} justifyContent="center">
      {categories &&
        categories.map((t: string) => (
          <Grid xs={categories.length < 3 ? 5 : 3} key={t}>
            <Button
              key={t}
              variant={t === config?.filter?.category ? 'contained' : 'outlined'}
              onClick={() => applyFilter(t)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%'
              }}
            >
              <Typography
                textTransform="capitalize"
                fontSize={14}
                noWrap={true}
                sx={{
                  width: '100%'
                }}
              >
                {t}
              </Typography>
              <Typography fontSize={10} lineHeight={2}>
                {taskProperties?.categories[t]}{' '}
                {taskProperties?.categories[t] === 1 ? 'task' : 'tasks'}
              </Typography>
            </Button>
          </Grid>
        ))}
      {hidden.length > 0 && (
        <Grid xs={2}>
          <ButtonSelect options={hidden} onChange={applyFilter} />
        </Grid>
      )}
    </Grid>
  );
}
