declare module 'process' {
    global {
      namespace NodeJS {
        export interface ProcessEnv {
          BASE_ENV: 'development' | 'test' | 'pre' | 'production'
          NODE_ENV: 'development' | 'production'
        }
      }
    }
  }
  
/* CSS MODULES */
declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.less' {
  const classes: { [key: string]: string };
  export default classes;
}
