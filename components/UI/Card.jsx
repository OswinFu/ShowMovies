import styled from "@emotion/styled";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import StyledBox from "../UI/Box";
import Stack from "@mui/material/Stack";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";

const StyledCard = styled(Card)`
  min-width: 138px;
  max-width: 350px;
  min-height: 247px;
  background-color: ${({ theme }) => theme.palette.background.default};
  position: relative;
  border-color: transparent;
  box-shadow: 0 0 2px 3px ${({ theme }) => theme.palette.secondary.main};
  outline: 2px solid ${({ theme }) => theme.palette.primary.main};
`;

const StyleCardActionArea = styled(CardActionArea)`
  position: relative;
  cursor: default;
`;

const StyledCardMedia = styled(CardMedia)`
  position: relative;
  width: 100%;
  object-fit: cover;
  aspect-ratio: 2 / 3;
  background-color: ${({ theme }) => theme.palette.background.de};
`;

const StyleCoverCardBox = styled(StyledBox, {
  shouldForwardProp: (prop) => prop !== "visible",
})`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  color: ${({ theme }) => theme.palette.text.primary};
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  /* 桌面 hover */
  @media (hover: hover) {
    &:hover {
      opacity: 1;
    }
  }

  /* 行動 hover*/
  @media (hover: none) {
    opacity: ${({ visible }) => (visible ? 1 : 0)};
  }
`;

const StyledStack = styled(Stack)`
  direction: column;
  height: 100%;
  text-align: start;
`;

const StyledCardActions = styled(CardActions)`
  background-color: ${({ theme }) => theme.palette.background.paper};
  display: flex;
  align-items: center;
  padding: 0.25rem;
  justify-content: center;
  margin-left: 0;
`;

export {
  StyledCard,
  StyleCardActionArea,
  StyledCardMedia,
  StyleCoverCardBox,
  StyledStack,
  StyledCardActions,
};

const StyledCardGroup = ({
  movie,
  clearName,
  isLike,
  clickLike,
  url,
  loading,
}) => {
  // 控制 hover 顯示狀態
  const [hover, setHover] = useState(false);
  // 篩選行動裝置
  const mobile = useMediaQuery("(hover:none)");

  const handleHoverClick = () => {
    if (mobile) {
      setHover((prev) => !prev);
    }
  };

  return (
    <StyledCard
      sx={{
        width: { lg: 350, sm: 213 },
        "@media(width:540px)": {
          width: 204,
        },
        borderRadius: { xs: 3, sm: 5, md: 8, lg: 10 },
        "&:hover": {
          boxShadow: {
            xs: "0 0  8px 5px rgba(0,0,0,0.6)",
            lg: "0 0  8px 10px rgba(0,0,0,0.6)",
          },
        },
      }}
    >
      {/* 圖片動態影響區域*/}
      <StyleCardActionArea disableRipple onClick={handleHoverClick}>
        {loading ? (
          <Skeleton
            variant="rectangular"
            sx={{
              width: { lg: 350, sm: 213, xs: 138 },
              height: { lg: 525, sm: 320, xs: 207 },
              aspectRatio: "2 / 3",
              "@media(width:540px)": {
                width: 204,
                height: 306,
              },
            }}
          />
        ) : (
          /* 圖片容器 */
          <>
            <StyledCardMedia
              component="img"
              image={movie.poster_path ? url : "/image.jpg"}
              alt="poster"
            />
            <StyleCoverCardBox visible={hover}>
              <StyledStack>
                <CardHeader
                  title={movie.original_title}
                  subheader={`${movie.release_date} | ${clearName}`}
                  slotProps={{
                    subheader: {
                      sx: {
                        color: "text.secondary",
                        marginTop: { xs: "0.25rem", lg: "0.5rem" },
                        fontSize: { xs: "0.8rem", sm: "1rem", lg: "1rem" },
                      },
                    },
                    title: {
                      sx: {
                        marginTop: { xs: "0.25rem", lg: "1rem" },
                        fontSize: {
                          xs: "1rem",
                          sm: "1rem",
                          md: "1.2rem",
                          lg: "1.7rem",
                        },
                        maxHeight: "4rem",
                        overflowY: "auto",
                        overscrollBehavior: "contain",
                      },
                    },
                  }}
                  sx={{
                    pb: 1,
                    pt: { xs: 1, lg: 4 },
                    px: { md: 2 },
                    pl: { xs: 1, lg: 4 },
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    px: { xs: 1, md: 2, lg: 4 },
                    pb: { xs: 2, lg: 4 },
                    pt: 0,
                    textAlign: "start",
                    fontSize: { xs: "0.7rem", sm: "0.8rem", lg: "0.9rem" },
                    overflowY: "auto",
                    overscrollBehavior: "contain",
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: (theme) =>
                        theme.palette.background.default,
                    },
                  }}
                >
                  {movie.overview}
                </Typography>
              </StyledStack>
            </StyleCoverCardBox>
          </>
        )}
      </StyleCardActionArea>
      <StyledCardActions>
        <IconButton
          aria-label="add to favorites"
          onClick={clickLike}
          sx={{
            color: isLike ? "primary.main" : "secondary.main",
            p: "0.25rem",
          }}
        >
          <FavoriteIcon />
        </IconButton>
      </StyledCardActions>
    </StyledCard>
  );
};

export default StyledCardGroup;
