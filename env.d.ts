/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'lodash-es' {
  import lodash from 'lodash'
  export = lodash
  export as namespace _
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_API_BASE_URL: string
  readonly VITE_APP_VERSION: string
  readonly VITE_APP_BUILD_TIME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 