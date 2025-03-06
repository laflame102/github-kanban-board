import { Box, Link } from "@chakra-ui/react";

const RepoLink = ({ repoUrl }: { repoUrl: string }) => {
  const urlSplit = repoUrl.replace("https://github.com/", "").split("/");
  const [owner, repo] = urlSplit;

  return (
    <Box>
      {repoUrl && (
        <>
          <Link href={`https://github.com/${owner}`} target="_blank">
            {owner}
          </Link>
          <span> / </span>
          <Link href={`https://github.com/${owner}/${repo}`} target="_blank">
            {repo}
          </Link>
        </>
      )}
    </Box>
  );
};

export default RepoLink;
