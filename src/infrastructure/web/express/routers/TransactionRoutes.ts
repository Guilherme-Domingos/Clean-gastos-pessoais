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

export default router;