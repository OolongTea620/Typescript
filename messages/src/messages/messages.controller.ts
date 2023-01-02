import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { CreateMessgeDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';
@Controller('messages')
export class MessagesController {
    constructor (public messagesService: MessagesService) {}

    @Get()
    listMessages() {
        return this.messagesService.findAll();
    }

    @Post()
    createMessage(@Body() body:CreateMessgeDto) {
        // request body를 추출해서 body라는 변수에 저장
        return this.messagesService.create(body.content);
    }

    @Get("/:id")
    async getMessage (@Param('id') id:string) {
        const message = await this.messagesService.findOne(id);

        if(!message) {
            throw new NotFoundException("message no found")
        }
        return message;
    }
}
