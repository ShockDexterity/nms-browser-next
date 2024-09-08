import mongoClient from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

import { validatePlanet } from "@/lib/validators/planet";
import { Planet, PlanetNoId, ValidationError } from "@/lib/types";
import { error } from "console";

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

  try {
    const { validPlanet, warning } = validatePlanet(data, true);

    if (!validPlanet) {
      throw new ValidationError("Unable to validate planet", 500);
    }

    Object.keys(validPlanet).forEach((key: string) => {
      if (!(key in planetToEdit)) {
        delete validPlanet[key as keyof PlanetNoId];
      }
    });

    const result = await collection.updateOne({ _id }, { $set: validPlanet });

    if (result.matchedCount < 1) {
      throw new ValidationError("Unable to find planet to edit", 500);
    }

    if (result.modifiedCount < 1) {
      return NextResponse.json({ msg: "Planet unchanged", warn: true });
    }

    if (warning && warning !== "") {
      return NextResponse.json({ msg: warning, warn: true });
    }

    return NextResponse.json({
      msg: `Successfully edited planet ${validPlanet.name}`,
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

export async function DELETE(
  request: Request,
  context: { params: { id: string } },
) {
  const _id = new ObjectId(context.params.id);

  const client = await mongoClient;
  const collection = client.db("NMSP").collection("planets");
  const planet = await collection.findOneAndDelete(
    { _id },
    {
      projection: { name: 1 },
    },
  );

  if (!planet) {
    return NextResponse.json(
      { error: "Unable to delete planet" },
      { status: 500 },
    );
  }

  return NextResponse.json({
    msg: `Successfully deleted planet ${planet.name}`,
  });
}
