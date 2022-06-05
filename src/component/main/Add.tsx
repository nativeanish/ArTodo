import React, { useEffect, useState } from "react";
import { HStack, Input, Button } from "@chakra-ui/react";
import FileUpload from "./FileUpload";
import { useForm } from "react-hook-form";
import { AppCtx } from "../../context/Init";
const Add = () => {
  const [statusInput] = useState(true);
  const [file, setFile] = useState<FileList | null>(null);
  const [task, setTask] = useState<string | null>(null);
  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      task: { value: string };
    };
    if (target.task.value) {
      setTask(target.task.value);
    }
  };
  const lend = (e: any) => {
    if (file && task) {
      appcontext.dispatch({
        type: "add",
        payload: { task: task, arweave_id: e.target.result },
      });
    }
  };
  const appcontext = React.useContext(AppCtx);
  const pSubmit = () => {
    const reader = new FileReader();
    reader.onloadend = lend;
    reader.readAsText(file[0]);
  };
  useEffect(() => {
    if (task && file) {
      pSubmit();
    }
  }, [task, file]);
  const { control } = useForm();
  return (
    <>
      <form onSubmit={submit}>
        <HStack mt="4" mb="4">
          <Input
            h="46"
            borderColor={!statusInput ? "red.300" : "transparent"}
            variant="filled"
            placeholder="Task"
            name="task"
          />
          <FileUpload
            name="avatar"
            acceptedFileTypes="json/*"
            isRequired={true}
            placeholder="Your Wallet Key"
            control={control}
            setFiles={setFile}
          ></FileUpload>
          <Button
            colorScheme="blue"
            px="8"
            pl="10"
            pr="10"
            h="46"
            type="submit"
          >
            Add
          </Button>
        </HStack>
      </form>
      {task && file ? <></> : null}
    </>
  );
};
export default Add;
