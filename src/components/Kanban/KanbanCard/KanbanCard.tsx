import { useDrag } from "react-dnd";

import { Box, Text } from "@chakra-ui/react";

const KanbanCard: React.FC<{ issue: any; column: string; index: number }> = ({
  issue,
  column,
  index,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "ISSUE",
    item: { id: issue.id, column, index },
    collect: (monitor) => ({
      isDragging: monitor?.isDragging(),
    }),
  });

  return (
    <Box
      ref={drag}
      borderWidth="1px"
      p={4}
      mb={2}
      opacity={isDragging ? 0.5 : 1}
      cursor="move"
    >
      <Text fontWeight="bold">{issue.title}</Text>
      <Text fontSize="sm">
        {issue.assignee ? issue.assignee.login : "Unassigned"} | Comments:{" "}
        {issue.comments}
      </Text>
    </Box>
  );
};

export default KanbanCard;
