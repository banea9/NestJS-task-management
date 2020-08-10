import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';

const mockUser = { username : "Test user"};

const mockTaskRepository = () => ({
    getTasks: jest.fn(),
})

describe('Task service tests', () => {
    let tasksService;
    let taskRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                TasksService, {provide: TaskRepository, useFactory: mockTaskRepository }
            ] 
        }).compile()

        tasksService = await module.get<TasksService>(TasksService);
        taskRepository = await module.get<TaskRepository>(TaskRepository);
    })

    describe("test getTasks functionality", () => {
        it("gets all tasks from repository", async () => {
            taskRepository.getTasks.mockResolvedValue('some value')

            expect(taskRepository.getTasks).not.toHaveBeenCalled()
            const filters: GetTasksFilterDto = {status : TaskStatus.IN_PROGRESS, searchTerm: "Something"}
            const result = await tasksService.getTasks(filters, mockUser)
            expect(taskRepository.getTasks).toHaveBeenCalled()
            expect(result).toEqual('some value ')
            
        })
    })
});
