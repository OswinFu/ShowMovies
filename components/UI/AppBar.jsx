import AppBar from "@mui/material/AppBar";
import styled from "@emotion/styled";

const StyledAppBar = styled(AppBar)`
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor || theme.palette.background.paper};
  width: 100%;
  position: fixed;
`;

export default StyledAppBar;
