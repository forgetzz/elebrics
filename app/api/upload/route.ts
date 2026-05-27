import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/utils/pinata";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();

    const file = data.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const { cid } = await pinata.upload.public.file(file);

    const url = await pinata.gateways.public.convert(cid);

    return NextResponse.json(
      { url },
      { status: 200 }
    );

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}