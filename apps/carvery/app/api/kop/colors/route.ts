import { NextResponse } from "next/server";
import {
  addCustomColor,
  readCustomColors,
} from "@/features/kop/persistence/custom-colors-repository";

export const dynamic = "force-dynamic";

export const GET = async (): Promise<NextResponse> => {
  const colors = await readCustomColors();
  return NextResponse.json(colors);
};

export const POST = async (request: Request): Promise<NextResponse> => {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Adding colors is only available in development." },
      { status: 403 },
    );
  }

  try {
    const body = (await request.json()) as { name?: string; hex?: string };
    const color = await addCustomColor(body.name ?? "", body.hex ?? "");
    return NextResponse.json(color, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
};
