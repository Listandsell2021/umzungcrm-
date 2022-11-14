import { connectToDatabase } from "./mongodbnew";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

   const {datanew}=req.body
   //console.log("test")
 console.log(datanew)
  const todos = await db.collection("Products").update({"p_id" : datanew.p_id},{$set: {"sa_id":datanew.sa_id,"a_id":datanew.a_id,"tittle":datanew.tittle,"descriptions ":datanew.descriptions,"price":datanew.price,"size":{"length":datanew.length,"breath":datanew.breath,"height":datanew.height,"cubic_meter":datanew.cubic_meter},"avatar":"/images/avatars/4.png","status":datanew.status}});
   console.log(todos)
  res.status(200).json(todos);
  //await db.close();
}