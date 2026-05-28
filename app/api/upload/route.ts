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

    console.log("Uploading:", file.name);

    const upload = await pinata.upload.public.file(file);

    console.log("Upload result:", upload);

    const cid = upload.cid;

    const url = await pinata.gateways.public.convert(cid);

    return NextResponse.json(
      {
        cid,
        url,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("UPLOAD ERROR:", error);

    return NextResponse.json(
      {
        error: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}