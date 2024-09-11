import mongoClient from "@/lib/mongodb";
import { NextResponse } from "next/server";

import { validateSystem } from "@/lib/validators/system";
import { ValidationError } from "@/lib/types";

export async function GET(request: Request) {
  const client = await mongoClient;
  const collection = client.db("NMSP").collection("systems");
  const systems = await collection.find().sort({ name: 1 }).toArray();

  return NextResponse.json(systems);
}

export async function POST(request: Request) {
  const data = await request.json();

  try {
    const { validSystem, warning } = validateSystem(data);

    if (!validSystem) {
      throw new ValidationError("Unable to validate system", 500);
    }

    const client = await mongoClient;
    const collection = client.db("NMSP").collection("systems");
    await collection.insertOne(validSystem);

    if (warning && warning !== "") {
      return NextResponse.json({ msg: warning, warn: true });
    }

    return NextResponse.json({
      msg: `Successfully added system ${validSystem.name}`,
    });
  } catch (error: unknown) {
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
