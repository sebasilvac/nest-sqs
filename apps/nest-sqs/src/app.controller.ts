import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SendMessageDto } from './dto/send-message.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/send')
  send(@Body() body: SendMessageDto) {
    this.appService.sendMessage(
      {
        message: body.message,
        date: new Date().toISOString(),
      },
      body.group_id,
    );
  }
}
