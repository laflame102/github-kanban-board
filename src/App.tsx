import { Box, Spinner, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import KanbanBoard from "./components/Kanban/KanbanBoard/KanbanBoard";
import RepoLink from "./components/RepoLink/RepoLink";
import SearchBar from "./components/SearchBar/SearchBar";
import { GithubService } from "./lib/services/githubService";
import { useStore } from "./store";

const App = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [stars, setStars] = useState(0);
  const { issues, setIssues } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (repoUrl) {
      const fetchData = async () => {
        try {
          setIsLoading(true);

          const issuesData = await GithubService.getIssues(repoUrl);

          setIssues(issuesData, repoUrl);

          const starsData = await GithubService.getRepoStars(repoUrl);
          setStars(starsData);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [repoUrl, setIssues]);

  const handleRepoUrlSubmit = (data: { repoUrl: string }) => {
    setRepoUrl(data.repoUrl);
  };

  return (
    <VStack wordSpacing={4} align="stretch" padding={10} alignItems="center">
      <SearchBar onSubmit={handleRepoUrlSubmit} />
      <Box alignSelf={"flex-start"}>
        {repoUrl && (
          <Box display={"flex"} gap={8}>
            <RepoLink repoUrl={repoUrl} />
            <Box>{stars} K stars</Box>
          </Box>
        )}
      </Box>
      <Box display="flex" justifyContent="space-between" w="100%">
        {isLoading ? (
          <Spinner />
        ) : (
          <KanbanBoard issues={issues} repoUrl={repoUrl} />
        )}
      </Box>
    </VStack>
  );
};

export default App;
