import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styled from "@emotion/styled";

const StyledToolBar = styled(Toolbar)`
  width: 100%;
  background-color: ${({ theme }) => theme.palette.background.paper};
  margin: 0;
  position: fixed;
  top: auto;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-height: 50px;
`;

export { StyledToolBar };

const ToolbarIcons = ({ color, setShowList, showList }) => {
  return (
    <StyledToolBar sx={{ display: { xs: "flex", sm: "none" } }}>
      <IconButton onClick={() => setShowList(!showList)} sx={{ color: color }}>
        <FavoriteIcon />
      </IconButton>
    </StyledToolBar>
  );
};
export default ToolbarIcons;
