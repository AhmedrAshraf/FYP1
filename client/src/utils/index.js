export function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers

    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in kilometers
    return distance;
}

export async function getCity(keyword){
    const res = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${keyword}&type=city&filter=countrycode:pk&format=json&apiKey=d1253fb280a74d3281d89d93b653b4f0`);

    const data = await res.json();

    return data?.results;
}