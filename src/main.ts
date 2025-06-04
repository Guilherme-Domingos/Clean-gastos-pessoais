import TransactionRoutes from './infrastructure/web/express/routers/TransactionRoutes';
import { ApiExpress } from './infrastructure/web/express/ApiExpress';

function main() {
    const apiExpress = new ApiExpress(TransactionRoutes);

    apiExpress.start(3000);
}

main();