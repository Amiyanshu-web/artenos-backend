const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());

const PORT = 8080;

const API_KEY = '335f16bdef61470992495053242604';

app.get("/weather/:city", async(req,res)=>{
    try{
        const {city} = req.params;
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`);

        const {temp_c, condition:{text}} = response.data.current;
        
        let recommendedActivities = [];
        let description;

        switch(text){
            case 'Sunny':
                recommendedActivities = ['cycling','picnick'];
                description = "Sunny";
                break;
            
            case 'Rainy':
                recommendedActivities = ['museum','reading a book'];
                description = "Rainy";
                break;

            case 'Cloudy':
                recommendedActivities = ['Trekking', 'Indoor Sports'];
                description = "Cloudy";
                break;
            
            default:
                recommendedActivities = ['unknown'];
                description = "Unknown";
                break;
        }

        // console.log(response);
        const responseData = {
            cityName: city,
            temperature: temp_c,
            description,
            recommendedActivities
        };

        res.status(200).json(responseData);
    }
    catch(err){
        res.status(500).json({message:"Data not found for city"});
        // throw new Error(err);
    }
});

app.listen(PORT, ()=>{
    console.log("App is running");
})