import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Box from "@mui/material/Box";

const ItemsList = ({ handleClickLike, showList, clickLikes }) => {
  // console.log("從父組件傳來的clickLikes", clickLikes);
  // console.log("從父組件傳來的handleClickLike", handleClickLike);

  const cancelLikes = (like) => {
    handleClickLike(!like.newLikeState, like.movie, like.moviesTitle);
  };
  return (
    <>
      {showList && (
        <List
          sx={{
            width: "300px",
            height: "600px",
            backgroundColor: "black",
            borderRadius: 2,
            border: "1px solid #67d735",
            overflowY: "auto",
          }}
        >
          {clickLikes.length === 0 ? (
            <ListItem alignItems="flex-start">
              <ListItemText>
                <Typography
                  component="p"
                  variant="body1"
                  sx={{ color: "white" }}
                >
                  沒有收藏資料
                </Typography>
              </ListItemText>
            </ListItem>
          ) : (
            <>
              {clickLikes.map((like, index) => {
                const url = `https://image.tmdb.org/t/p/original/${like.movie.poster_path}`;
                const clearName = like.moviesTitle.join(" ");
                return (
                  <Box key={index}>
                    <ListItem alignItems="flex-start">
                      <CardMedia
                        component="img"
                        image={like.movie.poster_path ? url : "/image.jpg"}
                        sx={{ width: "50px" }}
                      />
                      <ListItemText
                        sx={{ ml: 2 }}
                        primary={
                          <Typography
                            component="p"
                            variant="body1"
                            sx={{ color: "#fffffd" }}
                          >
                            {like.movie.original_title}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ color: "#fffffd" }}
                          >
                            {`${like.movie.release_date} | ${clearName}`}
                          </Typography>
                        }
                      />
                      <IconButton
                        onClick={() => cancelLikes(like)}
                        sx={{
                          color: like.newLikeState
                            ? "rgb(103, 235, 53)"
                            : "rgb(0, 0, 0,0.5)",
                        }}
                      >
                        <FavoriteIcon />
                      </IconButton>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </Box>
                );
              })}
            </>
          )}
        </List>
      )}
    </>
  );
};

export { ItemsList };
