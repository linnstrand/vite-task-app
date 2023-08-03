import { Typography, Button, Menu, MenuItem } from '@mui/material';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useTaskContext } from '../context/useTaskContext';
import { Task } from '../models';

export const SortMenu = () => {
  const { sortTasks, config } = useTaskContext();

  // handling of anchorEl is from MUI documentation
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const sortOn = (value?: keyof Task) => {
    config?.sort === value ? sortTasks() : sortTasks(value);
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        size="large"
        id="filter-button"
        aria-controls={open ? 'filter-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        aria-label="menu"
        sx={{ p: 2 }}
      >
        <MenuIcon />
        <Typography variant="button" component="div" sx={{ marginLeft: 1 }}>
          Sort
        </Typography>
      </Button>
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => sortOn()}
        MenuListProps={{
          'aria-labelledby': 'filter-button'
        }}
      >
        <MenuItem selected={config?.sort === 'name'} onClick={() => sortOn('name')}>
          Name
        </MenuItem>
        <MenuItem selected={config?.sort === 'status'} onClick={() => sortOn('status')}>
          Status
        </MenuItem>
        <MenuItem selected={config?.sort === 'dueDate'} onClick={() => sortOn('dueDate')}>
          Due date
        </MenuItem>
      </Menu>
    </>
  );
};
