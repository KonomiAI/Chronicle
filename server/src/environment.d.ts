declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CHRONICLE_ALLOWED_ORIGINS?: string;
      CHRONICLE_JWT_DURATION?: string;
      CHRONICLE_JWT_SECRET?: string;
      CHRONICLE_IGNORE_FORWARD_HEADERS?: 'YES' | 'NO';
      CHRONICLE_THROTTLE_DURATION?: string;
      CHRONICLE_THROTTLE_MAX_REQUESTS?: string;
      CHRONICLE_DISABLED_THROTTLE?: 'YES' | 'NO';
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
