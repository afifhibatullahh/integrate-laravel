import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Skeleton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { IconBook2, IconPointFilled, IconUsers } from "@tabler/icons-react";
import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import InputDebounce from "../../components/Input/InputDebounce";

const BoxRow = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

const ListUsersGithub = () => {
  const [preset, setPreset] = useState({
    q: "jhon",
    page: 0,
    per_page: 3,
  });

  const { q, page, per_page } = preset;

  const { data, isLoading, isError } = useQuery(["users", preset], async () => {
    const response = await axios.get(
      `https://api.github.com/search/users?q=${q}&page=${page}&per_page=${per_page}`
    );
    return response;
  });

  const users = data?.data?.items;

  const countAPI = async (url) => {
    const res = await axios.get(url);
    return res.data.length;
  };

  return (
    <Box sx={{ backgroundColor: "#ededed", width: "100%", height: "100vh" }}>
      <Container component="main" maxWidth="lg">
        <Grid container justifyContent="space-between" spacing={3}>
          <Grid item xs={4}>
            <InputDebounce
              debounceTime={2000}
              value={q}
              label="Cari username github"
              onChange={(value) => {
                setPreset({ ...preset, q: value });
              }}
              sx={{ mt: 4, backgroundColor: "white" }}
            />
          </Grid>
          <Grid item container justifyContent="space-between" spacing={3}>
            {isLoading
              ? [1, 2, 3].map((user) => {
                  return (
                    <Grid item xs={12} md={4} sx={{ marginTop: 2 }}>
                      <Card>
                        <CardHeader
                          avatar={
                            <Skeleton
                              animation="wave"
                              variant="circular"
                              width={70}
                              height={70}
                            />
                          }
                          title={
                            <Skeleton
                              animation="wave"
                              height={10}
                              width="80%"
                              style={{ marginBottom: 6 }}
                            />
                          }
                        />
                        <CardContent>
                          <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                          >
                            <BoxRow>
                              <IconUsers size={16} />
                              <Typography fontSize={16}>
                                <Skeleton width={80} />
                              </Typography>
                            </BoxRow>
                            <BoxRow>
                              <IconPointFilled size={16} />
                              <Typography fontSize={16}>
                                <Skeleton width={80} />
                              </Typography>
                            </BoxRow>
                            <BoxRow>
                              <IconBook2 size={16} />
                              <Typography fontSize={16}>
                                <Skeleton width={80} />
                              </Typography>
                            </BoxRow>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })
              : isError
              ? ""
              : users.map((user) => {
                  return (
                    <Grid item xs={12} md={4} sx={{ marginTop: 2 }}>
                      <Card>
                        <CardHeader
                          avatar={
                            <Avatar
                              sx={{ width: 70, height: 70 }}
                              src={user.avatar_url}
                            />
                          }
                          title={user.login}
                        />
                        <CardContent>
                          <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                          >
                            <BoxRow>
                              <IconUsers size={16} />
                              <Typography fontSize={16}>
                                {/* terkena limit */}
                                {/* {countAPI(user.followers_url)} */}
                                followers
                              </Typography>
                            </BoxRow>
                            <BoxRow>
                              <IconPointFilled size={16} />
                              <Typography fontSize={16}>
                                {/* {countAPI(user.following_url)} */}
                                following
                              </Typography>
                            </BoxRow>
                            <BoxRow>
                              <IconBook2 size={16} />
                              <Typography fontSize={16}>
                                {/* {countAPI(user.repos_url)} */}
                                repositories
                              </Typography>
                            </BoxRow>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ListUsersGithub;
