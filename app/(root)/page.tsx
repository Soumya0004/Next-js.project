import React from 'react';
import SearchForm from '../components/SearchForm';
import StartupCard from '../components/StartupCard';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const query = (await searchParams).query;

  const post=[{
    _CreatedAt: new Date(),
    views:55,
    auther:{_id:1,"name":"Soumya Ranjan"},
    _id:1,
    description:'This is a description',
    image:'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    catagory:"Humans",
    title:"Startup Name",
  }]

  

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
    <section className='section_container'>
      <p className='text-30-semibold'>
        {query
          ? `Showing results for "${query}"`
          : "Trending Startups"}
      </p>
      <ul className=' mt-7 card_grid'>
       {
        post ?. length > 0 ? (
          post.map(( post:StartupCardType,i:number)=>(
            <StartupCard key={post ?. _id} post={post}/>
          ))
        ):(
          <p className='no-result'>No results found</p>
         )
       }
       
      </ul>
    </section>
    </>
  );
}
