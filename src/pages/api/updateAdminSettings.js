import { connectToDatabase } from "./mongodbnew";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const { datanew } = req.body;

  const todos = await db.collection("SettingsAdmin").update(
    { a_id: datanew.a_id },
    {
      $set: {
        sa_id: datanew.sa_id,
        a_id: datanew.a_id,
        genral: {
          logo: datanew.genral.logo,
          phone: datanew.genral.phone,
          address: datanew.genral.address,
          color: {
            primary: datanew.genral.color.primary,
            secondary: datanew.genral.color.secondary,
          },
        },
        email: { smtp_email: datanew.email.smtp_email },
        cost_per_meter_square: datanew.cost_per_meter_square,
        cost_per_km: datanew.cost_per_km,
        cost_per_floor: datanew.cost_per_floor,
        cost_per_walkaway: datanew.cost_per_walkaway,
        cost_walking: datanew.cost_walking,
        cost_item_number24: datanew.cost_item_number24,
        cost_item_number49: datanew.cost_item_number49,
      },
    }
  );

  res.status(200).json(todos);
  //await db.close();
}
