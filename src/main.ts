import TransactionRoutes from './infrastructure/web/express/routers/TransactionRoutes';
import UserRoutes from './infrastructure/web/express/routers/UserRoutes';
import { ApiExpress } from './infrastructure/web/express/ApiExpress';
// Importa a documentação do Swagger apenas para registrar no JSDoc
import './infrastructure/web/swagger/swagger-routes-docs';

function main() {
    const routers = [TransactionRoutes, UserRoutes];
    const apiExpress = new ApiExpress(routers);

    const PORT = process.env.PORT || 3000;
    apiExpress.start(Number(PORT));
    
    console.log(`Documentação disponível em: http://localhost:${PORT}/api-docs`);
}

main();