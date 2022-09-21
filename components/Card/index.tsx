import Link from "next/link";
import MaterialCard, {
  CardProps as MaterialCardProps,
} from "@mui/material/Card";

import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia, { CardMediaProps } from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { Skeleton } from "@mui/material";

export interface CardProps extends MaterialCardProps {
  image?: CardMediaProps["image"];
  alt?: React.ImgHTMLAttributes<HTMLImageElement>["alt"];
  label?: TypographyProps["children"];
  description?: TypographyProps["children"];
  href?: string;
  loading?: boolean;
  onClick?: () => void;
}

export const Card = ({
  image,
  alt,
  label,
  description,
  href,
  loading,
  onClick,
}: CardProps) => {
  return (
    <Box component={MaterialCard} onClick={onClick} mb={3}>
      {!image || loading ? (
        <Skeleton
          variant="rectangular"
          height={140}
          animation={loading ? "pulse" : false}
        />
      ) : (
        <CardMedia component="img" height="240" image={image} alt={alt} />
      )}

      <CardContent>
        <Box
          component={Typography}
          gutterBottom
          variant="h5"
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
        >
          {loading ? <Skeleton /> : label}
        </Box>
        <Typography variant="body2" color="text.secondary">
          {loading ? <Skeleton /> : description}
        </Typography>
      </CardContent>
      <CardActions>
        {loading ? (
          <Box pl={1} pb={0.5}>
            <Skeleton width={100} />
          </Box>
        ) : (
          <Link href={href || "/"} passHref={true}>
            <Button size="small" {...(!!href && { href })}>
              Learn More
            </Button>
          </Link>
        )}
      </CardActions>
    </Box>
  );
};
