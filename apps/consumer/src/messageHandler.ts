import { Injectable } from '@nestjs/common';
import { SqsConsumerEventHandler, SqsMessageHandler } from '@ssut/nestjs-sqs';
import { config } from '../../config';
import { Message } from '@aws-sdk/client-sqs';

@Injectable()
export class MessageHandler {
  constructor() {}

  @SqsMessageHandler(config.TEST_QUEUE, false)
  async handleMessage(message: Message) {
    const obj: any = JSON.parse(message.Body) as {
      message: string;
      date: string;
    };

    console.log('data', obj.message);
  }

  @SqsConsumerEventHandler(config.TEST_QUEUE, 'processing_error')
  public onProcessingError(error: Error, message: Message) {
    console.error('Error', error);
    console.error('Message', message);
  }
}
