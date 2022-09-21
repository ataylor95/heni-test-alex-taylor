import Link from "next/link";
import { Container, Typography, Button } from "@mui/material";

export const ShipPageError = () => (
  <>
    <Typography variant="h3">
      Oops
    </Typography>
    <Typography>
      Something went wrong, try refreshing or
    </Typography>
    <Link href={"/"} passHref={true}>
      <Button size="medium">
        Go back
      </Button>
    </Link>
  </>
);