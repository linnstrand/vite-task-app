import { Task } from '../models';
import { TaskItem } from './TaskItem';
import { Box, List, Typography } from '@mui/material';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(isToday);

interface Props {
  title: string;
  tasks: Task[];
}

export const TaskList = ({ title, tasks }: Props) => {
  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="overline" component="h2">
        {title}
      </Typography>
      <List component="div" sx={{ width: '100%' }}>
        {tasks.map((t: Task) => (
          <TaskItem key={t.id} task={t} isToday={dayjs(t.dueDate).isToday()} />
        ))}
      </List>
    </Box>
  );
};
