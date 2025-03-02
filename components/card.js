import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Stack } from "@mui/system";
import { CardActionArea } from "@mui/material";

export const MovieCard = ({ movie, moviesTitle }) => {
  const url = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
  console.log("Card tagName", moviesTitle);
  const clearName = moviesTitle.join(" ");

  return (
    <Card
      className="card"
      sx={{
        maxWidth: "400px",
        backgroundColor: "#000",
        position: "relative", // 确保图片和文字能够相对定位
        borderRadius: 10,
        borderColor: "transparent",
        boxShadow: "0 0  2px 3px rgba(20, 20, 20, 0.6)",
        // border: "1px solid transparent",

        "&:hover": {
          boxShadow: {
            xs: "0 0  8px 5px rgba(0,0,0,0.6)",
            lg: "0 0  8px 10px rgba(0,0,0,0.6)",
          },
          outline: "2px solid #67d735",
          // boxShadow: "0 0 0 2px #67d735",
        },
      }}
    >
      <CardActionArea
        sx={{
          position: "relative",
          cursor: "default",
          // backgroundColor: "#000",
          width: "100%",
          height: "100%",
        }}
        disableRipple
        className="CardActionArea"
      >
        {/* 图片区域 */}
        <CardMedia
          className="movie-media"
          component="img"
          image={movie.poster_path ? url : "/image.jpg"}
          alt="poster"
          sx={{
            position: "relative",
            width: "100%",
            // height: "100%",
            // minHeight: "396px",
            objectFit: "cover",
            aspectRatio: "2 / 3",
            backgroundColor: "#000",
          }}
        />

        <Box
          width="100%"
          height="100%" //CardAction 預設48px
          className="hover-text"
          sx={{
            position: "absolute", // 绝对定位，确保它只覆盖在图片上
            top: 0,
            left: 0,

            backgroundColor: "rgba(0, 0, 0, 0.8)", // 透明黑色背景
            color: "white",

            opacity: 0, // 默认隐藏

            transition: "opacity 0.3s ease-in-out", // 平滑过渡
            "&:hover": {
              opacity: 1, // hover时显示文字
            },
          }}
        >
          <Stack direction="column" height="100%" textAlign="Start">
            <CardHeader
              title={movie.original_title}
              subheader={`${movie.release_date} | ${clearName}`}
              slotProps={{
                subheader: {
                  sx: {
                    color: "#67d735",
                    marginTop: { xs: "0.25rem", lg: "0.5rem" },
                    fontSize: { xs: "0.8rem", sm: "1rem", lg: "1rem" },
                  },
                },
                title: {
                  sx: {
                    marginTop: { xs: "0.25rem", lg: "1rem" },
                    fontSize: { xs: "0.8rem", sm: "1.5rem", lg: "2rem" },
                  },
                },
              }}
              // 设置 title 的颜色
              sx={{
                pb: 1,
                pt: { xs: 1, lg: 4 },
                px: { xs: 2, lg: 4 },
                flexDirection: "row",
              }}
            />
            <Typography
              variant="body2"
              sx={{
                px: { xs: 2, lg: 4 },
                pb: { xs: 2, lg: 4 },
                pt: 0,
                textAlign: "start",
                overflowY: "auto",
                overscrollBehavior: "contain",
              }}
            >
              {movie.overview}
            </Typography>
          </Stack>
        </Box>
      </CardActionArea>
    </Card>
  );
};
