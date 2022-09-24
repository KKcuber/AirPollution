import Head from 'next/head';
import {Card,CardContent,LinearProgress, Box, Typography,Container, Grid } from '@mui/material';
import { BarChart } from "../components/dashboard/barChart";
import { DashboardLayout } from '../components/dashboard-layout';
import { useState , useEffect } from 'react';
import axios from 'axios';
import emailjs from 'emailjs-com';
const Dashboard = (props) => {
  
const [temperatureData , setTemperatureData] = useState([]);
const [timeStamps , setTimeStamps] = useState([]);
const [averageTemperature , setAverageTemperature] = useState(0.0);
const [averageHumidity , setAverageHumidity] = useState(0.0);
const [averageVOC , setAverageVOC] = useState(0.0);
const [averageCO2 , setAverageCO2] = useState(0.0); 
const [averagePM2_5 , setAveragePM2_5] = useState(0.0);
const [humidityData , setHumidityData] = useState([]);
const [humidityTimeStamps , setHumidityTimeStamps] = useState([]);
const [PM25Data , setPM25Data] = useState([]);
const [PM25TimeStamps , setPM25TimeStamps] = useState([]);
const [CO2Data , setCO2Data] = useState([]);
const [CO2TimeStamps , setCO2TimeStamps] = useState([]);
const [VOCData , setVOCData] = useState([]);
const [VOCTimeStamps , setVOCTimeStamps] = useState([]);
const [PM10Data , setPM10Data] = useState([]);
const [PM10TimeStamps , setPM10TimeStamps] = useState([]);
const [senderList, setSenderList] = useState([]);
 
const URL = "https://api.thingspeak.com/channels/1847318/feeds.json?results=20";
const day = 24*60*60*1000;
useEffect(() => {
    axios.get('https://sheet.best/api/sheets/73238808-4d9f-40da-b355-7c9d8de72115')
      .then((response) => {
        console.log(response.data);
        setSenderList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function alertMail(param)
  {
    senderList.map((sender) => {
      emailjs.send('service_kkhg118', 'template_hehst4m', {
        to_name: sender.email,
        from_name: 'Air Quality Monitoring System',
        message: `The air quality is not good. Please take necessary precautions, the ${param.param} is not in safebounds.`
      }, 'Vp7d1tWms0HzY7lnZ')
        .then((result) => {
          console.log(result.text);
        }, (error) => {
          console.log(error.text);
        });
    })   
  }

  function MassEmail(){  
    senderList.map((sender) => {
      emailjs.send('service_kkhg118', 'template_uecd639', {email: sender , CO2 : averageCO2,humi : averageHumidity ,Temp : averageTemperature, PM25 : averagePM2_5 , PM10 : averagePM2_5 , VOC : averageVOC}, 'Vp7d1tWms0HzY7lnZ')
    .then((result) => {
        console.log(averageCO2 , averageHumidity , averageTemperature , averagePM2_5 , averageVOC);
        alert("Email Sent Successfully");
    }
    , (error) => {
        console.log(error.text);
    });});
  }

  setTimeout(() => {
    MassEmail();
  }, day);
    


const getData = () =>
{
    axios.get(URL)
    .then((response) => {
    // console.log(response.data.feeds);
    let temperature = [];
    let humidity = [];
    let PM25 = [];
    let VOC = [];
    let CO2 = [];
    let TemptimeStamps = [];
    let TemphumidityTimeStamps = [];
    let TempPM25TimeStamps = [];
    let TempVOCTimeStamps = [];
    let TempCO2TimeStamps = [];
    let totalTemperature = 0.0;
    let totalHumidity = 0.0;
    let totalPM25 = 0.0;
    let totalVOC = 0.0;
    let totalCO2 = 0.0;
    let PM10 = [];
    let TempPM10TimeStamps = [];
    response.data.feeds.map((data) => {
      if(data.field2 != null )
      {
        PM10.push(data.field2);
        TempPM10TimeStamps.push(data.created_at);
      }
      if(data.field4 != null){
        temperature.push(data.field4);
        TemptimeStamps.push(data.created_at);
        totalTemperature += parseFloat(data.field4);
      }
      if(data.field3 != null){
        humidity.push(data.field3);
        TemphumidityTimeStamps.push(data.created_at);
        totalHumidity += parseFloat(data.field3);   
      }
      if(data.field1 != null) {
        PM25.push(data.field1);
        TempPM25TimeStamps.push(data.created_at);
        totalPM25 += parseFloat(data.field1);
      }
      if(data.field6 != null){
        totalVOC += parseFloat(data.field6);
        TempVOCTimeStamps.push(data.created_at);
        VOC.push(data.field6);
      }
      if(data.field5 != null && data.field5 <= 2000){
        totalCO2 += parseFloat(data.field5);
        TempCO2TimeStamps.push(data.created_at);
        CO2.push(data.field5);
      }
    });
    setTemperatureData(temperature);
    let tt = [];
    TemptimeStamps.forEach((time) => {
      const date = new Date(time);
      const timeString = date.toLocaleTimeString();
      tt.push(timeString);
    });
    setTimeStamps(tt);
    setHumidityData(humidity);
    setHumidityTimeStamps(tt);
    setPM25Data(PM25);
    setPM25TimeStamps(tt);
    setVOCData(VOC);
    setVOCTimeStamps(tt);
    setCO2Data(CO2);
    setCO2TimeStamps(tt);
    const tempAvg = (temperature.length) ? totalTemperature / temperature.length : 0.0;
    const humidityAvg = (humidity.length) ? totalHumidity / humidity.length : 0.0;
    const PM25Avg = (PM25.length) ? totalPM25 / PM25.length : 0.0;
    const VOCAvg = (VOC.length) ? totalVOC / VOC.length : 0.0;
    const CO2Avg = (CO2.length) ? totalCO2 / CO2.length : 0.0;
    setAverageTemperature(tempAvg);
    setAverageHumidity(humidityAvg);
    setAveragePM2_5(PM25Avg);
    setAverageVOC(VOCAvg);
    setAverageCO2(CO2Avg);
    setPM10Data(PM10);
    setPM10TimeStamps(tt);
  })
  .catch((error) => {
    console.log(error);
  });
  
      // axios.get(URL)
      // .then((response) => {
      // const feeds2 = response.data.feeds;
      // let tempTimeStamps = [] ,  tempTemperatureData = [];
      // let tempHumidity = [] , tempTimeHumidity = [];
      // let humiditySum = 0.0 , humidityLen = 0;
   
      // let len = 0 , sum = 0.0;
      // feeds2.forEach((feed) => {
      //     if(feed.field2 !== null){
      //     tempTimeStamps.push(feed.created_at);
      //     tempTemperatureData.push(feed.field2);
      //     sum += parseFloat(feed.field2);
      //     len++;
      //     }
      // });
      // axios.get(humidityURL)
      // .then((response)=>{
      //   const feeds1 = response.data.feeds;
      //   feeds1.forEach((feed)=>{
      //     if(feeds1.field1 !== null)
      //     {
      //       tempHumidity.push(feed.field1);
      //       humidityLen++;
      //       humiditySum += parseFloat(feed.field1);
      //       tempTimeHumidity.push(feed.created_at);
      //     }})
      // })
      // .catch((error)=>{
      //   console.log(error);
      // });
      // if(len > 0) setAverageTemperature(sum/len);
      // else setAverageTemperature(0.0);
      // if(humidityLen > 0) setAverageHumidity(humiditySum/humidityLen);
      // else setAverageHumidity(0.0);

      // setHumidityData(tempHumidity);
      // setHumidityTimeStamps(tempTimeHumidity);
      // setTemperatureData(tempTemperatureData);
      // setTimeStamps(tempTimeStamps);
};
useEffect(() => {

}, [averageTemperature,averageHumidity,averagePM2_5,averageVOC,averageCO2]);
setInterval(getData, 4000);
  return (
    <div>
    <Head>
      <title>
        AIR QUALITY MONITORING SYSTEM
      </title>
    </Head>
    <Typography
        variant="h3"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        AIR QUALITY MONITORING SYSTEM
      </Typography>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
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
            {averageTemperature.toFixed(2)} °C
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
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
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
            {averageHumidity.toFixed(2)} 
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
    
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
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
            {averageVOC.toFixed(2)} 
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
    
          </Grid>
          <Grid
            item

            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
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
           Average CO2
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {averageCO2.toFixed(2)} 
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
    
          </Grid>
          <Grid
            item
            lg={6}
            md={8}
            xl={8}
            xs={12}
          >
            
          <BarChart title="Temperature" label = {timeStamps} data={temperatureData} />

          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            xl={6}
            xs={12}
          >
          <BarChart title="Humidity" label = {humidityTimeStamps} data = {humidityData}/>
          </Grid>
          
          <Grid
            item
            lg={6}
            md={6}
            xl={6}
            xs={12}
          >
          <BarChart title="CO2" label={CO2TimeStamps} data = {CO2Data}/>
          </Grid>
          <Grid
            item
            lg={6}
            md={8}
            xl={8}
            xs={12}
          >
            <BarChart title="VOC Index" label = {VOCTimeStamps} data={VOCData} />

          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            xl={6}
            xs={12}
          >
          <BarChart title="PM2.5" label = {PM25TimeStamps} data = {PM25Data} />
          </Grid>
          
          <Grid
            item
            lg={6}
            md={6}
            xl={6}
            xs={12}
          >
          <BarChart title="PM10" label = {PM10TimeStamps} data = {PM10Data} />
          </Grid>
        </Grid>
      </Container>
    </Box>
    </div>
);};

Dashboard.getLayout = (page) => (
  // console.log(page)
  <DashboardLayout>
    {page}
   
  </DashboardLayout>
);

export default Dashboard;