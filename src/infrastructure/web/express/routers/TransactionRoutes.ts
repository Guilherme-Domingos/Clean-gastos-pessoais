import { Router, Request, Response } from "express";
import { ContainerFactory } from "../../../../app/ContainerFactory";

const router = Router();

// // Ajustando para usar uma função handler separada
// const createTransactionHandler = async (req: Request, res: Response) => {
//     const transactionController = ContainerFactory.createContainer().transactionController;
//     return transactionController.handleCreateTransaction(req, res);
// };

// // Registrando o handler na rota
// router.post('/transaction', createTransactionHandler);

router.post('/transaction', (req, res) => ContainerFactory.createContainer().transactionController.handleCreateTransaction(req, res));

export default router;