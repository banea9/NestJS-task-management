import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform{
    readonly allowedStatuses = [
        TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE
    ]
    transform(value : string) { 
        value = value.toUpperCase()
        if(!this.isStatusValid(value)) {
            throw new BadRequestException("Status value is invalid");
        }
        return value 
    }

    private isStatusValid(status: any) {
        const index = this.allowedStatuses.indexOf(status);
        return index !== -1
    }
}