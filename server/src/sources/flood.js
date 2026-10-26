const BASE = 'https://environment.data.gov.uk/flood-monitoring/id';

export const getFlood = async({lat, lng}) =>{
    const [areaRes, warningRes] = await Promise.all([
        fetch(`${BASE}/floodAreas?lat=${lat}&long=${lng}&dist=1`),
        fetch(`${BASE}/floods?lat=${lat}&long=${lng}&dist=1`),
    ]);

    if(!areaRes.ok || !warningRes.ok) throw new Error (`AreaRes status: ${areaRes.status}    warningRes status: ${warningRes.status}`);

    const areas = (await areaRes.json()).items;
    const warnings = (await warningRes.json()).items;

    return {
        floodAreasNearby: areas.map((a) => a.label),
        activeWarnings: warnings.map((w) =>({
            severity: w.severity,
            area: w.description
        })),
        source: `https://environment.data.gov.uk/flood-monitoring`
    };
}

