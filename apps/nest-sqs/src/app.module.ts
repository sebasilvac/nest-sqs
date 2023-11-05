import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { SqsModule } from '@ssut/nestjs-sqs';
import { SQSClient } from '@aws-sdk/client-sqs';
import { config } from '../../config';

@Module({
  imports: [
    SqsModule.register({
      consumers: [],
      producers: [
        {
          name: config.TEST_QUEUE, // name of the queue
          queueUrl: config.TEST_QUEUE_URL,
          region: config.AWS_REGION, // url of the queue
          sqs: new SQSClient({
            region: config.AWS_REGION,
            credentials: {
              accessKeyId: config.ACCESS_KEY_ID,
              secretAccessKey: config.SECRET_ACCESS_KEY,
            },
          }),
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
