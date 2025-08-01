
const greenKeywords = ["eco", "bio", "sustainable", "green", "solar", "wind", "energy", "recycle", "environment"];

function isGreenCompany(name, industry) {
  const text = (name + " " + industry).toLowerCase();
  return greenKeywords.some(keyword => text.includes(keyword));
}

async function fetchCompanies() {
  const res = await fetch("https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/fetchCompanies");
  const data = await res.json();
  displayCompanies(data);
}

function displayCompanies(companies) {
  const container = document.getElementById("companies");
  const search = document.getElementById("search");
  function renderList() {
    const query = search.value.toLowerCase();
    container.innerHTML = '';
    companies.filter(c => c.name.toLowerCase().includes(query)).forEach(c => {
      const card = document.createElement("div");
      card.className = "company-card";
      card.innerHTML = \`
        <h3>\${c.name}</h3>
        <p>Business ID: \${c.businessId}</p>
        <p>Registered: \${c.registrationDate}</p>
        <p>Industry: \${c.industry}</p>
        \${isGreenCompany(c.name, c.industry) ? '<span class="green-badge">🌱 Green Transition</span>' : ''}
      \`;
      container.appendChild(card);
    });
  }
  search.addEventListener("input", renderList);
  renderList();
}

fetchCompanies();
