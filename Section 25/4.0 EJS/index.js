import express from 'express';

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    const today = new Date();
    const day = today.getDay();
    const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][day];

    let type = "a weekday";
    let adv = "it's time to work hard";

    if(day == 0 || day == 6){
        type = "the weekend";
        adv = "it's time to have some fun";
    }

    res.render("index.ejs", {
        dayName: dayName,
        dayType: type,
        advice: adv
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});