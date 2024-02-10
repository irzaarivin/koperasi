const itemRoutes = require('./routes/item-route');
const transactionRoutes = require('./routes/transaction-route');

const routes = async (app, controllers) => {
  const { itemsController, transactionController } = await controllers

  app.use('/item', await itemRoutes(itemsController));
  app.use('/transaction', await transactionRoutes(transactionController));

  return app;
};

module.exports = routes;
