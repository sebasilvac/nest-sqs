import { Module } from '@nestjs/common';

import { SqsModule } from '@ssut/nestjs-sqs';
import { config } from '../../config';
import { MessageHandler } from './messageHandler';
import { SQSClient } from '@aws-sdk/client-sqs';

@Module({
  imports: [
    SqsModule.register({
      consumers: [
        {
          name: config.TEST_QUEUE, // name of the queue
          queueUrl: config.TEST_QUEUE_URL, // the url of the queue
          region: config.AWS_REGION,
          sqs: new SQSClient({
            region: config.AWS_REGION,
            credentials: {
              accessKeyId: config.ACCESS_KEY_ID,
              secretAccessKey: config.SECRET_ACCESS_KEY,
            },
          }),
        },
      ],
      producers: [],
    }),
  ],
  controllers: [],
  providers: [MessageHandler],
})
export class ConsumerModule {}
