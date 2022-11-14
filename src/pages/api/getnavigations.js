import { connectToDatabase } from "./mongodbnew";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

   //const {email,pass}=req.body;

  
  
   // Send all the todos

  const todos = await db.collection("Navigation_crm").find({}).toArray();
  
  res.status(200).json(todos);
  //await db.close();
}