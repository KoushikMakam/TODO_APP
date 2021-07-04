export const GATEWAY_SERVICE_PORT= process.env.GATEWAY_SERVICE_PORT ?? 8080;

export const MONGO_CONNECTION = process.env.MONGO_CONNECTION ?? 'mongodb://localhost:27018/todo';
export const TODO_SERVICE_PORT= process.env.TODO_SERVICE_PORT ?? 3000;
export const TODO_SERVICE_HOST= process.env.TODO_SERVICE_HOST ?? '0.0.0.0';
export const ENABLE_CRON = process.env.ENABLE_CRON ?? true;
export const CRON_TIME = process.env.CRON_TIME ?? '10 * * * * *'