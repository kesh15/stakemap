declare module 'pg' {
  export class Pool {
    constructor(config?: {
      connectionString?: string;
      user?: string;
      password?: string;
      host?: string;
      port?: number;
      database?: string;
      ssl?: boolean | object;
      max?: number;
      idleTimeoutMillis?: number;
      connectionTimeoutMillis?: number;
    });
    connect(): Promise<any>;
    query(text: string, params?: any[]): Promise<any>;
    end(): Promise<void>;
  }
}
