import { Controller, Get, Post, Body, Param, Query, Delete, Patch, 
         UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task} from './task.entity';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {
    constructor(
        private readonly tasksService: TasksService
    ){}

    @Get()   // ValidationPipe day la những pipes mặc định đã khai báo trong get-task-filter.dto.ts                
    @UsePipes(ValidationPipe)   
    getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {            
       return this.tasksService.getTasks(filterDto)    
    }

    // @Get()   // ValidationPipe day la những pipes mặc định đã khai báo trong get-task-filter.dto.ts                
    // @UsePipes(ValidationPipe)   
    // getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {            
    //     if(Object.keys(filterDto).length){
    //         return this.tasksService.getTasksFilterDto(filterDto)
    //     }else {
    //         return this.tasksService.getAllTasks();
    //     }        
    // }

    @Get(':id')
    getTaskById(@Param('id', ParseIntPipe ) id): Promise<Task> {
        return this.tasksService.getTaskById(id)
    }

    @Post()
    @UsePipes(ValidationPipe)   //sử dụng pipes de validation
    createTask(@Body() createTaskDto: CreateTaskDto ): Promise<Task> {   
        return this.tasksService.createTask( createTaskDto)
    }

    @Delete(':id')
    delelteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.tasksService.deleteTask(id)
    }

    @Patch('/:id/status')//su dung TaskStatusValidationPipe de validation status truoc khi gui den services    
    updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus  
    ): Promise<Task> {        
        return this.tasksService.updateTaskStatus(id, status)
    }


}
