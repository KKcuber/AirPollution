import { Avatar, Box, Card, CardContent, Grid, Typography , LinearProgress } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';

export const AverageHumidity = (props) => (
  <Card
  sx={{ height: '100%' }}
  {...props}
>
  <CardContent>
    <Grid
      container
      spacing={3}
      sx={{ justifyContent: 'space-between' }}
    >
      <Grid item>
        <Typography
          color="textSecondary"
          gutterBottom
          variant="overline"
        >
         Average Humidity
        </Typography>
        <Typography
          color="textPrimary"
          variant="h4"
        >
          {props.AverageHumidity.toFixed(2)}
        </Typography>
      </Grid>
      <Box sx={{ pt: 3 }}>
      <LinearProgress
        value={75.5}
        variant="determinate"
      />
    </Box>
    </Grid>
    </CardContent>
</Card>
);
