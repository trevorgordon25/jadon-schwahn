import { getPayload } from 'payload'
import config from '@payload-config'

export async function getWorks() {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'works',
    sort: 'createdAt',
    limit: 100,
    depth: 1,
  })
  return result.docs
}

export async function getWorkById(id: string) {
  const payload = await getPayload({ config })
  return payload.findByID({
    collection: 'works',
    id,
    depth: 1,
  })
}

export async function markWorkSold(id: string) {
  const payload = await getPayload({ config })
  return payload.update({
    collection: 'works',
    id,
    data: { available: false },
  })
}
