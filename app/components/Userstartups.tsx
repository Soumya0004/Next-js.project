import { StartupCardType } from '@/lib/types'
import { client } from '@/sanity/lib/client'
import { startupsByAuthorQuery } from '@/sanity/lib/queries'
import { Stamp } from 'lucide-react'
import React from 'react'
import StartupCard from './StartupCard'

const Userstartups = async ({id}: {id: string}) => {
  const Startups = await client.fetch(startupsByAuthorQuery, {id})
  return (
    <>
    {Startups.length > 0 ? Startups.map((startup:StartupCardType) => (
      <StartupCard key={startup._id} post={startup} />
    )) : <p className='no-result'>No startups found</p>}
    </>
  )
}

export default Userstartups