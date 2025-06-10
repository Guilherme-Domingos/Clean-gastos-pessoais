import { Router, Request, Response } from "express";
import { ContainerFactory } from "../../../../app/ContainerFactory";

const router = Router();

/**
 * @swagger
 * /transaction:
 *   post:
 *     summary: Cria uma nova transação
 *     description: Cria uma nova transação financeira (receita ou despesa)
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTransactionInput'
 *     responses:
 *       201:
 *         description: Transação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateTransactionOutput'
 *       400:
 *         description: Dados inválidos na requisição
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/transaction', (req, res) => ContainerFactory.createContainer().transactionController.handleCreateTransaction(req, res));

/**
 * @swagger
 * /transaction/{id}:
 *   delete:
 *     summary: Deleta uma transação
 *     description: Remove uma transação financeira existente pelo seu ID
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da transação a ser excluída
 *     responses:
 *       201:
 *         description: Transação deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteTransactionOutput'
 *       404:
 *         description: Transação não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/transaction/:id', (req: Request, res: Response) => ContainerFactory.createContainer().transactionController.handleDeleteTransaction(req, res));

export default router;