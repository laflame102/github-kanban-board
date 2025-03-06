import { useDrop } from "react-dnd";

import { Box, Text } from "@chakra-ui/react";

import { useStore } from "../../../store";
import KanbanCard from "../KanbanCard/KanbanCard";

const KanbanColumn: React.FC<{
  column: string;
  issues: any[];
  repoUrl: string;
}> = ({ column, issues, repoUrl }) => {
  const { setIssuePosition } = useStore();

  const [, drop] = useDrop({
    accept: "ISSUE",
    drop: (item: { id: number; column: string; index: number }) => {
      if (item.column !== column) {
        setIssuePosition(item.id, column, item.index, repoUrl);
      }
    },
  });

  return (
    <Box
      ref={drop}
      borderWidth="1px"
      p={4}
      width="30%"
      minHeight="300px"
      borderRadius="md"
    >
      <Text fontSize="lg" mb={4}>
        {column}
      </Text>
      {issues.map((issue, index) => (
        <KanbanCard
          key={issue.id}
          issue={issue}
          column={column}
          index={index}
        />
      ))}
    </Box>
  );
};

export default KanbanColumn;
