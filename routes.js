const routes = async (app, controllers) => {
  const { itemsController } = await controllers
  const { getAll, getById } = await itemsController

  app.post('/items/create', async (req, res) => {
    const data = req.body
    res.send(await getAll(data))
  })

  // app.get('/', async (req, res) => {
  //   try {
  //     const publicRooms = await matrixController.getPublicRooms();
  //     res.json(publicRooms);
  //   } catch (error) {
  //     res.status(500).send({error});
  //   }
  // })

  // app.get('/:name', async (req, res) => {
  //   const result = await matrixController.hello(req)
  //   res.send(result);
  // })

  // app.get('/createRoom/:roomName', async (req, res) => {
  //   const roomName = req.params.roomName;
  
  //   await matrixController.createRoom({
  //     room_alias_name: roomName
  //   }).then((response) => {
  //     res.send(response);
  //   }).catch((error) => {
  //     res.send(error);
  //   });

  // });

  // app.get('/joinRoom/:roomId', async (req, res) => {
  
  //   await matrixController.joinRoom(req.params.roomId).then((response) => {
  //     res.send(response);
  //   }).catch((error) => {
  //     res.send(error);
  //   });

  // });

  return app;
};

module.exports = routes;
