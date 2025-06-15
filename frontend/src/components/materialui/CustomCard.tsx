//Card Props : children, classes, raised, sx
//Card Action Area Props: children, classes, slotprops, slots, sx
//CardActions API Props: children, classes, doublespacing, sx
//CardContent Props: children, classes, component, sx
//CardHeader Props: action, avatar, classes, component, doubleTypography, slotprops, slots, subheader, subheaderTypographyProps, sx, title, titleTypographyProps
//CardMedia Props: children, classes, component, image, src, sx

// //1. Card - The main container.
// 2. CardActionArea - Makes the whole card clickable (like a button or link). Wraps content you want to be interactive.
// 3. CardContent. Holds the main content (text, children, etc.).
// 4. CardHeader. For a title, subtitle, avatar, and actions at the top.
// 5. CardMedia. For images, videos, or other media.
// 6. CardActions. For buttons or actions at the bottom (like "Learn More", "Share").

import { Card, CardActionArea, CardContent, CardHeader, CardMedia, CardActions, Button, Typography } from '@mui/material';

interface CustomCardProps {
  title: string;
  subheader?: string;
  image?: string;
  content: React.ReactNode;
  github?: string;
  demo?: string;
}

const CustomCard: React.FC<CustomCardProps> = ({ title, subheader, image, content, github, demo }) => (
  <Card sx={{ maxWidth: 345 }}>
    <CardActionArea>
      {image && (
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={title}
        />
      )}
      <CardHeader title={title} subheader={subheader} />
      <CardContent>
        {content}
      </CardContent>
    </CardActionArea>
    <CardActions>
      {github && (
        <Button size="small" color="primary" href={github} target="_blank">
          GitHub
        </Button>
      )}
      {demo && (
        <Button size="small" color="primary" href={demo} target="_blank">
          Live Demo
        </Button>
      )}
    </CardActions>
  </Card>
);

export default CustomCard;