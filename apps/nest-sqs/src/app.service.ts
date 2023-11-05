import { Injectable } from '@nestjs/common';
import { SqsService } from '@ssut/nestjs-sqs';
import { config } from '../../config';

@Injectable()
export class AppService {
  constructor(private readonly sqsService: SqsService) {}

  getHello(): string {
    return 'Hello World madafaca !!!!';
  }

  async sendMessage(body: any, groupID: string) {
    const message: any = JSON.stringify(body);
    const ID = Date.now().toString();

    console.log({
      id: ID,
      body: message,
      groupId: groupID,
    });

    try {
      await this.sqsService.send(config.TEST_QUEUE, {
        id: ID,
        body: message,
        groupId: groupID,
        deduplicationId: ID,
        delaySeconds: 0,
      });

      console.log('message sent!');
    } catch (error) {
      console.log('error sending message!', error);
    }
  }
}
