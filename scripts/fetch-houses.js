#!/usr/bin/env node
/**
 * Fetches sold listings from the Repliers API and writes them to data/houses.json.
 *
 * Run manually:
 *   REPLIERS_API_KEY=your_key node scripts/fetch-houses.js
 *
 * Or triggered via GitHub Actions (see .github/workflows/refresh-houses.yml).
 *
 * Field mapping reference (adjust if Repliers response shape differs):
 *   listing.mlsNumber       → id
 *   listing.address.city    → city
 *   listing.address.area    → neighbourhood (unused)
 *   listing.details.numBedrooms       → beds
 *   listing.details.numBathrooms      → baths
 *   listing.details.sqft              → sqft
 *   listing.details.propertyType      → type
 *   listing.details.yearBuilt         → year
 *   listing.details.description       → description
 *   listing.images[].smallUrl         → images
 *   listing.soldPrice                 → price
 */

const fs = require('fs')
const path = require('path')
const https = require('https')

const API_KEY = process.env.REPLIERS_API_KEY
if (!API_KEY) {
  console.error('Error: REPLIERS_API_KEY environment variable is not set.')
  process.exit(1)
}

const CITIES = ['Toronto']
const LISTINGS_PER_CITY = 2

function fetchListings(city) {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams({
      status: 'U',
      resultsPerPage: '1',
    })

    const options = {
      hostname: 'api.repliers.io',
      path: `/listings?${params}`,
      method: 'GET',
      headers: {
        'repliers-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
    }

    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        console.log(`  Raw response for ${city} (status ${res.statusCode}):`, data.slice(0, 3000))
        try {
          resolve(JSON.parse(data))
        } catch (e) {
          reject(new Error(`Failed to parse response for ${city}: ${data}`))
        }
      })
    })

    req.on('error', reject)
    req.end()
  })
}

function transformListing(listing, city, index) {
  // Adjust these field paths if the Repliers response shape differs
  const details = listing.details || {}
  const address = listing.address || {}
  const images = (listing.images || [])
    .slice(0, 3)
    .map(img => img.smallUrl || img.mediumUrl || img.largeUrl || img.url)
    .filter(Boolean)

  return {
    id: listing.mlsNumber || `${city}-${index}`,
    city,
    address: [address.streetNumber, address.streetName, address.streetSuffix].filter(Boolean).join(' ') + `, ${city}`,
    beds: Number(details.numBedrooms) || 0,
    baths: Number(details.numBathrooms) || 0,
    sqft: Number(details.sqft) || 0,
    type: details.propertyType || 'Residential',
    year: Number(details.yearBuilt) || 0,
    description: details.description || '',
    images,
    price: Number(listing.soldPrice) || 0,
  }
}

async function main() {
  console.log('Fetching listings from Repliers API...')

  const allHouses = []
  let id = 1

  for (const city of CITIES) {
    console.log(`  Fetching ${LISTINGS_PER_CITY} sold listings for ${city}...`)
    try {
      const response = await fetchListings(city)
      const listings = response.listings || response.results || []

      if (listings.length === 0) {
        console.warn(`  Warning: no listings returned for ${city}. Keeping existing data for this city.`)
        continue
      }

      for (const listing of listings.slice(0, LISTINGS_PER_CITY)) {
        const house = transformListing(listing, city, id++)
        if (house.price > 0 && house.images.length > 0) {
          allHouses.push(house)
        } else {
          console.warn(`  Skipping listing ${house.id} — missing price or images.`)
        }
      }
    } catch (err) {
      console.error(`  Error fetching ${city}: ${err.message}`)
    }
  }

  if (allHouses.length === 0) {
    console.error('No valid listings fetched. Aborting to avoid overwriting existing data.')
    process.exit(1)
  }

  const outPath = path.join(__dirname, '..', 'data', 'houses.json')
  fs.writeFileSync(outPath, JSON.stringify(allHouses, null, 2))
  console.log(`Done. Wrote ${allHouses.length} houses to ${outPath}`)
}

main()
