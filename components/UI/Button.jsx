import Button from "@mui/material/Button";
import styled from "@emotion/styled";

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  font-size: 1rem;
  border-radius: 10px;
  margin: 0.5rem;
  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.main};
    box-shadow: 0 2px 5px 2px ${({ theme }) => theme.palette.secondary.main};
  }
`;

export default StyledButton;
