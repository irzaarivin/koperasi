const itemRoutes = require('./routes/item-route');

const routes = async (app, controllers) => {
  const { itemsController } = await controllers

  app.use('/items', await itemRoutes(itemsController));

  return app;
};

module.exports = routes;
