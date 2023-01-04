import { connectToDatabase } from "./mongodbnew";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

   const {datanew}=req.body
   console.log(datanew)
  const todos = await db.collection("LeadAdmin").update(
    { c_id: datanew.c_id },
    {
      $set: {
        product_list: datanew.product_list,
      },
    }
  );
  
  res.status(200).json(todos);
  //await db.close();
}
  