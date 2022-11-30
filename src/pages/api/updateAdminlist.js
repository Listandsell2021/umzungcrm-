import { connectToDatabase } from "./mongodbnew";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

   const {datanew}=req.body
console.log(datanew)
  const todos = await db.collection("Admin").update(
    {"a_id" : datanew.a_id},
    {$set: 
        {
      "sa_id":"sa1",
      "a_id":datanew.a_id,
     //"company_name":,
      "address":datanew.address,
      "token":"123333sddss",
      //"date_registered":"24/11/2022",
      //"avatar":"/images/avatars/4.png",
      "contact":dadatanewta.contact,
      //"currentPlan":"plan2",
      "full_name":datanew.full_name,
      "status":datanew.status,
      "email":datanew.email,
      //"role":"admin",
      "username":datanew.username
    }});
  
  res.status(200).json(todos);
  //await db.close();
}
  