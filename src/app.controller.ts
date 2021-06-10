import { Controller, Post, Body } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Controller('api/v1/hello')
export class AppController {
  private clientCnt: ClientProxy;

  constructor() {
    this.clientCnt = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@127.0.0.1:5672/'],
        queue: 'cnt-gateway',
      },
    });
  }

  @Post()
  async postHello(@Body() hello: string) {
    return await this.clientCnt.emit('post-hello', hello);
  }
}
