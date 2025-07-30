import { defineQuery } from "next-sanity";

export const startupQuery = defineQuery(`
  *[
    _type == "startup" &&
    defined(slug.current) &&
    (
      !defined($search) ||
      title match $search ||
      auther->name match $search ||
      catagory match $search
    )
  ] | order(_createdAt desc) {
    _id,
    title,
    slug,
    _createdAt,
    author->{
      _id,
      name,
      image
    },
    views,
    description,
    catagory,
    image
  }
`);

export const startupsById = defineQuery(`\
  *[_type == "startup" && _id == $id ][0]{
    _id,
    title,
    slug,
    _createdAt,
    author->{
      _id,
      name,
      username,
      image,
      bio
    },
    views,
    description,
    catagory,
    image,    
    pitch
  }`)
