import React from 'react';
import { Container } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormOptionValue } from '@konomi.ai/c-form';

import { FormInputField } from './FormInputField';
import { FormSelect } from './FormSelect';
import { MultiSelect } from './MultiSelect';
import { StyledMenuItem } from './styled';
import Spacer from '../spacer/Spacer';

const options: FormOptionValue[] = [];
for (let i = 0; i < 10; i += 1) {
  options.push({
    id: `id${i}`,
    label: `Option ${i}`,
  });
}

export const AllFormInputs = () => {
  const { control, setValue } = useForm();

  return (
    <Container>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}

      <FormInputField
        name="short-text"
        control={control}
        rules={{
          required: true,
          minLength: 1,
        }}
        label="Short Text Field"
      />
      <Spacer size="lg" />
      <FormInputField
        name="long-text"
        control={control}
        rules={{
          required: true,
          minLength: 1,
        }}
        multiline={5}
        label="Long Text Field - 5 lines"
      />
      <Spacer size="lg" />
      <FormInputField
        name="number"
        control={control}
        rules={{
          required: true,
          minLength: 1,
        }}
        type="number"
        label="Number Input Field"
      />
      <Spacer size="lg" />
      <FormSelect
        control={control}
        name="form-select-with-options"
        label="Form Select with Options prop"
        options={options}
      />
      <Spacer size="lg" />
      <FormSelect
        control={control}
        name="form-select-with-children"
        label="Form Select with Children"
      >
        <StyledMenuItem value="option1">Option 1</StyledMenuItem>
        <StyledMenuItem value="option2">Option 2</StyledMenuItem>
        <StyledMenuItem value="option3">Option 3</StyledMenuItem>
      </FormSelect>
      <Spacer size="lg" />
      <MultiSelect
        control={control}
        setValue={setValue}
        name="multi-select-with-options"
        label="Multi-Select with Options"
        options={options}
      />
      <Spacer size="lg" />
      <MultiSelect
        control={control}
        setValue={setValue}
        name="multi-select-with-children"
        label="Multi-Select with Children"
      >
        <StyledMenuItem value="option1">Option 1</StyledMenuItem>
        <StyledMenuItem value="option2">Option 2</StyledMenuItem>
        <StyledMenuItem value="option3">Option 3</StyledMenuItem>
      </MultiSelect>
    </Container>
  );
};
