import mongoClient from "@/lib/mongodb";
import { Planet } from "@/lib/types";
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
  let response = {};
  validatePlanet(
    data,
    (err: { status: number; msg: string } | null, planet: Planet) => {
      if (err) {
        response = { error: true, ...err };
        return;
      }
      response = {
        success: true,
        msg: `Successfully added planet ${planet.name}}`,
      };
    },
  );
}
