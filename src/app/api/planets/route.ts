import mongoClient from "@/lib/mongodb";
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
