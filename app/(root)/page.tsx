import React from "react";
import SearchForm from "../components/SearchForm";
import StartupCard from "../components/StartupCard";
import StartUpForm from "../components/StartUpForm";
import { StartupCardType } from "@/lib/types";
import { startupQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { SanityLive } from "@/lib/live";
import { auth } from "@/auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query || "";
  const params = { search: query || null };

  const session = await auth();

  if (session?.id) {
    console.log("Logged in as:", session.id);
  } else {
    console.log("User not logged in");
  }

  const { data: post } = await sanityFetch({
    query: startupQuery,
    params,
  });

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

        <ul className="mt-7 card_grid">
          {post?.length > 0 ? (
            post.map((post: StartupCardType) => (
              <StartupCard key={post._id} post={post} />
            ))
          ) : (
            <p className="no-result">No results found</p>
          )}
        </ul>
      </section>

      <section className="section_container">
        <h2 className="text-30-semibold mb-6">Submit Your Startup</h2>
        <StartUpForm />
      </section>

      <SanityLive />
    </>
  );
}
