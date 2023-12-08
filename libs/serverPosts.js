import { createSupabaseServerClient } from "./createSupabaseServerClient"
import { POSTS_PER_LOAD } from "./infiniteBrowserPosts"

export const serverPosts = async () => {
  const supabase = createSupabaseServerClient()

  let { data: posts, error } = await supabase
    .from("posts")
    .select(
      `
        *,
        likes (post_id,user_id),
        bookmarks (post_id,user_id)
      `
    )
    .order("created_at", { ascending: false })
    .limit(POSTS_PER_LOAD)
  if (error) throw new Error(error)
  // console.log({ SERVER: posts })
  return posts
}
