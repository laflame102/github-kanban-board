import { create } from "zustand";

interface Issue {
  id: number;
  title: string;
  assignee: { login: string } | null;
  column: string;
  state: string;
  comments: number;
}

interface StoreState {
  issues: Issue[];
  setIssues: (issues: Issue[], repoUrl: string) => void;
  setIssuePosition: (
    id: number,
    newColumn: string,
    newIndex: number,
    repoUrl: string,
  ) => void;
}

export const useStore = create<StoreState>((set) => ({
  issues: [],

  setIssues: (issues, repoUrl) => {
    const storedIssues = localStorage.getItem(`issues_${repoUrl}`);

    if (storedIssues) {
      set({ issues: JSON.parse(storedIssues) });
    } else {
      const issueWithColumns = issues.map((issue) => {
        if (issue.state === "closed") {
          return { ...issue, column: "Done" };
        } else if (issue.assignee) {
          return { ...issue, column: "InProgress" };
        } else {
          return { ...issue, column: "ToDo" };
        }
      });

      localStorage.setItem(
        `issues_${repoUrl}`,
        JSON.stringify(issueWithColumns),
      );
      set({ issues: issueWithColumns });
    }
  },

  setIssuePosition: (id, newColumn, newIndex, repoUrl) =>
    set((state) => {
      const newIssues = [...state.issues];

      let movedIssue: Issue | undefined;
      const index = newIssues.findIndex((issue) => issue.id === id);
      if (index !== -1) {
        movedIssue = newIssues.splice(index, 1)[0];
        movedIssue.column = newColumn;
        newIssues.splice(newIndex, 0, movedIssue);
      }

      localStorage.setItem(`issues_${repoUrl}`, JSON.stringify(newIssues));

      return { issues: newIssues };
    }),
}));
