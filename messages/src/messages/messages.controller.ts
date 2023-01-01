import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
    @Get()
    listMessages() {

    }
    @Post()
    createMessages (@Body() body:any) { // request body를 추출해서 body라는 변수에 저장
        console.log(body);
    }
    @Get("/:id")
    getMessage (@Param('id') id:string) {
        console.log(id)
    }
}
