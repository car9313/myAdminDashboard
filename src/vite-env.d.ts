/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string; // Define otras variables aquí si las necesitas
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/*Esto extiende los tipos de import.meta para que incluyan las variables de entorno específicas de Vite. */
