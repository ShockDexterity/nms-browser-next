import mongoClient from "@/lib/mongodb";
import { NextResponse } from "next/server";

import { validatePlanetAddition } from "@/lib/validators/planet";

export async function GET(request: Request) {
  const client = await mongoClient;
  const collection = client.db("NMSP").collection("planets");
  const planets = await collection
    .find()
    .sort({ system: 1, name: 1 })
    .toArray();

  return NextResponse.json(planets);
}

export async function POST(request: Request) {
  const data = await request.json();

  const { error, planet, warning } = validatePlanetAddition(data);

  if (error) {
    return NextResponse.json({ error: error.msg }, { status: error.status });
  }

  if (!planet) {
    return NextResponse.json(
      { error: "Unable to validate planet" },
      { status: 500 },
    );
  }

  if (warning && warning !== "") {
    return NextResponse.json({ msg: warning, warn: true });
  }

  return NextResponse.json({
    msg: `Successfully added planet ${planet.name}}`,
  });
}
