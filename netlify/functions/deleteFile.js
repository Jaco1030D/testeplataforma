// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// var serviceAccount = require("./serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// const storage = admin.storage();


export default async (req) => {
    const { next_run } = await req.json()

    console.log("Received event! Next invocation at:", next_run)
}

export const config = {
    schedule: "@hourly"
}
// exports.scheduleTask = functions.pubsub.schedule('every 24 hours').onRun(async (context) => {
//     try {

//         const allArchives = [];
        
//         const snapshot = await admin.firestore().collection('archives').get();
        
//         snapshot.forEach(doc => {
//             const archiveNames = doc.data().names || [];
//             allArchives.push(...archiveNames);
//         });

//         console.log('Array allArchives:', allArchives);

//         const [files] = await storage.bucket('gs://teste-d64ce.appspot.com').getFiles();

//         // console.log(files);

//         const storageFileNames = files.map(file => file.name);

//         console.log(storageFileNames);

//         await Promise.all(storageFileNames.map(async fileName => {
//             if (!allArchives.includes(fileName)) {
//                 await storage.bucket('gs://teste-d64ce.appspot.com').file(fileName).delete();
//                 console.log(`Arquivo ${fileName} excluído.`);
//             }
//         }));
        

//         return null;
//     } catch (error) {
//         console.error('Erro ao agendar a tarefa:', error);
//         throw new functions.https.HttpsError('unknown', 'Erro ao agendar a tarefa');
//     }
// });

// exports.handler = async (event, context) => {

//     try {

       

//         return{
//             statusCode: 200
//         }
//     } catch (error) {
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ error: error.message }),
//         };
//     }

    

// }
