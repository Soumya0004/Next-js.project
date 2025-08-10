import { defineQuery } from "next-sanity";

export const startupQuery = defineQuery(`
  *[
    _type == "startup" &&
    defined(slug.current) &&
    (
      !defined($search) ||
      title match $search ||
      auther->name match $search ||
      category match $search
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
    category,
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
    category,
    image,    
    pitch
  }`)
export const startupViews = defineQuery(`
  *[_type == "startup" && _id == $id ][0]{
    _id,
    views
  }`)

  export const autherByGithub = defineQuery(`
  *[_type == "author" && id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
  }
`)
