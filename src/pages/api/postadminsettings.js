import { connectToDatabase } from "./mongodbnew";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const { datasettings } = req.body;

  // Send all the todos

  const theme = await db.collection("datasettings").insertOne(datasettings);

  res.status(200).json(theme);
  //await db.close();
}
