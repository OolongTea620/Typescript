import { Controller, Get } from "@nestjs/common";

@Controller("/app") // {root}/app
export class AppController {
    @Get("/asdf") // {root}/app/asdf
     getRootRoute(){
        return "hi there!";
    }

    @Get("/bye")
    getByeThere () {
        return "bye there"
    }
}

