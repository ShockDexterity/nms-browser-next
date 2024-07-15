import mongoClient from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

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
