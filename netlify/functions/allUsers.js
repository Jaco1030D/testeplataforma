var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

exports.handler = async (event, context) => {
  const  body  = JSON.parse(event.body);
  const listAllUsers = () => {
    return new Promise((resolve, reject) => {
      const users = [];
      admin.auth()
        .listUsers()
        .then((listUsersResult) => {
          listUsersResult.users.forEach((userRecord) => {
            users.push({
              uid: userRecord.toJSON().uid,
              name: userRecord.toJSON().displayName,
              email: userRecord.toJSON().email
            });
          });
          // console.log(users);
          resolve({
            statusCode: 200,
            body: JSON.stringify({ users, token: listUsersResult.pageToken }),
          });
        })
        .catch((error) => {
          reject({
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
          });
        });
    });
  };

  try {
    let response

    if (body.token) {
      response = await listAllUsers();
    } else {
      response = await listAllUsers();
    }
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}