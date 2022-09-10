import {  Card,Box, CardContent, Grid, Typography , LinearProgress } from '@mui/material';
import { useState, useEffect } from 'react';

export const TemperatureAverage = (props) => {
  // console.log(props.data)
  const [avg,setAvg] = useState(0.0)
  const URL = "https://api.thingspeak.com/channels/1847318/feeds.json?results=20";
const getData = () =>
{
    axios.get(URL)
    .then((response) => {
    // console.log(response.data.feeds);
    let totalTemperature = 0.0;
    let len = 0;
    
    response.data.feeds.map((data) => {
      if(data.field4 != null){
        len++;
        totalTemperature += parseFloat(data.field4);
        console.log(totalTemperature);
      }
    });
    const c = (len) ? (totalTemperature/len ) : 0.0;
    setAvg(c);
  })
  .catch((error) => {
    console.log(error);
  });
}
  
  setInterval(()=>{
    getData();
  },4000);

  
  return (
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
           Average Temperature
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {avg.toFixed(2)} °C
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
)};

// temperature 
// AverageHumidity
// VOC index
// PM2.5 PM 10 
// Prana air CO2
