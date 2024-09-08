import mongoClient from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

import { validatePlanet } from "@/lib/validators/planet";
import { Planet, ValidationError } from "@/lib/types";

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

  const client = await mongoClient;
  const collection = client.db("NMSP").collection("planets");
  const planetToEdit: Planet = JSON.parse(
    JSON.stringify(await collection.findOne({ _id })),
  );

  if (!planetToEdit) {
    return NextResponse.json(
      {
        error: "Trying to edit a planet that does not exist",
      },
      { status: 400 },
    );
  }

  console.log(planetToEdit);

  try {
    const { planet, warning } = validatePlanet(data, true);

    if (!planet) {
      throw new ValidationError("Unable to validate planet", 500);
    }

    // Object.keys(planet).forEach((key) => {
    //   if (key in planetToEdit && planetToEdit[key] === planet[key]) {
    //   }
    // });

    if (warning && warning !== "") {
      return NextResponse.json({ msg: warning, warn: true });
    }

    return NextResponse.json({
      msg: `Successfully edited planet ${planet.name}}`,
    });
  } catch (error: any) {
    if (error instanceof ValidationError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    } else if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    } else {
      return NextResponse.json({ error: "Unknown Error" });
    }
  }
}
