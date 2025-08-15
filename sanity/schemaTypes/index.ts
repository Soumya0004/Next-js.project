import { type SchemaTypeDefinition } from 'sanity'
import { startup } from './startup'
import {  author } from './auther'
import { playlist } from './playlist'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author , startup, playlist],
}
