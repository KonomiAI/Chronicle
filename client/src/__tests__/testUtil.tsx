import React, { Suspense } from 'react';

import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material';
import type { InitialEntry, MemoryHistory } from 'history';
import { createMemoryHistory } from 'history';
import { Route, Router, Routes } from 'react-router-dom';
import finalTheme from '../theme';

export const cache = new Map();

const ThemeModeProvider = ({ children }: any) => (
  <ThemeProvider theme={finalTheme}>{children}</ThemeProvider>
);

export interface ProviderOptions extends RenderOptions {
  initialEntries?: Array<InitialEntry>;
  route?: string;
}

interface ProvidersProps extends ProviderOptions {
  children: React.ReactNode;
  history: MemoryHistory;
}

const Providers = ({ children, history, route }: ProvidersProps) => {
  let Wrapper = (
    <Suspense fallback={null}>
      <ThemeModeProvider>{children}</ThemeModeProvider>
    </Suspense>
  );

  if (route) {
    Wrapper = (
      <Router location={history!.location} navigator={history!}>
        <Routes>
          <Route element={Wrapper} path={route} />
        </Routes>
      </Router>
    );
  }

  return Wrapper;
};

const renderWithProviders = (
  ui: React.ReactElement,
  options: ProviderOptions = {},
) => {
  const { initialEntries = [], route, ...rest } = options;
  const history = createMemoryHistory({ initialEntries });

  const rtl = render(ui, {
    wrapper: ({ children }) => (
      <Providers history={history} route={route}>
        {children}
      </Providers>
    ),
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
