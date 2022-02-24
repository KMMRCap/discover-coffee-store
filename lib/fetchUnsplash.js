import { createApi } from "unsplash-js";
import coffeeStoresData from '../data/coffeeStores.json'

export const fetchUnsplash = async () => {
    const unsplashApi = createApi({
        accessKey: '1WgtzOOfb9sNCfZl110Xt53G7WLSLPGNenJ7fWf9Wmk'
    })

    const photos = await unsplashApi.search.getPhotos({
        query: 'coffee shop',
        perPage: 10,
    });

    const unsplashResults = photos.response.results

    const photosResponse = unsplashResults.map(res => res.urls['small'])

    return photosResponse
}