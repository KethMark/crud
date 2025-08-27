import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, address, email, age, country } = await req.json()

    await db
      .insert(usersTable)
      .values({name: name, address: address, email: email, age: age, country: country })

    return NextResponse.json({
      text: " Information has been created",
    })
  } catch (error) {
    console.error("Unable to insert information", error);
    return NextResponse.json(
      { error: "Failed to create" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const res = await db.select().from(usersTable).orderBy(desc(usersTable.id))
  return NextResponse.json(res)
}