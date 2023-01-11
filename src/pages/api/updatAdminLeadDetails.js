import { connectToDatabase } from "./mongodbnew";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const { datanew } = req.body;
 
  const todos = await db.collection("LeadAdmin").update(
    { c_id: datanew.c_id },
    {
      $set: {
        from_address: {
          street_name: datanew.from_address.street_name,
          postcode: datanew.from_address.postcode,
          city: datanew.from_address.city,
        },
        to_address: {
          street_name: datanew.to_address.street_name,
          postcode: datanew.to_address.postcode,
          city: datanew.to_address.city,
        },
        from_details: {
          living_type: datanew.from_details.living_type,
          no_stops: datanew.from_details.no_stops,
          living_space: datanew.from_details.living_space,
          persons: datanew.from_details.persons,
          packboxes: datanew.from_details.packboxes,
          floor: datanew.from_details.floor,
          footpath: datanew.from_details.footpath,
          elevator: {
            elevator_type: datanew.from_details.elevator.elevator_type,
            weight: datanew.from_details.elevator.weight,
          },
        },
        to_details: {
          living_type: datanew.to_details.living_type,
          no_stops: datanew.to_details.no_stops,
          living_space: datanew.to_details.living_space,
          floor: datanew.to_details.floor,
          footpath: datanew.to_details.footpath,
          elevator: {
            elevator_type: datanew.to_details.elevator.elevator_type,
            weight: datanew.to_details.elevator.weight,
          },
        },
        moving_dates: {
          moving_date_type: datanew.moving_dates.moving_date_type,
          from: datanew.moving_dates.from,
          to: datanew.moving_dates.to,
        },

        client_details: {
          Phone_no: datanew.client_details.Phone_no,
          email: datanew.client_details.email,
          full_name: datanew.client_details.full_name,
        },
      },
    }
  );

  res.status(200).json(todos);
  //await db.close();
}
