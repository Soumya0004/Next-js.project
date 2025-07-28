import { type SchemaTypeDefinition } from 'sanity'
import { startup } from './startup'
import {  author } from './auther'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author , startup],
}
