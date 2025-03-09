import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/system/Stack";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const MovieCard = ({ movie, moviesTitle, isLike, handleClickLike }) => {
  const url = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
  const clearName = moviesTitle.join(" ");
  // console.log("從父組件傳來的isLikes", isLike);
  // 檢查點擊的like是否與儲存的like電影列表裡的電影Id相同，相同就提取沒有的，不同就新增到like電影列表
  const clickLike = () => {
    // 將LIke點擊狀態反轉與電影資訊傳回父組件
    handleClickLike(!isLike, movie, moviesTitle);
  };

  return (
    <Card
      className="card"
      sx={{
        maxWidth: "400px",
        backgroundColor: "#000",
        position: "relative",
        borderRadius: { xs: 5, sm: 10 },
        borderColor: "transparent",
        boxShadow: "0 0  2px 3px rgba(20, 20, 20, 0.6)",

        "&:hover": {
          boxShadow: {
            xs: "0 0  8px 5px rgba(0,0,0,0.6)",
            lg: "0 0  8px 10px rgba(0,0,0,0.6)",
          },
          outline: "2px solid #67d735",
        },
      }}
    >
      <CardActionArea
        sx={{
          position: "relative",
          cursor: "default",
          width: "100%",
          height: "100%",
        }}
        disableRipple
        className="CardActionArea"
      >
        {/* 圖片容器 */}
        <CardMedia
          className="movie-media"
          component="img"
          image={movie.poster_path ? url : "/image.jpg"}
          alt="poster"
          sx={{
            position: "relative",
            width: "100%",
            objectFit: "cover",
            aspectRatio: "2 / 3",
            backgroundColor: "#000",
          }}
        />

        <Box
          width="100%"
          height="100%"
          className="hover-text"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "white",
            opacity: 0,
            transition: "opacity 0.3s ease-in-out",
            "&:hover": {
              opacity: 1,
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
      <CardActions
        sx={{
          backgroundColor: "rgba(59, 59, 59, 1)",
          display: "flex",
          alignItems: "center",
          p: "0.25rem",
          justifyContent: "center",
          ml: 0,
        }}
      >
        <IconButton
          aria-label="add to favorites"
          onClick={clickLike}
          sx={{
            color: isLike ? "rgb(103, 235, 53)" : "rgba(0, 0, 0, 0.5)",

            p: "0.25rem",
          }}
        >
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
