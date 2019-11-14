import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
    // tao ra 1 bien 
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ]

    transform(value: any ){
        value = value.toUpperCase();        
        if(!this.isStatusValid(value)){
            throw new BadRequestException(`${ value} is an invalid status`)
        }
        return value
    }

    
    private isStatusValid(status: any){
        const idx = this.allowedStatuses.indexOf(status);    
        return idx !== -1;  //cai nay la so sanh idx voi -1. neu != -1 => tra ve true, nguoc lai la false
    }
}