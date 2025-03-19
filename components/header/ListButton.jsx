import StyledBox from "../UI/Box";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const ListButton = ({ showList, setShowList, color }) => {
  return (
    <StyledBox
      sx={{
        position: "absolute",
        right: "5rem",
        display: { xs: "none", sm: "block" },
      }}
    >
      {/* 控制icon，未開啟愛心，已開啟X*/}
      <IconButton
        aria-label="show like movies list"
        type="button"
        onClick={() => setShowList(!showList)}
        sx={{ transform: "scale(1.25)", color: color }}
      >
        {showList ? <CloseIcon /> : <FavoriteIcon />}
      </IconButton>
    </StyledBox>
  );
};

export default ListButton;
