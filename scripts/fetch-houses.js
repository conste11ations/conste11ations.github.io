#!/usr/bin/env node
/**
 * Fetches raw listings from the Repliers API for inspection.
 * Used to find listings to manually add to data/houses.json.
 *
 * Usage:
 *   REPLIERS_API_KEY=your_key node scripts/fetch-houses.js
 */

const https = require('https')

const API_KEY = process.env.REPLIERS_API_KEY
if (!API_KEY) {
  console.error('Error: REPLIERS_API_KEY environment variable is not set.')
  process.exit(1)
}

function fetchListings(params) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.repliers.io',
      path: `/listings?${new URLSearchParams(params)}`,
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
        console.log(`Status: ${res.statusCode}`)
        console.log(JSON.stringify(JSON.parse(data), null, 2))
      })
    })

    req.on('error', reject)
    req.end()
  })
}

fetchListings({ status: 'U', resultsPerPage: '2' })
