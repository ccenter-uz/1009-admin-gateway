import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CONFIG_SERVICES_RMQ_TOKEN, ServicesRmqConfig } from '../config/app.config';


export const ADMIN_CLIENT = 'ADMIN_CLIENT';

export const adminClientProvider: FactoryProvider = {
  provide: ADMIN_CLIENT,
  useFactory: async (configService: ConfigService) => {
    const rmqConfig = configService.get<ServicesRmqConfig>(CONFIG_SERVICES_RMQ_TOKEN);

    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${rmqConfig.config.login}:${rmqConfig.config.password}@${rmqConfig.config.host}:${rmqConfig.config.port}`,
        ],
        queue: rmqConfig.admin.queueName,
        queueOptions: {
          durable: true,
        },
      },
    });
  },
  inject: [ConfigService],
};
