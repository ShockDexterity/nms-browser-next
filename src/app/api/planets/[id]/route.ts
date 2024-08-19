import mongoClient from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

import { validatePlanetEdit } from "@/lib/validators/planet";

export async function GET(
  request: Request,
  context: { params: { id: string } },
) {
  const _id = new ObjectId(context.params.id);

  const client = await mongoClient;
  const collection = client.db("NMSP").collection("planets");
  const planet = await collection.findOne({ _id });

  return NextResponse.json(planet);
}

export async function PUT(
  request: Request,
  context: { params: { id: string } },
) {
  const data = await request.json();
  const _id = new ObjectId(context.params.id);

  const { error, planet, warning } = validatePlanetEdit(data);

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
    return NextResponse.json({ msg: warning });
  }

  return NextResponse.json({
    msg: `Successfully added planet ${planet.name}}`,
  });
}
