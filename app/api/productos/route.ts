import { NextResponse } from "next/server";
import { productos } from "../../../data/productos";

export async function GET() {
  return NextResponse.json(productos);
}