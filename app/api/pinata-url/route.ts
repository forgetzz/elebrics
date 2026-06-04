import { NextResponse } from "next/server";
import { pinata } from "@/utils/pinata";

export async function GET() {
  try {
    const url =
      await pinata.upload.public.createSignedURL({
        expires: 60,
      });

    return NextResponse.json({
      url,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}