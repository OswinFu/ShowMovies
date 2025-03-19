import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styled from "@emotion/styled";
import StyledBox from "./Box";

const StyledList = styled(List)`
  width: ${(props) => props.width || "300px"};
  height: ${(props) => props.width || "600px"};
  background-color: ${({ theme }) => theme.palette.background.default};
  border-radius: 2px;
  border: ${({ border, theme }) =>
    border || `1px solid  ${theme.palette.primary.main}`};
  overflow-y: auto;
  overscroll-behavior: contain;
  }
`;
const StyledListItem = styled(ListItem)`
  align-items: flex-start;
`;
const StyledListItemText = styled(ListItemText)`
  margin-left: 1rem;
`;
const StyledTypography = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.primary};
`;

const StyledDivider = styled(Divider)`
  border-color: ${({ theme }) => theme.palette.background.paper};
  width: 100%;
`;

export {
  StyledList,
  StyledListItem,
  StyledListItemText,
  StyledTypography,
  StyledDivider,
};

const StyledListItemsGroup = ({ uniId, url, clearName, cancelLikes, like }) => {
  return (
    <StyledBox id={uniId}>
      <StyledListItem>
        <CardMedia
          component="img"
          image={like.movie.poster_path ? url : "/image.jpg"}
          sx={{ width: "50px" }}
        />
        <StyledListItemText
          primary={
            <StyledTypography
              component="p"
              variant="body1"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {like.movie.original_title}
            </StyledTypography>
          }
          secondary={
            <StyledTypography
              component="span"
              variant="body2"
              display="-webkit-box"
              webkit-line-clamp="2"
              webkit-box-orient="vertical"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {`${like.movie.release_date} | ${clearName}`}
            </StyledTypography>
          }
        />

        <IconButton
          onClick={() => cancelLikes(like)}
          sx={{
            color: like.newLikeState ? "primary.main" : "secondary.main",
          }}
        >
          <FavoriteIcon />
        </IconButton>
      </StyledListItem>

      <StyledDivider variant="fullWidth" component="li" />
    </StyledBox>
  );
};

export default StyledListItemsGroup;
