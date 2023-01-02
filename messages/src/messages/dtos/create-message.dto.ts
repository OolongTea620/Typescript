import {IsString} from "class-validator";

export class CreateMessgeDto {
    @IsString()
    content :string;   
}
