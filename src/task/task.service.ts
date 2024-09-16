import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ){}

    findAll(): Promise<Task[]>{
        return this.taskRepository.find()
    }

    findOne(id:number): Promise<Task>{
        return this.taskRepository.findOneBy({id})
    }

    create(task: Task): Promise<Task>{
        return this.taskRepository.save(task)
    }

    async update(id: number, updatedTask: Task): Promise<Task> {
        await this.taskRepository.update(id, updatedTask);
        return this.findOne(id);
    }

    async partialUpdate(id: number, partialTask: Partial<Task>): Promise<Task> {
        await this.taskRepository.update(id, partialTask);
        return this.findOne(id);
    }
    
    async delete(id: number): Promise<void> {
        await this.taskRepository.delete(id);
        return undefined;
    }
    
}
