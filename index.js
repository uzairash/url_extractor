const events = require("events");
const eventEmitter = new events.EventEmitter();
const https = require("https");
const fetch = require("node-fetch");
const http = require("http");
const url = require("url");
const throttledqueue = require("throttled-queue");
const { connected } = require("process");
const { stripVTControlCharacters } = require("util");
const { countReset } = require("console");

// makeRequest();
function URL(hour, minutes, seconds) {
  var string_to_return = `https://lms.bahria.edu.pk/_uploaded_documents/assignments/submissions/01-134202-102-10975485853-06082023-${hour}${minutes}${seconds}pm.pdf`;

  if (hour < 10) {
    string_to_return = `https://lms.bahria.edu.pk/_uploaded_documents/assignments/submissions/01-134202-102-10975485853-06082023-0${hour}${minutes}${seconds}pm.pdf`;
  }
  if (minutes < 10) {
    string_to_return = `https://lms.bahria.edu.pk/_uploaded_documents/assignments/submissions/01-134202-102-10975485853-06082023-${hour}0${minutes}${seconds}pm.pdf`;
  }
  if (seconds < 10) {
    string_to_return = `https://lms.bahria.edu.pk/_uploaded_documents/assignments/submissions/01-134202-102-10975485853-06082023-${hour}${minutes}0${seconds}pm.pdf`;
  }
  if (hour < 10 && minutes < 10) {
    string_to_return = `https://lms.bahria.edu.pk/_uploaded_documents/assignments/submissions/01-134202-102-10975485853-06082023-0${hour}0${minutes}${seconds}pm.pdf`;
  }

  if (minutes < 10 && seconds < 10) {
    string_to_return = `https://lms.bahria.edu.pk/_uploaded_documents/assignments/submissions/01-134202-102-10975485853-06082023-${hour}0${minutes}0${seconds}pm.pdf`;
  }

  if (hour < 10 && seconds < 10) {
    string_to_return = `https://lms.bahria.edu.pk/_uploaded_documents/assignments/submissions/01-134202-102-10975485853-06082023-0${hour}${minutes}0${seconds}pm.pdf`;
  }
  if (hour < 10 && minutes < 10 && seconds < 10) {
    string_to_return = `https://lms.bahria.edu.pk/_uploaded_documents/assignments/submissions/01-134202-102-10975485853-06082023-0${hour}0${minutes}0${seconds}pm.pdf`;
  }
  return string_to_return;
}

////////////////////////////
function get_time() {
  let hour = 11;
  let minutes = 60;
  let seconds = 60;

  while (hour > 0 || minutes > 0 || seconds > 0) {
    let newurl = URL(hour, minutes, seconds);
    //console.log("send request  =>", newurl);
    fetch(
      `https://lms.bahria.edu.pk/_uploaded_documents/assignments/submissions/01-134202-102-10975485853-06082023-035745pm.pdf`
    )
      .then((response) => {
        if (response.status === 200) {
          console.log("after status 200 =>", newurl);
        }
      })
      .catch((error) => {
        // handle the error here
      });

    seconds--;
    if (seconds < 0) {
      seconds = 59;
      minutes--;
      if (minutes < 0) {
        minutes = 59;
        hour--;
      }
    }
  }

  console.log("working");
}

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("server open");

  const { pathname } = url.parse(req.url, true);
  if (pathname === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    get_time();
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening on port 8000");
});


