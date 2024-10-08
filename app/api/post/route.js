import { createSupabaseServerClient } from "@/libs/createSupabaseServerClient"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function POST(req) {
  const supabase = createSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  console.log({ user })
  const payload = await req.json()

  // console.log({ session, payload });

  try {
    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          user_id: user.id,
          ...payload,
        },
      ])
      .select()
    if (error) {
      throw error
    }
    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
