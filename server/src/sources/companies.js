const BASE = 'https://api.company-information.service.gov.uk';

const ch = async(path) =>{
    const token = Buffer.from(`${process.env.COMPANIES_HOUSE_KEY}:`).toString('base64');
    const res = await fetch(BASE + path, { headers: { Authorization: `Basic ${token}` } });

    if (res.status === 404){
        return null;
    }

    if (!res.ok) throw new Error(`Companies House API failed: ${res.status}`);
    return res.json();

}


export const checkCompany = async(name) =>{
    const search = await ch(`/search/companies?q=${encodeURIComponent(name)}&items_per_page=5`);
    
}