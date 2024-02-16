const itemRoutes = require('./routes/item-route');
const transactionRoutes = require('./routes/transaction-route');
const scheduleRoutes = require('./routes/schedule-route');

const routes = async (app, controllers) => {
  const { itemsController, transactionController, scheduleController } = await controllers

  app.use('/item', await itemRoutes(itemsController));
  app.use('/transaction', await transactionRoutes(transactionController));
  app.use('/schedule', await scheduleRoutes(scheduleController));

  return app;
};

module.exports = routes;
