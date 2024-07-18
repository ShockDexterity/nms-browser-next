import mongoClient from "@/lib/mongodb";
import { validatePlanet } from "@/lib/validators/planet";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const client = await mongoClient;
  const collection = client.db("NMSP").collection("planets");
  const planets = await collection
    .find()
    .sort({ system: 1, name: 1 })
    .toArray();

  return NextResponse.json(planets);
}

export async function PUT(request: Request) {
  const data = await request.json();

  const [err, planet] = validatePlanet(data);

  if (err) {
    return NextResponse.json({ error: err.msg }, { status: err.status });
  }

  if (!planet) {
    return NextResponse.json(
      { error: "Unable to validate planet" },
      { status: 500 },
    );
  }

  return NextResponse.json({
    msg: `Successfully added planet ${planet.name}}`,
  });
}
