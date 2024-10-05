import { Controller, Post, Body, UseGuards, Request, Get, HttpException, HttpStatus, Patch, Param, Delete, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './Dtos/create.task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { UpdateTaskDto } from './Dtos/update.task.dto';

@Controller('tasks')
export class TaskController {
    constructor(private taskService: TaskService) {}

    @UseGuards(AuthGuard('jwt')) 
    @Post()
    async createTask(@Body() createTaskDto: CreateTaskDto, @Request() req) {
        const userId = req.user.id;
        return this.taskService.createTask(userId, createTaskDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/mytasks')
    async getAllTasks(@Request() req): Promise<Task[]> {
        const userId = req.user.userId;
        console.log('Fetching tasks for userId:', userId);
        return this.taskService.findAllTasks(userId);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        const taskId = parseInt(id, 10); 
        return await this.taskService.updateTask(taskId, updateTaskDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteTask(@Param('id') id: string) {
        const taskId = parseInt(id, 10); 
        return await this.taskService.deleteTask(taskId); 
    }
}
