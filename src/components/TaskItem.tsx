import { IconButton, ListItem, ListItemText } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Task, statoos } from '../models';
import { useFormModal } from '../context/useFormModal';
import { pink, grey } from '@mui/material/colors';

export const TaskItem = ({ task, isToday }: { task: Task; isToday: boolean }) => {
  const { name, id, status, dueDate, category } = task;
  const { openForm } = useFormModal();

  const indicatorColor = status === statoos[2] ? grey[500] : isToday ? pink[200] : 'primary.main';

  return (
    <ListItem
      component="div"
      sx={{
        border: 1,
        borderColor: indicatorColor,
        borderRadius: 2,
        marginBottom: 1
      }}
    >
      <IconButton aria-label="edit task" onClick={() => openForm(task)} color="secondary">
        <EditIcon />
      </IconButton>
      <ListItemText
        id={id.toString()}
        primary={name}
        secondary={category}
        sx={{
          textDecoration: status === 'done' ? 'line-through' : 'inherit',
          marginLeft: 2
        }}
      />
      <ListItemText
        primary={dueDate.toString()}
        secondary={status}
        sx={{
          color: indicatorColor,
          textAlign: 'end'
        }}
      />
    </ListItem>
  );
};
