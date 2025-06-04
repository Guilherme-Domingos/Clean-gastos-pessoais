import TransactionRoutes from './infrastructure/web/express/routers/TransactionRoutes';
import { ApiExpress } from './infrastructure/web/express/ApiExpress';
// Importa a documentação do Swagger apenas para registrar no JSDoc
import './infrastructure/web/swagger/swagger-routes-docs';

function main() {
    const apiExpress = new ApiExpress(TransactionRoutes);

    const PORT = process.env.PORT || 3000;
    apiExpress.start(Number(PORT));
    
    console.log(`Documentação disponível em: http://localhost:${PORT}/api-docs`);
}

main();