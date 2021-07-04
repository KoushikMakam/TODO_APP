export const MONGO_CONNECTION = process.env.MONGO_CONNECTION ?? 'mongodb://localhost:27018/todo';
export const USER_SERVICE_HOST = process.env.USER_SERVICE_HOST ?? '0.0.0.0';
export const USER_SERVICE_PORT = process.env.USER_SERVICE_PORT ?? 3001;
export const USER_WEB_SERVICE_PORT = process.env.USER_SERVICE_PORT ?? 3004;