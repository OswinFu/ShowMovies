import Chip from "@mui/material/Chip";
import styled from "@emotion/styled";

const StyledChip = styled(Chip)`
  background-color: ${({ theme, selected }) =>
    selected ? theme.palette.primary.main : "transparent"};
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.main};
  }
  margin: 0.15rem;
  font-size: 1.5rem;
`;
export default StyledChip;
