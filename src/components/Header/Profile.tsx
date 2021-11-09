import { Flex, Box, Text, Avatar } from '@chakra-ui/react';

interface ProfileProps {
    showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
    return (
        <Flex align="center">
            {showProfileData && (
                <Box mr="4" textAlign="right">
                    <Text>Igor Gomes</Text>
                    <Text color="gray.300" fontSize="small">
                        igor.pereira @poli.ufrj.br
                    </Text>
                </Box>
            )}
            <Avatar size="md" name="Igor Gomes" src="https://github.com/lil-newty.png" />
        </Flex>
    );
}