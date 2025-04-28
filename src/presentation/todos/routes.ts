import { Router } from "express";
import { TodosController } from "./controller";


export class TodoRoutes{

    static get routes(): Router{

        const router = Router ();
        const todoController = new TodosController();
        
        router.get('/', todoController.getTodos);
        router.get('/:id', todoController.getTodoByOId);
        router.post('/', todoController.createTodo);
        router.post('/:id', todoController.updateTodo);
        router.post('/:id', todoController.deleteTodo);




  

        return router;
    }

}