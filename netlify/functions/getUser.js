var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

exports.handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        const userRecord = await admin.auth().getUser(body.uid);

        return {
            statusCode: 200,
            body: JSON.stringify({ user: userRecord.toJSON() }),
        };
    } catch (error) {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: error.message }),
        };
    }
}