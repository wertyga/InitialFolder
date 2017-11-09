const  baseUrl = 'https://webilesoft-backend.herokuapp.com';

export default {
    groups: `${baseUrl}/groups`,
    groupItems(id) { return `${baseUrl}/groups/items/${id}`},
    items(id) { return `${baseUrl}/items/${id}`}
}