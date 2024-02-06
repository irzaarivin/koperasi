const matrixController = (repositories, data) => {
  const { matrix } = data

  const hello = async (req) => {
    return {
      status: `Hello ${req.params.name}, I'm still here...`
    }
  }

  const createRoom = async (req, res) => {
    const roomName = req.query.roomName;
    const userId = req.query.userId;
    const accessToken = req.query.accessToken;
  
    const client = sdk.createClient({
      baseUrl: 'https://matrix.org',
      accessToken: accessToken,
      userId: userId
    });
  
    client.createRoom({
      room_alias_name: roomName
    }).then((response) => {
      res.send(response);
    }).catch((error) => {
      res.send(error);
    });
  };
  

  const joinRoom = async (roomId) => {
    matrix.joinRoom(roomId).then((response) => {
      return response;
    }).catch((error) => {
      return error;
    });
  };
  
  const getPublicRooms = async () => {
    return new Promise((resolve, reject) => {
      matrix.publicRooms((err, data) => {
        if (err) {
          console.log({err})
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  return { hello, createRoom, joinRoom, getPublicRooms }
}

module.exports = matrixController