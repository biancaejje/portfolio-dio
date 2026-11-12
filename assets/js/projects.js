const GITHUB_USER = "biancaejje";
const list = document.getElementById("projects");

// Títulos personalizados: "nome-exato-do-repositorio": "Título que aparece no site"
// Repositórios que não estiverem aqui usam o nome do repo com hífens/underscores trocados por espaço.
const TITLES = {
  "nome-do-repo-1": "Criando um App de lembrete",
  "nome-do-repo-2": "Layout Uber",
  "nome-do-repo-3": "Criando Front-end com React",
};

function formatName(name) {
  const clean = name.replace(/[-_]/g, " ");
  return clean.charAt(0).toUpperCase() + clean.slice(1);
}

async function loadProjects() {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`
    );

    if (!response.ok) {
      throw new Error(`Erro ${response.status}`);
    }

    const repos = await response.json();
    const projects = repos.filter((repo) => !repo.fork);

    list.innerHTML = "";

    if (projects.length === 0) {
      list.innerHTML = "<li>Nenhum projeto encontrado.</li>";
      return;
    }

    projects.forEach((repo) => {
      const li = document.createElement("li");
      li.className = "project";

      const title = document.createElement("h3");
      title.className = "project-title";
      title.textContent = TITLES[repo.name] || formatName(repo.name);

      const link = document.createElement("a");
      link.className = "project-link";
      link.href = repo.html_url;
      link.textContent = repo.html_url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      li.append(title, link);
      list.appendChild(li);
    });
  } catch (error) {
    list.innerHTML = "<li>Não foi possível carregar os projetos.</li>";
    console.error(error);
  }
}

loadProjects();