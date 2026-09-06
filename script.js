const repositoryList = document.querySelector("#repository-list");
const status = document.querySelector("#status");

function createRepositoryElement(repository) {
  const item = document.createElement("li");
  item.className = "repository";

  const link = document.createElement("a");
  link.href = repository.url;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.textContent = repository.name;

  const description = document.createElement("p");
  description.className = "repository-description";
  description.textContent = repository.description;

  const date = document.createElement("p");
  date.className = "repository-date";
  date.textContent = `Starred on ${new Date(`${repository.starredAt}T00:00:00`).toLocaleDateString()}`;

  item.append(link, description, date);
  return item;
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const repositories = await response.json();
    repositoryList.replaceChildren(...repositories.map(createRepositoryElement));
    status.textContent = `${repositories.length} repositories`;
  } catch (error) {
    status.className = "status error";
    status.textContent = "Unable to load starred repositories.";
    console.error(error);
  }
}

loadRepositories();
