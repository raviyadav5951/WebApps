const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { json } = require("body-parser");

const app = express();
const mailchimp = require("@mailchimp/mailchimp_marketing");
const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
  apiKey: "YOUR_MAILCHIMP_API_KEY",
  server: "us14",
});

//audience id/unique id/list_id=cbd7a239a7

const list_id="YOUR_MAILCHIMP_LIST_ID/AUDIENCE_ID/UNIQUE_ID"; 

//For testing the integration uncomment this method
// mailchimp.setConfig({
//   apiKey: "YOUR_MAILCHIMP_API_KEY",

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

//home route
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

//https://mailchimp.com/developer/api/marketing/list-members/add-member-to-list/
app.post("/", function (req, res) {
  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var email = req.body.email;

  const run = async () => {
    const response = await client.lists.addListMember(list_id, {
      email_address: email,
      status: "cleaned",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      },
    });

    console.log("response status="+response.status);
    if (response.status === ( 400 || 401 || 403 || 404)) {
      console.log("status failure");
      res.sendFile(__dirname + "/failure.html");
    } else {
      console.log("status success");
      res.sendFile(__dirname + "/success.html");
    }
    console.log(response);
  };

  run();

  // console.log(fname, lname, email);
});


//this method will be called when we press try again butt
app.post("/failure",function(req,res){

  res.redirect("/");
});

app.listen(3000, function () {
  console.log("listen on 3000");
});
