import React, { Suspense } from 'react';

import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import type { InitialEntry } from 'history';
import { createMemoryHistory } from 'history';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import finalTheme from '../theme';

export const cache = new Map();

const queryClient = new QueryClient();

const ThemeModeProvider = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={finalTheme}>{children}</ThemeProvider>
);

export interface ProviderOptions extends RenderOptions {
  initialEntries?: Array<InitialEntry>;
  route?: string;
}

interface ProvidersProps extends ProviderOptions {
  children: React.ReactNode;
}

const Providers = ({ children, route }: ProvidersProps) => {
  let Wrapper = (
    <Suspense fallback={null}>
      <ThemeModeProvider>{children}</ThemeModeProvider>
    </Suspense>
  );

  if (route) {
    Wrapper = (
      <BrowserRouter>
        <Routes>
          <Route element={Wrapper} path={route} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>{Wrapper}</QueryClientProvider>
  );
};

const renderWithProviders = (
  ui: React.ReactElement,
  options: ProviderOptions = {},
) => {
  const { initialEntries = [], route, ...rest } = options;
  const history = createMemoryHistory({ initialEntries });

  const rtl = render(ui, {
    wrapper: ({ children }) => <Providers route={route}>{children}</Providers>,
    ...rest,
  });

  return {
    ...rtl,
    rerender: (UI: React.ReactElement, rerenderOptions?: ProviderOptions) =>
      renderWithProviders(UI, {
        container: rtl.container,
        ...options,
        ...rerenderOptions,
      }),
    history,
  };
};

export { screen } from '@testing-library/react';

export { renderWithProviders as render, userEvent as user };
