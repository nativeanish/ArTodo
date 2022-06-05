import React, { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import axios from "axios";
const Log = ({ url }: { url: string }) => {
  const [text, setText] = useState<string | null>(null);
  useEffect(() => {
    axios
      .get(`https://arweave.net/${url}`)
      .then((e) => {
        setText(e.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Text w="100%" p="8px" borderRadius="lg">
      {text ? text : "[fetching the data]"}
    </Text>
  );
};
export default Log;
