

import { connectToDatabase } from "./mongodbnew";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

   const{datanew}=req.body;

  //var datanew={"test":"tett"}
  
   // Send all the todos
  console.log(datanew)
  const theme = await db.collection("Products").insertOne(datanew);
   
  res.status(200).json(theme);
  //await db.close();
}