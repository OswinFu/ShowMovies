import styled from "@emotion/styled";
import Box from "@mui/material/Box";

const StyledBox = styled(Box)`
  display: ${(props) => props.display || "flex"};
  flex-wrap: ${(props) => props.flexWrap || "wrap"};
  text-align: ${(props) => props.textAlign || "center"};
  align-items: ${(props) => props.alignItems || "center"};
  justify-content: ${(props) => props.justifyContent || "center"};
`;

export default StyledBox;
