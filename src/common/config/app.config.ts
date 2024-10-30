import { registerAs } from '@nestjs/config';
import * as process from 'process';

export const CONFIG_APP_TOKEN = 'app';
export const CONFIG_SERVICES_RMQ_TOKEN = 'services-rmq';

export const servicesRmqConfig = registerAs(
  CONFIG_SERVICES_RMQ_TOKEN,
  (): ServicesRmqConfig => ({
    ADMIN: {
      queueName: process.env.ADMIN_RMQ_QUEUE_NAME || 'admin',
      exchangeName: process.env.ADMIN_RMQ_EXCHANGE_NAME || 'admin',
    },
    ORGANIZATION: {
      queueName: process.env.ORGANIZATION_RMQ_QUEUE_NAME || 'organization',
      exchangeName:
        process.env.ORGANIZATION_RMQ_EXCHANGE_NAME || 'organization',
    },
    CONFIG: {
      host: process.env.RMQ_HOST || 'localhost',
      port: parseInt(process.env.RMQ_PORT) || 5672,
      login: process.env.RMQ_LOGIN || 'guest',
      password: process.env.RMQ_PASSWORD || 'guest',
    },
  })
);

export type ServicesRmqConfig = {
  ADMIN: Pick<RMQConfig, 'queueName' | 'exchangeName'>;
  ORGANIZATION: Pick<RMQConfig, 'queueName' | 'exchangeName'>;
  CONFIG: Omit<RMQConfig, 'queueName' | 'exchangeName'>;
};

export type RMQConfig = {
  exchangeName: string;
  queueName: string;
  login: string;
  password: string;
  host: string;
  port: number;
};

export const appConfig = registerAs(
  CONFIG_APP_TOKEN,
  (): AppConfig => ({
    host: process.env.APP_HOST || '0.0.0.0',
    port: parseInt(process.env.APP_PORT) || 3000,
    cors_domains: process.env.CORS_DOMAINS || '*',
  })
);

export type AppConfig = {
  host: string;
  port: number;
  cors_domains: string;
};