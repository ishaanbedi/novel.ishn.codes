import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";
export async function GET(req: Request) {
  const queryParam = new URL(req.url).searchParams;
  const slug = queryParam.get("slug");
  const data = await kv.get(slug);
  return NextResponse.json(data);
}
