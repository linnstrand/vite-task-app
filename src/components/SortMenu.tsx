import { Typography, Button, Menu, MenuItem } from '@mui/material';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useTaskContext } from '../context/useTaskContext';

export const SortMenu = () => {
  const { sortTasks, sortedOn } = useTaskContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const sortOn = (value?: string) => {
    sortedOn === value ? sortTasks() : sortTasks(value);
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
        <MenuItem selected={sortedOn === 'name'} onClick={() => sortOn('name')}>
          Name
        </MenuItem>
        <MenuItem selected={sortedOn === 'status'} onClick={() => sortOn('status')}>
          Status
        </MenuItem>
        <MenuItem selected={sortedOn === 'dueDate'} onClick={() => sortOn('dueDay')}>
          Due date
        </MenuItem>
      </Menu>
    </>
  );
};
