import { Box } from "@chakra-ui/react";

import KanbanColumn from "../KanbanColumn/KanbanColumn";

const KanbanBoard: React.FC<{ issues: any[]; repoUrl: string }> = ({
  issues,
  repoUrl,
}) => {
  const columns = ["ToDo", "InProgress", "Done"];

  return (
    <Box display="flex" justifyContent="space-between" w="100%">
      {columns.map((column) => {
        const columnIssues = issues.filter((issue) => issue.column === column);
        return (
          <KanbanColumn
            key={column}
            column={column}
            issues={columnIssues}
            repoUrl={repoUrl}
          />
        );
      })}
    </Box>
  );
};

export default KanbanBoard;
