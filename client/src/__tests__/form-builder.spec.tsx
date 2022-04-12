import React from 'react';

import { test, describe } from 'vitest';

import { FormBuilder } from '../components';
import { render, screen } from './testUtil';
import '@testing-library/jest-dom';

describe('FormBuilder Component', () => {
  beforeEach(() => {
    render(<FormBuilder />);
  });
  test('will render', () => {
    expect(screen.getByText('Section 1 of 1')).toBeInTheDocument();
  });
  test('will initially render with 1 field', () => {
    expect(screen.getAllByTestId('form-field').length).toEqual(1);
  });
  test('will initially render with 1 section', () => {
    expect(screen.getAllByTestId('form-section').length).toEqual(1);
  });
  test('will be able to add a new section', () => {
    screen.getByTestId('btn-add-section').click();
    expect(screen.getAllByTestId('form-section').length).toEqual(2);
  });
  test('will be able to add a new section', () => {
    screen.getByTestId('btn-add-section').click();
    expect(screen.getAllByTestId('form-section').length).toEqual(2);
  });
  test('will be able to add a new field', () => {
    screen.getByTestId('btn-add-field').click();
    expect(screen.getAllByTestId('form-field').length).toEqual(2);
  });
  test('will be able to delete fields after adding a bunch of them', () => {
    // There is one extra by default
    screen.getByTestId('btn-add-field').click();
    screen.getByTestId('btn-add-field').click();
    screen.getByTestId('btn-add-field').click();
    screen.getByTestId('btn-add-field').click();
    screen.getAllByTestId('btn-delete-field')[0].click();
    screen.getAllByTestId('btn-delete-field')[0].click();
    expect(screen.getAllByTestId('form-field').length).toEqual(3);
  });

  test('will be able to remove sections after adding some', () => {
    screen.getByTestId('btn-add-section').click();
    screen.getByTestId('btn-add-section').click();
    screen.getByTestId('btn-add-section').click();
    screen.getAllByTestId('btn-delete-section')[0].click();
    screen.getAllByTestId('btn-delete-section')[0].click();
    expect(screen.getAllByTestId('form-section').length).toEqual(2);
  });
});
