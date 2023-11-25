import { data } from "autoprefixer";
import Post from "./Post";

import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import ButtonCheckout from "./ButtonCheckout";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Feed = async () => {
  const links = [
    {
      href: "/#pricing",
      label: "Pricing",
    },
  ];
  let { data: posts, error } = await supabase.from("posts").select("*");

  let { data: profiles, e } = await supabase
    .from("profiles")
    .select("has_access");

  return profiles.has_access ? (
    <div className="h-screen w-2/3 mx-4 mt-2 bg-[rgb(232,231,237)] overflow-scroll">
      {posts.map((post) => (
        <Post
          key={post.id}
          title={post.title}
          date={new Date(post.created_at).toLocaleDateString()}
          content={post.content}
          sources={post.sources}
          opinion={post.opinion}
        />
      ))}
    </div>
  ) : (
    <div className="h-screen w-2/3 mx-4 mt-2 bg-[rgb(232,231,237)]">
      {posts.slice(0, 2).map((post) => (
        <Post
          key={post.id}
          title={post.title}
          date={new Date(post.created_at).toLocaleDateString()}
          content={post.content}
          sources={post.sources}
          opinion={post.opinion}
        />
      ))}
      <h1 className="mx-auto text-purple-700 w-max text-3xl">
        Subscribe to see more posts
      </h1>
      <div className="hidden lg:flex lg:justify-center lg:gap-12 lg:items-center bg-purple-600 w-40 rounded mx-auto mt-5">
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.href}
            className="link link-hover text-base-200"
          >
            Click to Subscribe
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Feed;
