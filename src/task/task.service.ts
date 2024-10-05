import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './Dtos/create.task.dto'; 
import { UpdateTaskDto } from './Dtos/update.task.dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) {}

    async createTask(userId: number, createTaskDto: CreateTaskDto): Promise<Task> {
        const task = this.taskRepository.create({
            ...createTaskDto, 
            userId: userId  
        });
        return this.taskRepository.save(task);
    }

    async findAllTasks(userId: number): Promise<Task[]> {
        console.log('Fetching tasks for userId:', userId);
        return this.taskRepository.find({ where: { userId } });
      }

      async updateTask(id: number, updateTaskDto: UpdateTaskDto):Promise<Task[]> {
        const task = await this.taskRepository.findOne({ where: { id } });
        
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        task.title = updateTaskDto.title;
        task.description = updateTaskDto.description;

        await this.taskRepository.save(task);
        return [task];
    }

    async deleteTask(id: number): Promise<Task> {
        const task = await this.taskRepository.findOne({ where: { id } });
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        await this.taskRepository.remove(task);
        return task;
    }
}
