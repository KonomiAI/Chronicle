import React, { useState } from 'react';
import { ArrowUpward, Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { DEFAULT_FIELD_VAL } from './const';
import { FormField } from './form-field';
import Spacer from '../spacer/Spacer';
import { FormInputField } from '../form-inputs/FormInputField';
import { secureRandomString } from '../../utils';
import { ßwillFixThisTypeLater } from '../../types';
import { usePermission } from '../use-permission/UsePermissionContext';

interface FormSectionProps {
  index: number;
  sectionCount: number;
  context: string;
  onRemove: () => void;
  disableMoveUp?: boolean;
  disableMoveDown?: boolean;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

export const FormSection = ({
  index,
  onRemove,
  sectionCount,
  context,
  disableMoveDown,
  disableMoveUp,
  onMoveDown,
  onMoveUp,
}: FormSectionProps) => {
  const { control } = useFormContext();
  const { canWrite } = usePermission();
  const { fields, append, remove, swap, insert } = useFieldArray({
    control,
    name: `${context}sections.${index}.fields`,
  });

  const description = useWatch({
    name: `${context}sections.${index}.description`,
  });

  const [shouldShowDescription, setShouldShowDescription] = useState(
    !!description,
  );

  return (
    <>
      <Spacer size="md" />
      <Box
        sx={{
          bgcolor: '#FF6961',
          p: 1,
          display: 'inline-block',
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          color: 'white',
          fontWeight: 600,
          fontSize: 12,
        }}
      >
        Section {index + 1} of {sectionCount}
      </Box>
      <Card sx={{ mb: 4 }} data-testid="form-section">
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ display: 'flex' }}>
              <FormInputField
                name={`${context}sections.${index}.name`}
                control={control}
                rules={{
                  required: true,
                  minLength: 1,
                }}
                label="Section Title"
              />
              <IconButton
                aria-label="delete this section"
                sx={{ ml: 1 }}
                onClick={() => onRemove()}
                data-testid="btn-delete-section"
                disabled={!canWrite}
              >
                <Delete />
              </IconButton>
              {onMoveUp && (
                <IconButton
                  onClick={onMoveUp}
                  data-testid="move-up"
                  disabled={disableMoveUp}
                >
                  <ArrowUpward />
                </IconButton>
              )}
              {onMoveDown && (
                <IconButton
                  onClick={onMoveDown}
                  data-testid="move-down"
                  disabled={disableMoveDown}
                >
                  {/* Instead of importing another icon (more data to load), we just flip the same icon around lol
                    GH copilot is crazy.
                */}
                  <ArrowUpward sx={{ transform: 'rotate(180deg)' }} />
                </IconButton>
              )}
            </Grid>
            <Grid item xs={12}>
              {shouldShowDescription ? (
                <FormInputField
                  control={control}
                  name={`${context}sections.${index}.description`}
                  label="Section description (optional)"
                  testId="input-section-description"
                  multiline={2}
                />
              ) : (
                <Button
                  color="inherit"
                  size="small"
                  data-testid="btn-add-section-description"
                  onClick={() => setShouldShowDescription(true)}
                  disabled={!canWrite}
                >
                  Add description
                </Button>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
        Questions
      </Typography>
      {fields.map((f: ßwillFixThisTypeLater, i) => (
        <FormField
          context={context}
          key={f.id}
          index={i}
          sectionIndex={index}
          onRemove={() => remove(i)}
          onMoveUp={() => swap(i, i - 1)}
          onMoveDown={() => swap(i, i + 1)}
          onDuplicate={() =>
            insert(i + 1, {
              ...f,
              id: secureRandomString(16),
              name: `${f.name} (copy)`,
            })
          }
          disableMoveDown={i === fields.length - 1 || !canWrite}
          disableMoveUp={i === 0 || !canWrite}
        />
      ))}
      <Box sx={{ mt: 2 }}>
        <Button
          onClick={() => append(DEFAULT_FIELD_VAL())}
          data-testid="btn-add-field"
          disabled={!canWrite}
        >
          Add question to section
        </Button>
      </Box>
    </>
  );
};
