export const lookupPostcode = async(postcode) =>{
    const clean = postcode.replace(/\s+/g, '').toUpperCase();
    const res = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(clean)}`);
    if (res.status === 400 || res.status === 404) return null;
    if (!res.ok){
        throw new Error(`Postcode.io failed: ${res.status}`);
    }
    const {result} = await res.json()
    return {
        postcode: result.postcode,
        lat: result.latitude,
        lng: result.longitude,
        district: result.admin_district,
    };
}

