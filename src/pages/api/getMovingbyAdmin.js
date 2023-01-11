import { connectToDatabase } from "./mongodbnew";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const { ids } = req.body;
  //console.log("test")
 
  const todos = await db
    .collection("MovingMaterialsAdmins")
    .find({ a_id: ids.id })
    .toArray();

  res.status(200).json(todos);
  //await db.close();
}
