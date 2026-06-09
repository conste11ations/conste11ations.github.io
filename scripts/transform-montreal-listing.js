#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const city = process.argv[2]
if (!city) {
  console.error('Usage: node scripts/transform-montreal-listing.js <city> < raw.json')
  process.exit(1)
}

let raw = ''
process.stdin.on('data', chunk => { raw += chunk })
process.stdin.on('end', () => {
  let parsed
  try {
    parsed = JSON.parse(raw)
  } catch (e) {
    console.error('Failed to parse JSON input:', e.message)
    process.exit(1)
  }

  function transform(listing) {
    const address = `${listing.address.street}, ${listing.address.city}, ${listing.address.province}`
    const images = (listing.photos || []).filter(Boolean)
    const price = Number(listing.price.raw)
    const year = listing.year_build ? Number(listing.year_build) : 0
    return {
      id: String(listing.id),
      city,
      address,
      beds: Number(listing.bedroom_count) || 0,
      baths: Number(listing.bathroom_count) || 0,
      sqft: listing.sqft ? Number(listing.sqft) : null,
      type: listing.type || 'Residential',
      year,
      description: listing.description || '',
      images,
      price,
    }
  }

  const listings = Array.isArray(parsed) ? parsed : [parsed]
  const transformed = listings.map(transform)

  const housesPath = path.join(__dirname, '..', 'data', 'houses.json')
  const existing = JSON.parse(fs.readFileSync(housesPath, 'utf8'))

  // Remove all entries for this city, then append new ones
  const filtered = existing.filter(h => h.city !== city)
  const updated = [...filtered, ...transformed]

  fs.writeFileSync(housesPath, JSON.stringify(updated, null, 2) + '\n')
  console.log(`Updated ${housesPath}: removed ${existing.length - filtered.length} existing ${city} entries, added ${transformed.length} new.`)
})
