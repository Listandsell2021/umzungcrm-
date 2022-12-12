import { connectToDatabase } from "./mongodbnew";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

   const {datanew}=req.body
   
  const todos = await db.collection("Manager").update(
    {"m_id" : datanew.m_id},
    {$set: 
        {
       "sa_id":"sa1",
      
      "email":datanew.email,
      "email_verification":"gjhgf67gsf",
      "registered_date":"10/11/2022",
      "avatar":"/images/avatars/4.png",
      "role":datanew.role,
      "status":datanew.status,
      "full_name":datanew.full_name,
      "password":datanew.password
    }});

    await db.collection("Login").update(
    {"global_id" : datanew.m_id},
    {$set: 
        {
      "email":datanew.email,
      "role":datanew.role,
      "status":datanew.status,
      
      "password":datanew.password
    }});
  //res.status(200).json(todos2)
  res.status(200).json(todos);
  //await db.close();
}
  