import React from "react";
import SearchForm from "../components/SearchForm";
import StartupCard from "../components/StartupCard";
import { StartupCardType } from "@/lib/types";
import { startupQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { SanityLive } from "@/lib/live";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const query = (await searchParams).query;
  const params={search:query || null}

  // const post = await client.fetch(startupQuery);

  const {data: post} = await sanityFetch({query: startupQuery , params});

  // console.log(JSON.stringify(post, null, 2));

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup <br /> Connect With Entrepreneurs
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Showing results for "${query}"` : "Trending Startups"}
        </p>
        <ul className=" mt-7 card_grid">
          {post?.length > 0 ? (
            post.map((post: StartupCardType, i: number) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-result">No results found</p>
          )}
        </ul>
      </section>
      <SanityLive/>
    </>
  );
}
