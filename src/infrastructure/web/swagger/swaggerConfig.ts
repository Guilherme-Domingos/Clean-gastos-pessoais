import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Gestão de Gastos Pessoais',
    version: '1.0.0',
    description: 'Documentação da API para gerenciamento de finanças pessoais',
    contact: {
      name: 'Clean Architecture - Controle Financeiro',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de Desenvolvimento',
    },
  ],
  tags: [
    {
      name: 'Transactions',
      description: 'Operações relacionadas a transações financeiras'
    },
    {
      name: 'Users',
      description: 'Operações relacionadas a usuários'
    },
    {
      name: 'Categories',
      description: 'Operações relacionadas a categorias'
    },
    {
      name: 'Monthly Goals',
      description: 'Operações relacionadas a metas mensais'
    }
  ],
  components: {
    schemas: {
      // Schemas para Transactions
      CreateTransactionInput: {
        type: 'object',
        required: ['date', 'amount', 'description', 'type', 'userId'],
        properties: {
          date: {
            type: 'string',
            format: 'date-time',
            example: '2025-06-03T00:00:00.000Z',
            description: 'Data da transação',
          },
          amount: {
            type: 'number',
            format: 'float',
            example: 100.50,
            description: 'Valor da transação',
          },
          description: {
            type: 'string',
            example: 'Compra no supermercado',
            description: 'Descrição da transação',
          },
          type: {
            type: 'string',
            enum: ['RECEITA', 'DESPESA'],
            example: 'DESPESA',
            description: 'Tipo da transação (receita ou despesa)',
          },
          sender: {
            type: 'string',
            example: 'Supermercado ABC',
            description: 'Remetente ou destinatário da transação',
          },
          userId: {
            type: 'string',
            example: 'abc123',
            description: 'ID do usuário associado à transação',
          },
          categoryId: {
            type: 'integer',
            example: 1,
            description: 'ID da categoria da transação (opcional)',
          },
        },
      },
      CreateTransactionOutput: {
        type: 'object',
        properties: {
          data: {
            type: 'string',
            example: 'abc123-456def',
            description: 'ID da transação criada',
          },
          message: {
            type: 'string',
            example: 'Transaction created successfully',
            description: 'Mensagem de sucesso',
          },
        },
      },
      Transaction: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'ID da transação',
          },
          date: {
            type: 'string',
            format: 'date-time',
            description: 'Data da transação',
          },
          amount: {
            type: 'number',
            format: 'float',
            description: 'Valor da transação',
          },
          description: {
            type: 'string',
            description: 'Descrição da transação',
          },
          type: {
            type: 'string',
            enum: ['RECEITA', 'DESPESA'],
            description: 'Tipo da transação (receita ou despesa)',
          },
          sender: {
            type: 'string',
            description: 'Remetente ou destinatário da transação',
          },
          userId: {
            type: 'string',
            description: 'ID do usuário associado à transação',
          },
          categoryId: {
            type: 'integer',
            description: 'ID da categoria da transação',
          },
        },
      },
      
      DeleteTransactionOutput: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true,
            description: 'Indica se a exclusão foi bem-sucedida',
          },
          message: {
            type: 'string',
            example: 'Transação com ID abc123 deletada com sucesso',
            description: 'Mensagem de confirmação',
          },
          deletedId: {
            type: 'string',
            example: 'abc123',
            description: 'ID da transação excluída (opcional)',
          },
        },
      },
      
      // Schemas para Users
      CreateUserInput: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: {
            type: 'string',
            example: 'João Silva',
            description: 'Nome do usuário',
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'joao@example.com',
            description: 'Email do usuário',
          },
          password: {
            type: 'string',
            format: 'password',
            example: 'senha123',
            description: 'Senha do usuário',
          },
        },
      },
      CreateUserOutput: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'user-123',
            description: 'ID do usuário criado',
          },
          message: {
            type: 'string',
            example: 'User created successfully',
            description: 'Mensagem de sucesso',
          },
        },
      },
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'ID do usuário',
          },
          name: {
            type: 'string',
            description: 'Nome do usuário',
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'Email do usuário',
          },
        },
      },
      
      // Schemas para Categories
      CreateCategoryInput: {
        type: 'object',
        required: ['name', 'userId'],
        properties: {
          name: {
            type: 'string',
            example: 'Alimentação',
            description: 'Nome da categoria',
          },
          userId: {
            type: 'string',
            example: 'user-123',
            description: 'ID do usuário proprietário da categoria',
          },
        },
      },
      CreateCategoryOutput: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 1,
            description: 'ID da categoria criada',
          },
          message: {
            type: 'string',
            example: 'Category created successfully',
            description: 'Mensagem de sucesso',
          },
        },
      },
      Category: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'ID da categoria',
          },
          name: {
            type: 'string',
            description: 'Nome da categoria',
          },
          userId: {
            type: 'string',
            description: 'ID do usuário proprietário da categoria',
          },
        },
      },
      
      // Schemas para Monthly Goals
      CreateMonthlyGoalInput: {
        type: 'object',
        required: ['valorLimite', 'mes', 'ano', 'userId'],
        properties: {
          valorLimite: {
            type: 'number',
            format: 'float',
            example: 1500.00,
            description: 'Valor limite para gastos no mês',
          },
          mes: {
            type: 'integer',
            example: 6,
            description: 'Mês da meta (1-12)',
          },
          ano: {
            type: 'integer',
            example: 2025,
            description: 'Ano da meta',
          },
          userId: {
            type: 'string',
            example: 'user-123',
            description: 'ID do usuário dono da meta',
          },
        },
      },
      CreateMonthlyGoalOutput: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 1,
            description: 'ID da meta mensal criada',
          },
          message: {
            type: 'string',
            example: 'Monthly goal created successfully',
            description: 'Mensagem de sucesso',
          },
        },
      },
      MonthlyGoal: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'ID da meta mensal',
          },
          valorLimite: {
            type: 'number',
            format: 'float',
            description: 'Valor limite para gastos no mês',
          },
          mes: {
            type: 'integer',
            description: 'Mês da meta (1-12)',
          },
          ano: {
            type: 'integer',
            description: 'Ano da meta',
          },
          userId: {
            type: 'string',
            description: 'ID do usuário dono da meta',
          },
        },
      },
      
      // Schemas para erro
      Error: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            description: 'Mensagem de erro',
          },
          details: {
            type: 'string',
            description: 'Detalhes do erro (quando disponíveis)',
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./src/infrastructure/web/express/routers/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
