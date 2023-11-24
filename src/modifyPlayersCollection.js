import { MongoClient } from 'mongodb';

const url = 'mongodb+srv://FacundoECruz:Foucault_22@cluster0.dv3q3d9.mongodb.net/?retryWrites=true&w=majority'; // Cambia la URL de conexión según tu configuración
const dbName = 'test';

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function updateDocuments() {
  try {
    await client.connect();

    const db = client.db(dbName);
    const playersCollection = db.collection('players');

    await playersCollection.updateMany(
      {},
      {
        $set: {
          createdBy: "Facu",
          createdDate: new Date().getTime(),
        },
      }
    );

    console.log('Documentos actualizados correctamente');
  } finally {
    await client.close();
  }
}

updateDocuments();
