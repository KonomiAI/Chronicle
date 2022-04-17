import {
  styled,
  InputLabel,
  InputLabelProps,
  MenuItem,
  MenuItemProps,
  Select,
  SelectProps,
} from '@mui/material';

export const StyledInputLabel = styled(InputLabel)<InputLabelProps>(
  ({ theme: { palette } }) => ({
    '&.Mui-focused': {
      color: palette.grey[800],
    },
  }),
);

export const StyledSelect = styled(Select)<SelectProps>(
  ({ theme: { palette } }) => ({
    '&.Mui-focused': {
      '.MuiOutlinedInput-notchedOutline': {
        // Outlined Border
        border: `1px solid ${palette.grey[800]}`,
      },
      '.MuiOutlinedInput-input': {
        // Input text
        color: palette.grey[800],
      },
    },
    '&:hover': {
      '.MuiOutlinedInput-notchedOutline': {
        // Outlined Border
        border: `1px solid ${palette.grey[800]}`,
      },
    },
  }),
);

export const StyledMenuItem = styled(MenuItem)<MenuItemProps>(
  ({ theme: { palette } }) => ({
    '&.Mui-selected': {
      backgroundColor: palette.grey[200],
    },
    '&:hover': {
      backgroundColor: palette.grey[200],
    },
  }),
);
