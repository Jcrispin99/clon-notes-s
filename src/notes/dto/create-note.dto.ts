import { IsString, Max, MaxLength } from "class-validator";

export class CreateNoteDto {
    @IsString()
    @MaxLength(50)
    title: string;

    @IsString()
    content: string;

    @IsString()
    userId: string;
}
