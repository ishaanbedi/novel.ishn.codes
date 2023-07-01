import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";
export async function POST(req: Request, res: Response) {
  const slugGenerator = () => {
    const chars =
      "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let slug = "";
    for (let i = 0; i < 6; i++) {
      slug += chars[Math.floor(Math.random() * chars.length)];
    }
    return slug;
  };

  const body = await req.json();
  let slug = slugGenerator();
  let data = await kv.get(slug);

  while (data !== null) {
    slug = slugGenerator();
    data = await kv.get(slug);
  }

  const dataToSet = await kv.set(slug, body);
  console.log({
    slug: slug,
    data: dataToSet,
  });

  return NextResponse.json({
    slug: slug,
    data: dataToSet,
  });
}
