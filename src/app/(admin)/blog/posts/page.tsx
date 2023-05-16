"use client";
import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useState, useEffect } from "react";
import NextLink from "next/link";
// material
import {
  Box,
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";
// components
import Label from "@/components/Label";
import Scrollbar from "@/components/Scrollbar";
import Iconify from "@/components/Iconify";
import { MoreMenu, ListHead, ListToolbar } from "@/components/Table";
// mock

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useLazyGetAllPostsQuery } from "@/redux/features/blog/api";

// ----------------------------------------------------------------------

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: string;
  createdAt: string;
}

const TABLE_HEAD = [
  { id: "title", label: "Title", alignRight: false },
  { id: "slug", label: "Slug", alignRight: false },
  { id: "view", label: "Views", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: "asc" | "desc",
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === "desc" ? (a, b) => descendingComparator(b, a, orderBy) : (a, b) => -descendingComparator(b, a, orderBy);
}

const Posts = () => {
  const { posts } = useAppSelector((state) => state.blog);
  const [getAllPosts, { isLoading, isSuccess }] = useLazyGetAllPostsQuery();
  const postList = posts;

  const handleGetPosts = async () => {
    await getAllPosts().unwrap();
  };

  useEffect(() => {
    handleGetPosts();
  }, []);

  const handleDelete = () => {
    console.log("File:page.tsx", "Line: 87");
    // console.log(slug);
    // dispatch(actions.removePostRequest({ slug }));
  };

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      //const newSelecteds = postList.map((n) => n.name);
      // setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
  //   }
  //   setSelected(newSelected);
  // };

  const handleChangePage = () => {
    // setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - postList.length) : 0;

  const filteredPosts = postList;

  const isPostNotFound = filteredPosts.length === 0;
  return (
    <Box>
      <Container maxWidth={false}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Posts
          </Typography>
          <Button variant="contained" component={NextLink} href="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Posts
          </Button>
        </Stack>

        <Card>
          <ListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={postList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredPosts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                    const { title } = row;
                    const isItemSelected = false;

                    return (
                      <TableRow hover key={i} tabIndex={-1} role="checkbox" selected={isItemSelected} aria-checked={isItemSelected}>
                        <TableCell padding="checkbox">
                          {/* <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, title)} /> */}
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {title}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{"slug"}</TableCell>

                        <TableCell align="left">{"viewsCount"}</TableCell>

                        <TableCell align="left">
                          <Label variant="ghost" color="success">
                            Published
                          </Label>
                        </TableCell>

                        <TableCell align="right">
                          <MoreMenu handleDelete={handleDelete} slug={"slug"} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {/* {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )} */}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={postList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Box>
  );
};

export default Posts;
