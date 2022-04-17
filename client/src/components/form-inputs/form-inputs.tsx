import React from 'react';
import { Container } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormOptionValue } from '@konomi.ai/c-form';

import { FormInputField } from './FormInputField';
import { FormSelect } from './FormSelect';
import { MultiSelect } from './MultiSelect';
import Spacer from '../spacer/Spacer';

const options: FormOptionValue[] = [
  {
    id: '1id',
    label: '1label',
  },
  {
    id: '2id',
    label: '2label',
  },
  {
    id: '3id',
    label: '3label',
  },
  {
    id: '4id',
    label: '4label',
  },
  {
    id: '5id',
    label: '5label',
  },
  {
    id: '6id',
    label: '6label',
  },
  {
    id: '7id',
    label: '7label',
  },
  {
    id: '8id',
    label: '8label',
  },
  {
    id: '9id',
    label: '9label',
  },
  {
    id: '10id',
    label: '10label',
  },
];

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
          valueAsNumber: true,
        }}
        numberField
        label="Number Input Field"
      />
      <Spacer size="lg" />
      <FormSelect
        control={control}
        name="Form Select"
        label="Form Select"
        options={options}
      />
      <Spacer size="lg" />
      <MultiSelect
        control={control}
        setValue={setValue}
        name="Multi-Select"
        label="Multi-Select"
        options={options}
      />
    </Container>
  );
};
