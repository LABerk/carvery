import { NextResponse } from "next/server";
import { removeCustomColor } from "@/features/kop/persistence/custom-colors-repository";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ name: string }>;
};

export const DELETE = async (
  _request: Request,
  context: RouteContext,
): Promise<NextResponse> => {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Removing colors is only available in development." },
      { status: 403 },
    );
  }

  try {
    const { name } = await context.params;
    await removeCustomColor(decodeURIComponent(name));
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
};
