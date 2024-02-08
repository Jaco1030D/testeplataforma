// const functions = require('firebase-functions');
const admin = require('firebase-admin');
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const storage = admin.storage();


export default async (req) => {
    const { next_run } = await req.json()

    console.log("Received event! Next invocation at:", next_run)

    try {

        const allArchives = [];
        
        const snapshot = await admin.firestore().collection('archives').get();
        
        snapshot.forEach(doc => {
            const archiveNames = doc.data().names || [];

            if (doc.data()?.namesTranslated?.length > 0) {
                const translatedNames = doc.data().namesTranslated

                allArchives.push(...translatedNames)
            }
            allArchives.push(...archiveNames);
        });

        // console.log('Array allArchives:', allArchives);

        const [files] = await storage.bucket('gs://teste-d64ce.appspot.com').getFiles();

        // console.log(files);

        const storageFileNames = files.map(file => file.name);

        console.log(storageFileNames);

        await Promise.all(storageFileNames.map(async fileName => {
            if (!allArchives.includes(fileName)) {
                await storage.bucket('gs://teste-d64ce.appspot.com').file(fileName).delete();
                console.log(`Arquivo ${fileName} excluído.`);
            }
        }));
        

        return null;
    } catch (error) {
        console.error('Erro ao agendar a tarefa:', error);
    }

    return{
        statusCode: 200
    }


}

export const config = {
    schedule: "@hourly"
}

// exports.handler = async (event, context) => {

//     try {

        
//     } catch (error) {
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ error: error.message }),
//         };
//     }

    

// }
