import { IconButton } from "@chakra-ui/react";
import React from "react";
import { IoCheckmarkDone } from "react-icons/io5";
import { FiLock, FiCheck } from "react-icons/fi";
import { AppCtx } from "../../context/Init";
const Task = ({
  owner,
  status,
  num,
}: {
  owner: string;
  status: boolean;
  num: number;
}) => {
  //@ts-ignore
  const account = window.walletConnection.account();
  const contextapp = React.useContext(AppCtx);
  return (
    <>
      {account.accountId == owner ? (
        <>
          {!status ? (
            <IconButton
              aria-label="Done"
              icon={<FiCheck />}
              isRound={true}
              onClick={() =>
                contextapp.dispatch({ type: "done", payload: String(num) })
              }
            />
          ) : (
            <IconButton
              aria-label="Completed"
              icon={<IoCheckmarkDone />}
              isRound={true}
              disabled={true}
            />
          )}
        </>
      ) : (
        <IconButton
          aria-label="locked"
          icon={<FiLock />}
          isRound={true}
          disabled={true}
        />
      )}
    </>
  );
};
export default Task;
