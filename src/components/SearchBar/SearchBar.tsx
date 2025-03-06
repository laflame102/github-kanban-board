import { useForm } from "react-hook-form";

import { Box, Button, Input } from "@chakra-ui/react";

type SearchBarProps = {
  onSubmit: (data: { repoUrl: string }) => void;
};

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ repoUrl: string }>();

  const handleForm = (data: { repoUrl: string }) => {
    onSubmit(data);
  };

  return (
    <Box w="100%">
      <form
        onSubmit={handleSubmit(handleForm)}
        style={{ display: "flex", gap: "15px" }}
      >
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            width: "100%",
          }}
        >
          <Input
            placeholder="Enter repo url"
            {...register("repoUrl", { required: "Url is required" })}
          />
          {errors.repoUrl && (
            <Box color="red.500" paddingLeft={3}>
              {String(errors.repoUrl.message)}
            </Box>
          )}
        </label>

        <Button type="submit" w={100}>
          Load issues
        </Button>
      </form>
    </Box>
  );
};

export default SearchBar;
