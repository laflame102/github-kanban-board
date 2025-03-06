import { api } from "../axiosConfig/api";

export class GithubService {
  static async getIssues(url: string) {
    const urlSplit = url.replace("https://github.com/", "").split("/");
    const [owner, repo] = urlSplit;

    const res = await api.get(`/repos/${owner}/${repo}/issues`);
    return res.data;
  }

  static async getRepoStars(url: string) {
    const urlSplit = url.replace("https://github.com/", "").split("/");
    const [owner, repo] = urlSplit;

    const res = await api.get(`/repos/${owner}/${repo}`);
    return res.data.stargazers_count;
  }
}
