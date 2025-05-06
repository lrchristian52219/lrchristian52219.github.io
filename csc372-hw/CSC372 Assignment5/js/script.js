async function fetchRepos(username = "YOUR-GITHUB-USERNAME") {
    const url = `https://api.github.com/users/${username}/repos?per_page=20&sort=created`;

    try {
        const response = await fetch(url, {
            headers: { 'X-GitHub-Api-Version': '2022-11-28' }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch repos: ${response.status} ${response.statusText}`);
        }

        const repos = await response.json();
        displayRepos(repos, username);
    } catch (error) {
        console.error("An error occurred while fetching repositories:", error.message);
        displayError(error.message); // Optional: Display error to the user
    }
}

async function fetchCommits(repoName, username) {
    const url = `https://api.github.com/repos/${username}/${repoName}/commits`;

    try {
        const response = await fetch(url, {
            headers: { 'X-GitHub-Api-Version': '2022-11-28' }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch commits: ${response.status} ${response.statusText}`);
        }

        const commits = await response.json();
        return commits.length; // Return the number of commits
    } catch (error) {
        console.error(`An error occurred while fetching commits for ${repoName}:`, error.message);
        return "N/A"; // Return "N/A" if there's an error
    }
}

async function displayRepos(repos, username) {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = ""; // Clear previous results

    for (const repo of repos) {
        const commitCount = await fetchCommits(repo.name, username);

        const repoCard = document.createElement("div");
        repoCard.className = "card";

        repoCard.innerHTML = `
            <div class="card-title">
                <i class="fab fa-github"></i>
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </div>
            <div class="card-meta">
                <p><strong>Description:</strong> ${repo.description || "No description available"}</p>
                <p><strong>Created:</strong> ${new Date(repo.created_at).toLocaleDateString()}</p>
                <p><strong>Updated:</strong> ${new Date(repo.updated_at).toLocaleDateString()}</p>
                <p><strong>Watchers:</strong> ${repo.watchers_count}</p>
                <p><strong>Main Language:</strong> ${repo.language || "N/A"}</p>
                <p><strong>Commits:</strong> ${commitCount}</p>
            </div>
        `;

        gallery.appendChild(repoCard);
    }
}

function displayError(message) {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = `<p class="error">${message}</p>`;
}

// Example usage: Call fetchRepos when the search button is clicked
document.getElementById("fetchButton").addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    fetchRepos(username || "YOUR-GITHUB-USERNAME");
});