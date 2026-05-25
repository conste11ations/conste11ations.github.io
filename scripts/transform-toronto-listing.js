#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const city = process.argv[2]
if (!city) {
  console.error('Usage: node scripts/transform-toronto-listing.js <city> < raw.json')
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

  const rawListing = parsed.listing ?? parsed

  function transform(listing) {
    const detail = listing.listingDetail
    const address = `${listing.street}, ${listing.township || city}, ON`
    const images = (listing.photos || [])
      .sort((a, b) => a.index - b.index)
      .map(p => p.sizeVariants?.['1260x840'] || p.photo)
      .filter(Boolean)
    const price = Number(listing.askingPrice)
    // totalLivingSpace is in m²; convert to sqft
    const sqftRaw = detail.totalLivingSpace
    const sqft = sqftRaw && sqftRaw > 0 ? Math.round(sqftRaw * 10.7639) : null
    const year = detail.constructionYear ? Number(detail.constructionYear) : 0
    const typeMap = { 1: 'Detached', 2: 'Semi-Detached', 3: 'Condo', 4: 'Townhouse' }
    const type = typeMap[detail.propertyTypeId] || 'Residential'
    return {
      id: String(listing.id),
      city,
      address,
      beds: Number(detail.bedroomCount) || 0,
      baths: Number(detail.bathroomCount) || 0,
      sqft,
      type,
      year,
      description: listing.description || '',
      images,
      price,
    }
  }

  const listings = Array.isArray(rawListing) ? rawListing : [rawListing]
  const transformed = listings.map(transform)

  const housesPath = path.join(__dirname, '..', 'data', 'houses.json')
  const existing = JSON.parse(fs.readFileSync(housesPath, 'utf8'))

  // Remove all entries for this city, then append new ones
  const filtered = existing.filter(h => h.city !== city)
  const updated = [...filtered, ...transformed]

  fs.writeFileSync(housesPath, JSON.stringify(updated, null, 2) + '\n')
  console.log(`Updated ${housesPath}: removed ${existing.length - filtered.length} existing ${city} entries, added ${transformed.length} new.`)
})
