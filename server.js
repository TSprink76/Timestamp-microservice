import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line

function isValid(input){
  const parsedInt = parseInt(input);
  if(!isNaN(Date.parse(input))){
    return true
  }
  if(parsedInt){
    return !isNaN(new Date(parsedInt).getTime())
  }

}

app.get("/api", (req, res) => {
  const currentDate = new Date(Date.now())
      res.json({
        unix: currentDate.getTime(),
        utc: currentDate.toUTCString()
      })
})

app.get("/api/:date", (req, res) => {
  const date_string = req.params.date
  if(!isValid(date_string)){
    res.json({
      error: "Invalid Date"
    })
  }
  else if(isValid(date_string)){
    let dateObject
    if(!isNaN(Date.parse(date_string))){
      dateObject = new Date(date_string)
    }
    else{
      const parsedVal = parseInt(date_string)
      dateObject = new Date(parsedVal)
    }
    res.json({
        unix: dateObject.getTime(),
        utc: dateObject.toUTCString()
      })

  }
})
// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
