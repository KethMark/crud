import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: IdSt } = await params;
    const id = parseInt(IdSt) //if we use string for represent the ID, pwd dli ni nato i parse since params always represent string.

    await db.delete(usersTable).where(eq(usersTable.id, id));

    return NextResponse.json({ text: "Information has been deleted", id });
    
  } catch (error) {
    console.error("Unable to delete information", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: IdSt } = await params;
    const id = parseInt(IdSt)

    const { name, email, address, age, country } = await req.json();

    await db
      .update(usersTable)
      .set({ address: address, name: name, email: email, age: age, country: country })
      .where(eq(usersTable.id, id));

    return NextResponse.json({ text: "Information has been Updated", id });

  } catch (error) {
    console.error("Unable to update information", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
