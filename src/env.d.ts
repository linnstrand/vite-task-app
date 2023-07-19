/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly EXTERNAL_API: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Dayjs {
  isToday();
}
