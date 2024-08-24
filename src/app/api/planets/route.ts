import mongoClient from "@/lib/mongodb";
import { NextResponse } from "next/server";

import { validatePlanet } from "@/lib/validators/planet";
import { ValidationError } from "@/lib/types";

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

  try {
    const { planet, warning } = validatePlanet(data);

    if (!planet) {
      throw new ValidationError("Unable to validate planet", 500);
    }

    if (warning && warning !== "") {
      return NextResponse.json({ msg: warning, warn: true });
    }

    return NextResponse.json({
      msg: `Successfully added planet ${planet.name}}`,
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
