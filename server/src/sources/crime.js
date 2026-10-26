export const getCrime = async({lat, lng}) =>{
    const url = `https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${lng}`;
    const res = await fetch(url);

    if (!res.ok){
        throw new Error(`Police.uk failed: ${res.status}`);
    }
    const crimes = await res.json();

    const byCategory = {}
    for (const c of crimes){
        byCategory[c.category] = (byCategory[c.category] || 0) + 1;
    }
    return {
        month: crimes[0]?.month ?? null,
        total: crimes.length,
        byCategory,
        source: 'https://data.police.uk',
    };
}