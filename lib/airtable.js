const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
    .base(process.env.AIRTABLE_BASE_KEY);

const table = base('stores')

const getMinifiedRecords = (records) => {
    return records.map(rec => {
        return {
            ...rec.fields
        }
    })
}

export { table, getMinifiedRecords }