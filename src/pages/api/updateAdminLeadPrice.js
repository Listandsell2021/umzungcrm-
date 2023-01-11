import { connectToDatabase } from "./mongodbnew";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const { datanew } = req.body;
 
  const todos = await db.collection("LeadAdmin").update(
    { c_id: datanew.c_id },
    {
      $set: {
        priceby_calculation: datanew.priceby_calculation,
        priceby_admin: datanew.priceby_admin,
        distance_total_price: datanew.distance_total_price,
        floors_total_price: datanew.floors_total_price,
        moving_material_total_price: datanew.moving_material_total_price,
        moving_total_price: datanew.moving_total_price,
        products_total_price: datanew.products_total_price,
        distance: datanew.distance, //change from api

        total_cubic_meter: datanew.total_cubic_meter,
        total_product_services_price: datanew.total_product_services_price,
      },
    }
  );

  res.status(200).json(todos);
  //await db.close();
}
