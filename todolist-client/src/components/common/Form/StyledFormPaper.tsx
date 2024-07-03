import styled from "@emotion/styled";
import { Paper } from "@mui/material";

const StyledFormPaper = styled(Paper)(
  ({ width, height }: { width: number; height: number }) => ({
    width: `${width}%`,
    height: `${height}%`
  })
);

export default StyledFormPaper;
