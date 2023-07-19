import {
  Button,
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Box,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Task, statoos } from '../models';
import { useFormModal } from '../context/useFormModal';
import { useTaskContext } from '../context/useTaskContext';

export const TaskForm = () => {
  const { active, removeActive } = useFormModal();
  const { addTask, editTask, removeTask } = useTaskContext();

  const { control, handleSubmit, formState } = useForm({
    values: active
  });

  const onEdit: SubmitHandler<Task> = (data) => {
    editTask(data);
    removeActive();
  };

  const onCreate: SubmitHandler<Omit<Task, 'id'>> = (data) => {
    addTask(data);
    removeActive();
  };

  const onDelete: SubmitHandler<Task> = (task) => {
    removeTask(task.id);
    removeActive();
  };

  const onSubmit = (t: Omit<Task, 'id'> | Task) => {
    'id' in t ? onEdit(t) : onCreate(t);
  };

  const task = !!active && 'id' in active && active; //isTask(active);

  return (
    <Box display="flex" flexDirection="row" justifyContent="space-around">
      <Dialog open={!!active} onClose={() => removeActive()}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField {...field} autoFocus label="Name" fullWidth required />
              )}
            />
            <Controller
              name="category"
              control={control}
              render={({ field }) => <TextField {...field} label="Category" fullWidth required />}
            />
            <FormControl variant="filled">
              <FormLabel id="category-label">Status</FormLabel>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <RadioGroup row aria-labelledby="status-label" {...field}>
                    {statoos.map((t: string) => (
                      <FormControlLabel value={t} key={t} control={<Radio required />} label={t} />
                    ))}
                  </RadioGroup>
                )}
              />
            </FormControl>
            <Controller
              name="dueDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="date"
                  label="Due date"
                  required
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            {task && (
              <IconButton aria-label="delete" onClick={() => onDelete(task)}>
                <DeleteIcon />
              </IconButton>
            )}
            <Box width="100%" display="flex" justifyContent="flex-end">
              <Button onClick={() => removeActive()}>Cancel</Button>
              <Button
                type="submit"
                variant="contained"
                disabled={!formState.isValid || !formState.isDirty}
                sx={{ marginLeft: 1 }}
              >
                {task ? 'Save' : 'Create'}
              </Button>
            </Box>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};
