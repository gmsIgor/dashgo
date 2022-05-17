import { Stack, Box, Text } from '@chakra-ui/react';
import { PaginationItem } from './PaginationItem';

interface PaginationProps {
    totalCountOfRegisters: number;
    registerPerPage?: number;
    currentPage?: number;
    onPageChange: (page: number) => void;
}

const siblingsCount = 2;

function generatePagesArray(from: number, to: number) {
    return [...new Array(to - from)]
        .map((_, index) => {
            return from + index + 1;
        })
        .filter(page => page > 0);
}

export function Pagination({
    totalCountOfRegisters,
    registerPerPage = 10,
    currentPage = 1,
    onPageChange
}: PaginationProps) {
    const lastPage = Math.ceil(totalCountOfRegisters / registerPerPage);
    const previousPages = currentPage > 1
        ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
        : [];

    const followingPages = currentPage < lastPage
        ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
        : []

    return (
        <Stack
            direction={["column", "row"]}
            mt="8"
            justify="space-between"
            align="center"
            spacing="6"
        >
            <Box>
                <strong>0</strong> - <strong>10</strong> de <strong>148</strong>
            </Box>
            <Stack direction="row" spacing="2">
                {currentPage > (1 + siblingsCount) && (
                    <>
                        <PaginationItem onPageChange={onPageChange} pageNumber={1} />
                        {!(1 === previousPages[0] - 1) && (
                            <Text alignSelf="flex-end" color="gray.300" w="8" textAlign="center">...</Text>)}
                    </>

                )}

                {previousPages.length > 0 && previousPages.map(page => {
                    return <PaginationItem onPageChange={onPageChange} key={page} pageNumber={page} />
                })}

                <PaginationItem onPageChange={onPageChange} pageNumber={currentPage} isCurrent />

                {followingPages.length > 0 && followingPages.map(page => {
                    return <PaginationItem onPageChange={onPageChange} key={page} pageNumber={page} />
                })}

                {(currentPage + siblingsCount) < lastPage && (
                    <>
                        {!(lastPage === followingPages[siblingsCount - 1] + 1) && (
                            <Text alignSelf="flex-end" color="gray.300" w="8" textAlign="center">...</Text>
                        )}
                        <PaginationItem onPageChange={onPageChange} pageNumber={lastPage} />
                    </>
                )}

            </Stack>
        </Stack>
    );
}