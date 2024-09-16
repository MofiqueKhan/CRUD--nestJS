import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService : TaskService){}

    @Get()
    getAllTasks(){
        return this.taskService.findAll()
    }

    @Get(':id')
    getTaskById(@Param('id') id:number){
        return this.taskService.findOne(id)
    }

    @Post()
    createTask(@Body() task: Task){
        return this.taskService.create(task)
    }

    @Put(':id')
    updateTask(@Param('id') id: number, @Body() updatedTask: Task) {
      return this.taskService.update(id, updatedTask);
    }

    @Patch(':id')
    patchTask(@Param('id') id: number, @Body() partialTask: Partial<Task>) {
      return this.taskService.partialUpdate(id, partialTask);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: number) {
      return this.taskService.delete(id);
    }
}
