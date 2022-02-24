import { table, getMinifiedRecords } from '../../lib/airtable'

const createCoffeeStore = async (req, res) => {
  if (req.method === "POST") {
    const { id, name, address, neighborhood, imgUrl, voting } = JSON.parse(req.body)

    try {
      if (id) {
        const findCoffeeStoreRecords = await table.select({
          filterByFormula: `id="${id}"`
        }).firstPage()

        if (findCoffeeStoreRecords.length) {
          const records = getMinifiedRecords(findCoffeeStoreRecords)
          res.json(records)
        }

        else {
          if (name) {
            const createRecords = await table.create([{
              fields: { id, name, address, neighborhood, imgUrl, voting }
            }])
            const records = getMinifiedRecords(createRecords)
            res.json({ message: 'Record created', records })
          }

          else {
            res.status(400)
            res.json({ message: 'name is missing' })
          }
        }
      }

      else {
        res.status(400)
        res.json({ message: 'id is missing' })
      }
    }
    catch (err) {
      console.error(err)
      res.status(500)
      res.json({ message: 'Error', err })
    }
  }
}

export default createCoffeeStore


// useEffect(() => {
  // handleCreateCoffeeStore()
// }, [])

// const handleCreateCoffeeStore = async () => {
//   try {
//       const res = await fetch('/api/createCoffeeStore', {
//           method: "POST",
//           headers: {
//               "Content-Type": "application.json"
//           },
//           body: JSON.stringify({
//               id: fsq_id,
//               name,
//               voting: 0,
//               imgUrl,
//               address: address ? address : '',
//               neighborhood: neighborhood ? neighborhood : ''
//           })
//       })
//       const dbCoffeeStore = await res.json()
//       console.log(dbCoffeeStore);
//   }
//   catch (err) {
//       console.error(err)
//   }
// }