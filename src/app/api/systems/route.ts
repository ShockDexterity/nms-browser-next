import mongoClient from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const client = await mongoClient;
  const collection = client.db("NMSP").collection("systems");
  const systems = await collection.find().sort({ name: 1 }).toArray();

  return NextResponse.json(systems);
}
