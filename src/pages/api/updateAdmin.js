import { connectToDatabase } from "./mongodbnew";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

   const {datanew}=req.body

  const todos = await db.collection("Admin").update(
    {"a_id" : datanew.a_id},
    {$set: 
        {
        "sa_id":storedData.sa_id,
        "a_id":storedData.id,
        "address":datanew.address,
        "token":datanew.token,
        "date_registered":datanew.date_registered,
        "avatar":datanew.avatar,
        "contact":datanew.phone,
        "currentPlan":datanew.cplan,
        "full_name":datanew.fullName,
        "role":datanew.role,
        "status":datanew.status,
        "email":datanew.email,
        "username":datanew.email}});
  
  res.status(200).json(todos);
  //await db.close();
}