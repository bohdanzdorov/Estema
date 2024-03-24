declare global {
    namespace NodeJS {
      interface ProcessEnv {
        [key: string]: string | undefined;
        PORT: string;
        DB_CONNECTION_STRING: string;
        TRANSLATION_KEY: string;
      }
    }
  }