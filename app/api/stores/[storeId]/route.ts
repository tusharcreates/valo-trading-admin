import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const name = body.name;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Missing name", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("Missing storeId", { status: 400 });
    }

    const store = await prismadb.store.updateMany({
      where: {
        id: Number(params.storeId),
        userId,
      },
      data: {
        name: name,
      },
    });
    return NextResponse.json(store, { status: 200 });
  } catch (e) {
    console.log("[STORE_PATCH]", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.storeId) {
      return new NextResponse("Missing storeId", { status: 400 });
    }

    const store = await prismadb.store.deleteMany({
      where: {
        id: Number(params.storeId),
        userId,
      },
    });
    return NextResponse.json(store, { status: 200 });
  } catch (e) {
    console.log("[STORE_DELETE]", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
