const FetchGithubRepo = repository =>
  fetch(`https://api.github.com/repos/${repository}`)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
    .then(response => response.json()).then(repo => Promise.resolve(repo))
    .catch(() => Promise.reject(new Error('GitHub API has throttled your IP.')));

export default FetchGithubRepo;
