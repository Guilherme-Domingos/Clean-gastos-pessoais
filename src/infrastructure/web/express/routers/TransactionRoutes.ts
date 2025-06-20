import { Router, Request, Response } from "express";
import { ContainerFactory } from "../../../../app/ContainerFactory";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

/** * @swagger
 * /transaction:
 *   post:
 *     summary: Cria uma nova transação
 *     description: Cria uma nova transação financeira (receita ou despesa)
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
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
router.post('/transaction', authMiddleware, (req, res) => ContainerFactory.createContainer().transactionController.handleCreateTransaction(req, res));

/** * @swagger
 * /transaction/{id}:
 *   delete:
 *     summary: Deleta uma transação
 *     description: Remove uma transação financeira existente pelo seu ID
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
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
router.delete('/transaction/:id', authMiddleware,(req: Request, res: Response) => ContainerFactory.createContainer().transactionController.handleDeleteTransaction(req, res));

/** * @swagger
 * /transaction:
 *   get:
 *     summary: Lista todas as transações
 *     description: Retorna uma lista com todas as transações financeiras cadastradas
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Lista de transações obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ListTransactionOutput'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/transaction', authMiddleware,(req: Request, res: Response) => ContainerFactory.createContainer().transactionController.handleListTransactions(res));

/** * @swagger
 * /transaction/{id}:
 *   put:
 *     summary: Atualiza uma transação
 *     description: Atualiza os dados de uma transação financeira existente pelo seu ID
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da transação a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTransactionInput'
 *     responses:
 *       200:
 *         description: Transação atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateTransactionOutput'
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
router.put('/transaction/:id', authMiddleware, (req: Request, res: Response) => ContainerFactory.createContainer().transactionController.handleUpdateTransaction(req, res));

/** * @swagger
 * /transaction/{id}:
 *   get:
 *     summary: Busca uma transação pelo ID
 *     description: Retorna os detalhes de uma transação específica pelo seu ID
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da transação a ser consultada
 *     responses:
 *       200:
 *         description: Transação encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionDetail'
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
router.get('/transaction/:id', authMiddleware, (req: Request, res: Response) => ContainerFactory.createContainer().transactionController.handleFindTransaction(req, res));

/** * @swagger
 * /user/{userId}/transactions:
 *   get:
 *     summary: Busca todas as transações de um usuário
 *     description: Retorna uma lista com todas as transações financeiras de um usuário específico
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário para buscar suas transações
 *     responses:
 *       200:
 *         description: Transações encontradas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserTransactions'
 *       404:
 *         description: Usuário não encontrado ou sem transações
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
router.get('/user/:userId/transactions', authMiddleware, (req: Request, res: Response) => ContainerFactory.createContainer().transactionController.handleFindUserTransactions(req, res));

/** * @swagger
 * /user/{userId}/transactions/{year}/{month}:
 *   get:
 *     summary: Busca as transações mensais de um usuário
 *     description: Retorna uma lista com todas as transações financeiras de um usuário em um mês específico, incluindo um resumo financeiro mensal
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário para buscar suas transações
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: Ano das transações (ex. 2025)
 *       - in: path
 *         name: month
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *         description: Mês das transações (1-12)
 *     responses:
 *       200:
 *         description: Transações mensais encontradas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserTransactionsByMonth'
 *       404:
 *         description: Usuário não encontrado ou sem transações no período especificado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: Parâmetros inválidos (mês ou ano)
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
router.get('/user/:userId/transactions/:year/:month', authMiddleware, (req: Request, res: Response) => ContainerFactory.createContainer().transactionController.handleFindUserTransactionsByMonth(req, res));

/** * @swagger
 * /user/{userId}/transactions/totals-by-category:
 *   get:
 *     summary: Busca os totais de transações por categoria
 *     description: Retorna os totais de transações agrupados por categoria para um usuário específico, filtrados por tipo (RECEITA ou DESPESA)
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário para buscar suas transações
 *       - in: query
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [RECEITA, DESPESA]
 *         description: Tipo de transação (RECEITA ou DESPESA)
 *     responses:
 *       200:
 *         description: Totais por categoria encontrados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totals:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       categoryId:
 *                         type: integer
 *                         example: 1
 *                         description: ID da categoria
 *                       categoryName:
 *                         type: string
 *                         example: "Alimentação"
 *                         description: Nome da categoria
 *                       total:
 *                         type: number
 *                         format: float
 *                         example: 1500.75
 *                         description: Valor total das transações nesta categoria
 *       400:
 *         description: Parâmetros inválidos
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
router.get('/user/:userId/transactions/totals-by-category', authMiddleware, (req: Request, res: Response) => ContainerFactory.createContainer().transactionController.handleGetTransactionTotalsByCategory(req, res));

export default router;