import mongooose from "mongoose";

const conectarDB = async () => {
  try {
    const db = await mongooose.connect(
        process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology:true,
      }
    );

    const url =`${db.connection.host}:${db.connection.port}`
    console.log(`MongoDB conectado en : ${url}`);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};
export default conectarDB;
