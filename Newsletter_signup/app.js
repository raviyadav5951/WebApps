const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { json } = require("body-parser");

const app = express();
const mailchimp =require("@mailchimp/mailchimp_marketing");
const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
  apiKey: "70ba3d79133e750a415471e89f638ef4-us14",
  server: "us14",
});

//audience id/unique id/list_id=cbd7a239a7

const list_id="cbd7a239a7";
// mailchimp.setConfig({
//   apiKey: "70ba3d79133e750a415471e89f638ef4-us14",
//   server: "us14",
// });
//https://mailchimp.com/developer/guides/marketing-api-quick-start/
//To test the mailchimp integration call.

// async function run() {
//   const response = await mailchimp.ping.get();
//   console.log(response);
// }

// run();



//declare a public folder . its impact is in signup.html css and images folder
app.use(express.static("public"));

//used to get the data from post method
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

//https://mailchimp.com/developer/api/marketing/list-members/add-member-to-list/
app.post("/",function(req,res){

  var firstName=req.body.fname;
  var lastName=req.body.lname;
  var email=req.body.email;


  const run = async () => {
    const response = await client.lists.addListMember(list_id, {
      email_address: email,
      status: "cleaned",
      merge_fields:{
          FNAME:firstName,
          LNAME:lastName
      }
    });
    console.log(response);
  }; 
  
  run();

  // console.log(fname, lname, email);
});

app.listen(3000, function () {
  console.log("listen on 3000");
});

