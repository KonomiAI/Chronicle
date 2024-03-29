import {
  ContentCopy,
  Delete,
  Description,
  MoreVert,
} from '@mui/icons-material';
import {
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import React from 'react';
import { usePermission } from '../../use-permission/UsePermissionContext';

export interface FormFieldOptionsMenuProps {
  onRemove?: () => void;
  onDuplicate?: () => void;
  onAddDescription?: () => void;
}

const ITEM_HEIGHT = 48;

export const FormFieldOptionsMenu: React.FC<FormFieldOptionsMenuProps> = ({
  onDuplicate,
  onRemove,
  onAddDescription,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { canWrite } = usePermission();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        data-testid="form-field-options-menu-btn"
        aria-label="more actions"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        disabled={!canWrite}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="long-menu"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {onAddDescription && (
          <MenuItem
            onClick={() => {
              onAddDescription();
              handleClose();
            }}
            data-testid="btn-add-field-description"
          >
            <ListItemIcon>
              <Description fontSize="small" />
            </ListItemIcon>
            <ListItemText>Add description</ListItemText>
          </MenuItem>
        )}
        {onDuplicate && (
          <MenuItem
            onClick={() => {
              onDuplicate();
              handleClose();
            }}
          >
            <ListItemIcon>
              <ContentCopy fontSize="small" />
            </ListItemIcon>
            <ListItemText>Duplicate</ListItemText>
          </MenuItem>
        )}
        <Divider />
        {onRemove && (
          <MenuItem
            onClick={() => {
              onRemove();
              handleClose();
            }}
            data-testid="btn-delete-field"
          >
            <ListItemIcon>
              <Delete fontSize="small" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};
