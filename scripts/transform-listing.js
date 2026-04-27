#!/usr/bin/env node
/**
 * Transforms a raw HonestDoor/Repliers listing JSON and upserts it into data/houses.json.
 * Removes all existing entries for the given city and replaces them with the transformed data.
 *
 * Usage:
 *   node scripts/transform-listing.js <city> < raw_listing.json
 *   echo '<json>' | node scripts/transform-listing.js <city>
 */

const fs = require('fs')
const path = require('path')

const city = process.argv[2]
if (!city) {
  console.error('Usage: node scripts/transform-listing.js <city> < raw.json')
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

  // Support both top-level pageProps and the listing directly
  const listing = parsed.pageProps?.listing ?? parsed.listing ?? parsed

  function transform(listing) {
    const addr = listing.address
    const details = listing.details

    const province = addr.state || addr.province || 'ON'
    const address = `${addr.streetName}, ${city}, ${province}`

    const images = (listing.images || []).map(img =>
      img.startsWith('http') ? img : `https://cdn.repliers.io/${img}`
    )

    const price = Number(listing.soldPrice) || Number(listing.listPrice)

    // yearBuilt from Repliers is sometimes a range like "6-15"; fall back to 0
    const yearBuilt = details.yearBuilt
    let year = parseInt(yearBuilt, 10)
    if (isNaN(year)) year = 0

    return {
      id: listing.mlsNumber,
      city,
      address,
      beds: Number(details.numBedrooms),
      baths: Number(details.numBathrooms),
      sqft: details.sqft,
      type: details.propertyType,
      year,
      description: details.description,
      images,
      price,
    }
  }

  // listing may be a single object or an array
  const listings = Array.isArray(listing) ? listing : [listing]
  const transformed = listings.map(transform)

  const housesPath = path.join(__dirname, '..', 'data', 'houses.json')
  const existing = JSON.parse(fs.readFileSync(housesPath, 'utf8'))

  // Remove all entries for this city, then append new ones
  const filtered = existing.filter(h => h.city !== city)
  const updated = [...filtered, ...transformed]

  fs.writeFileSync(housesPath, JSON.stringify(updated, null, 2) + '\n')
  console.log(`Updated ${housesPath}: removed ${existing.length - filtered.length} existing ${city} entries, added ${transformed.length} new.`)
})
