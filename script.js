let eventCounter = sessionStorage.getItem("eventCounter");
if (!eventCounter) {
  eventCounter = 0;
}
let events = JSON.parse(sessionStorage.getItem("events"));
if (!events) {
  events = [];
}
for (i = 0; i < events.length; i++) {
  renderEvent(events[i]);
}
// let currentDay = null;
// let isContainerClick = true;
let currentId = null;
$("#exampleModal").on("hidden.bs.modal", function () {
  $("#myform").trigger("reset");
});
function renderEvent(event) {
  let startdate = moment(event.sdate, "DD/MM/YYYY");
  let enddate = moment(event.edate, "DD/MM/YYYY");
  let countdate = enddate.diff(startdate, "days");
  var range = [];
  if (startdate == enddate) {
    range.push(startdate.format("DD/MM/YYYY"));
  } else {
    for (var i = 0; i < countdate + 1; i++) {
      range.push(startdate.format("DD/MM/YYYY"));
      startdate.add(1, "days");
    }
  }

  for (i = 0; i < range.length; i++) {
    $("div[date='" + range[i] + "']").append(
      $(
        '<button type="text" class="input-name event-' +
          event.eventId +
          '" onclick="editEvent(' +
          event.eventId +
          ', event)"></button>'
      )
        .html(event.title)
        .css("background-color", event.color)
    );
  }
}
$("#myform").submit(function (e) {
  e.preventDefault();
  let eventId = $("input[name='eventId']").val();
  console.log("1", eventId);
  var letters = "0123456789ABCDEF";
  var random = "#";
  for (var i = 0; i < 6; i++) {
    random += letters[Math.floor(Math.random() * 16)];
  }
  console.log(events);
  // let existEvent = events.find((event) => event.eventId == eventId);
  if (eventId == "") {
    let event = {
      eventId: ++eventCounter,
      title: $("#inputTitle").val(),
      type: $("#inputGroupSelect").val(),
      reason: $("#message-text").val(),
      sdate: $("#start-date").val(),
      edate: $("#end-date").val(),
      color: random,
    };
    events.push(event);
    renderEvent(event);
  } else {
    let objIndex = events.findIndex((obj) => obj.eventId == eventId);
    events[objIndex].title = $("#inputTitle").val();
    events[objIndex].type = $("#inputGroupSelect").val();
    events[objIndex].reason = $("#message-text").val();
    events[objIndex].sdate = $("#start-date").val();
    events[objIndex].edate = $("#end-date").val();
//     $(".event-" + eventId).html($("#inputTitle").val());
    $(".event-" + eventId).remove();
    renderEvent(events[objIndex]);
  }
  sessionStorage.setItem("events", JSON.stringify(events));
  sessionStorage.setItem("eventCounter", eventCounter);
});
$(".date-container").click(function () {
  $("input[name='eventId']").val("");
  let startDate = $(this).children(0).attr("date");
  $("#start-date").val(startDate);
  let endDate = $(this).children(0).attr("date");
  $("#end-date").val(endDate);
  $('input[name="daterange"]').daterangepicker({
    locale: {
      format: "DD/MM/YYYY",
      cancelLabel: "Clear",
    },
    singleDatePicker: true,
    autoUpdateInput: true,
    minDate: "29/03/2020",
    maxDate: "02/05/2020",
  });
  $('input[id="end-date"]').on("cancel.daterangepicker", function (ev, picker) {
    $(this).val("");
  });
});
function editEvent(eventId, e) {
  e.stopPropagation();
  let event = events.find((event) => event.eventId == eventId);
  console.log($("input[name='eventId']").val());
  $("input[name='eventId']").val(eventId);
  $("#inputTitle").val(event.title);
  $("#inputGroupSelect").val(event.type);
  $("#message-text").val(event.reason);
  $("#start-date").val(event.sdate);
  $("#end-date").val(event.edate);
}
for (i = 0; i < range.length; i++) {
    var checkSunday = moment(range[i], "DD/MM/YYYY").format("ddd");
    var tmpTag = $(
      '<button type="text" class="input-name event-' +
        event.eventId +
        '" onclick="editEvent(' +
        event.eventId +
        ', event)"></button>'
    );
    if (i < range.length - 1 && i > 0 && checkSunday !== "Sun") {
      tmpTag.addClass("width");
    }
    if (i == 0 || checkSunday === "Sun") {
      if (range.length == 1) {
        tmpTag.addClass("one-day");
      } else {
        tmpTag.addClass("first-day");
      }
      tmpTag.html("Title:" + " " + event.title);
    }

    if (i == range.length - 1 && range.length > 1) {
      tmpTag.addClass("last-day");
    }

    $("div[date='" + range[i] + "']").append(
      tmpTag.css("background-color", event.color)
    );
  }
}
for (i = 0; i < range.length; i++) {
    // console.log("aa", range.length);

    const buttonLength = $("div[date='" + range[i] + "']").children().length;
    var ButtonEvents = [];
    console.log({ buttonLength });
    for (var k = 0; k < buttonLength; k++) {
      var tmp = $("div[date='" + range[i] + "']")
        .children()
        .eq(k)
        .attr("class");
      if (tmp != undefined) {
        var tmpArr = tmp.split(" ").filter((O) => O.includes("event"));
        console.log({ tmpArr });
        ButtonEvents = ButtonEvents.concat(tmpArr);
        console.log({ ButtonEvents });
      }
    }
    // console.log({ ButtonEvents });
    // let countClass = $(".event-" + event.eventId).length;
    // console.log("a", countClass.attr("class"));
    let checkSunday = moment(range[i], "DD/MM/YYYY").format("ddd");
    let btntag = $(
      '<button type="button" class="btn-title event-' +
        event.eventId +
        '" onclick="editEvent(' +
        event.eventId +
        ', event)"></button>'
    );
    // let rangeId = range.find((event) => event.eventId == eventId);
    // console.log(rangeId);
    // if (rangeId !== "") {
    //   console.log(btntag);
    // }
    if (i < range.length - 1 && i > 0) {
      btntag.addClass("mid-day");
    }
    if (i == 0 || checkSunday == "Sun") {
      if (range.length == 1) {
        btntag.addClass("one-day");
      } else {
        btntag.addClass("first-day");
      }
      btntag.html(
        "Title:" +
          " " +
          event.title +
          "<br />" +
          "Time:" +
          " " +
          event.shour +
          " - " +
          event.ehour
      );
    }
    if (i == range.length - 1 && i > 1) {
      btntag.addClass("last-day");
    }
    if (range.length == 2 && i == 1) {
      btntag.addClass("second-day");
    }
    // if (checkSunday == "Sun") {
    //   btntag.html("Title:" + " " + event.title);
    // }
    console.log({ ButtonEvents });
    if (ButtonEvents.length > 0) {
      for (var j = 0; j < ButtonEvents.length; j++) {
        const classEventName = ButtonEvents[j - 1];
        console.log("aaaa", $("." + classEventName).length, range.length);
        if ($("." + classEventName).length < range.length) {
          $("div[date='" + range[i] + "']>button:eq(" + j + ")").after(
            btntag.css("background-color", event.color)
          );
        }
      }
    } else {
      $("div[date='" + range[i] + "']").append(
        btntag.css("background-color", event.color)
      );
    }
  }
