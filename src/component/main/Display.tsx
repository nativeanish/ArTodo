import React, { useState, useEffect } from "react";
import { Box, Image, Heading, VStack, HStack, Divider } from "@chakra-ui/react";
import { get } from "../../util/init";
import Log from "./Log";
import Task from "./Task";
const Display = () => {
  const [task, setTask] = useState<Array<[string, string, boolean]>>([]);
  useEffect(() => {
    //@ts-ignore
    get().then((e: [] | Array<[string, string, boolean]>) => {
      if (e.length) {
        setTask(e);
      }
    });
  });
  return (
    <>
      {!task.length ? (
        <>
          <Box maxW="80%">
            <Image
              mt="20px"
              w="98%"
              maxW="350"
              src="https://arweave.net/5Dwuk6oUwiQpRxyPfQyM2SavW9QhjQGmSZodRhOS7tc"
              alt="Supporting LGBTQ+"
            />
          </Box>
          <Heading
            p="5"
            fontWeight="extrabold"
            size="L"
            bgGradient="linear(to-l, teal.300, blue.500)"
            bgClip="text"
          >
            Hold on until we find something. Try adding a task you want to
            remember.
          </Heading>
        </>
      ) : (
        <VStack
          borderColor="gray.100"
          borderWidth="2px"
          p="5"
          borderRadius="lg"
          w="100%"
          maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "30vw" }}
          alignItems="stretch"
        >
          <>
            {task.map((value, index) => (
              <div key={index + 44}>
                <HStack key={index + 1} opacity="1">
                  <Log url={value[0]} key={index + 9} />
                  <Task
                    owner={value[1]}
                    status={value[2]}
                    key={index}
                    num={index}
                  />
                </HStack>
                <Divider
                  orientation="horizontal"
                  key={index + 5}
                  marginBottom="4"
                  marginTop="5"
                  borderWidth="2px"
                  borderColor="gray.100"
                />
              </div>
            ))}
          </>
        </VStack>
      )}
    </>
  );
};
export default Display;
