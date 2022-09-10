import { Avatar, Box,Card, CardContent, Grid, Typography,LinearProgress } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export const AverageCO2 = (props) => (
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
         CO2 Levels
        </Typography>
        <Typography
          color="textPrimary"
          variant="h4"
        >
          {props.AverageCO2.toFixed(2)}
        </Typography>
      </Grid>
      <Box sx={{ pt: 3 }}>
      
    </Box>
    </Grid>
    </CardContent>
</Card>
);
