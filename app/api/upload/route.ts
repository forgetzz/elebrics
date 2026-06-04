import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/utils/pinata";

export const runtime = "nodejs";
export const maxDuration = 300;

const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          error: "No file uploaded",
        },
        {
          status: 400,
        }
      );
    }

    // Validasi ukuran file
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: "File terlalu besar. Maks 500MB",
        },
        {
          status: 413,
        }
      );
    }

    console.log("Uploading:", {
      name: file.name,
      size: `${(
        file.size /
        1024 /
        1024
      ).toFixed(2)} MB`,
      type: file.type,
    });

    // upload ke pinata
    const upload =
      await pinata.upload.public.file(file);

    const cid = upload.cid;

    const url =
      await pinata.gateways.public.convert(
        cid
      );

    console.log("Upload success:", cid);

    return NextResponse.json(
      {
        success: true,
        cid,
        url,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error(
      "UPLOAD ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ??
          "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}