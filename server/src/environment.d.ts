declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CHRONICLE_SKIP_AUTH?: 'YES' | 'NO';
      CHRONICLE_ALLOWED_ORIGINS?: string;
      CHRONICLE_JWT_DURATION?: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
