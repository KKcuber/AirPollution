import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';

export const AverageVOCIndexl = (props) => (
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
         Average VOC
        </Typography>
        <Typography
          color="textPrimary"
          variant="h4"
        >
          {props.VOC.toFixed(2)}
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
