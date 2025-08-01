// api/fetchCompanies.js

import fetch from 'node-fetch';

const greenKeywords = ["eco", "bio", "sustainable", "green", "solar", "wind", "energy", "recycle", "environment"];

function isGreenCompany(name, industry) {
  const text = (name + " " + industry).toLowerCase();
  return greenKeywords.some(keyword => text.includes(keyword));
}

export default async function handler(req, res) {
  try {
    const response = await fetch("https://avoindata.prh.fi/bis/v1?maxResults=50");
    const data = await response.json();

    const companies = data.results.map(c => ({
      businessId: c.businessId,
      name: c.name,
      registrationDate: c.registrationDate,
      industry: c.businessLines?.[0]?.name || "",
      green: isGreenCompany(c.name, c.businessLines?.[0]?.name || "")
    }));

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'max-age=300'); // Cache for 5 minutes
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
}
