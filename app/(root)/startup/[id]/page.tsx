import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { startupsById } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
// export const  experimental_ppr = true;
import markdownit from "markdown-it";
const md = markdownit();
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await client.fetch(startupsById, { id });

  if (!post) notFound();

  const parceContaint = md.render(post?.pitch || "");
  return (
    <>
      <section className=" pink_container !min-h-[230px] ">
        <p className="tag tag-tri ">{formatDate(post?._createdAt)}</p>
        <h1 className="heading">{post?.title}</h1>
        <p className="sub-heading !max-w-5xl">{post?.description}</p>
      </section>
      <section className="section_container">
        <img
          src={post?.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
        />
        <div className="space-y-5 mt-10 max-w-4xl  mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post?.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post?.author?.image}
                alt="author"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />

              <div>
                <p className="text-20-medium">{post?.author?.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{post?.author?.username}
                </p>
              </div>
            </Link>
            <p className=" category-tag">{post.catagory}</p>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          {parceContaint ? (
            <article
              dangerouslySetInnerHTML={{ __html: parceContaint }}
              className="prose max-w-4xl font-work-sans break-all"
            />
          ) : (
            <p className="no-result">No Pitch Found</p>
          )}
        </div>
        <hr className="divider" />
      </section>
    </>
  );
};

export default page;
