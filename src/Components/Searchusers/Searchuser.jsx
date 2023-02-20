import React from "react";
import { Box, Text } from "@chakra-ui/react";
function Searchuser({ users, handlefunction }) {
  return (
    <>
      <Box
        onClick={handlefunction}
        cursor="pointer"
        bg="#E8E8E8"
        w="100%"
        d="flex"
        alignItems="center"
        color="black"
        borderRadius={2}
        px={3}
        py={3}
        m={1}
        _hover={{
          backgroundColor: "green",
          color: "white",
        }}
      >
        <Box>
          <Text fontSize="xs">{users}</Text>
        </Box>
      </Box>
    </>
  );
}

export default Searchuser;
