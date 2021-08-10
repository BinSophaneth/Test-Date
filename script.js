let eventCounter = sessionStorage.getItem("eventCounter");
if (!eventCounter) {
  eventCounter = 0;
}
let events = JSON.parse(sessionStorage.getItem("events"));
if (!events) {
  events = [];
}
for (let i = 0; i < events.length; i++) {
  renderEvent(events[i]);
}
$("#exampleModal").on("hidden.bs.modal", function () {
  $("#myform").trigger("reset");
});
function renderEvent(event) {
  let startDate = moment(event.sdate, "DD/MM/YYYY");
  let endDate = moment(event.edate, "DD/MM/YYYY");
  let countdate = endDate.diff(startDate, "days");
  let range = [];
  for (let i = 0; i < countdate + 1; i++) {
    range.push(startDate.format("DD/MM/YYYY"));
    startDate.add(1, "days");
  }

  for (i = 0; i < range.length; i++) {
    // console.log("a", $(".event-" + event.eventId).length);
    let countClass = $(".event-" + event.eventId).length;
    let checkSunday = moment(range[i], "DD/MM/YYYY").format("ddd");
    let btntag = $(
      '<button type="button" class="btn-title event-' +
        event.eventId +
        '" onclick="editEvent(' +
        event.eventId +
        ', event)"></button>'
    );
    // if () {
    //   console.log("1", btntag.prepend());
    //   btntag.prepend();
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
    $("div[date='" + range[i] + "']").append(
      btntag.css("background-color", event.color)
    );
  }
}
$("#myform").submit(function (e) {
  e.preventDefault();
  let letters = "0123456789ABCDEF";
  let random = "#";
  for (let i = 0; i < 6; i++) {
    random += letters[Math.floor(Math.random() * 16)];
  }
  let updateEvent = $("#updateEvent").val();
  if (updateEvent == "") {
    let event = {
      eventId: ++eventCounter,
      title: $("#inputTitle").val(),
      type: $("#inputGroupSelect").val(),
      reason: $("#message-text").val(),
      sdate: $("#start-date").val(),
      shour: $("#start-hour").val(),
      edate: $("#end-date").val(),
      ehour: $("#end-hour").val(),
      color: random,
    };
    events.push(event);
    renderEvent(event);
  } else {
    let objIndex = events.findIndex((obj) => obj.eventId == updateEvent);
    events[objIndex].title = $("#inputTitle").val();
    events[objIndex].type = $("#inputGroupSelect").val();
    events[objIndex].reason = $("#message-text").val();
    events[objIndex].sdate = $("#start-date").val();
    events[objIndex].shour = $("#start-hour").val();
    events[objIndex].edate = $("#end-date").val();
    events[objIndex].ehour = $("#end-hour").val();
    $(".event-" + updateEvent).remove();
    renderEvent(events[objIndex]);
  }
  sessionStorage.setItem("events", JSON.stringify(events));
  sessionStorage.setItem("eventCounter", eventCounter);
});
$(".date-container").click(function () {
  $("#updateEvent").val("");
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
  $('input[name="datetimes"]').daterangepicker({
    singleDatePicker: true,
    autoUpdateInput: true,
    timePicker: true,
    timePickerSeconds: true,
    timePicker24Hour: true,
    locale: {
      format: "HH:mm a",
    },
  });
  $('input[name="daterange"]').on("cancel.daterangepicker", function () {
    $(this).val("");
  });
});
function editEvent(eventId, e) {
  e.stopPropagation();
  let event = events.find((event) => event.eventId == eventId);
  $("#updateEvent").val(eventId);
  $("#inputTitle").val(event.title);
  $("#inputGroupSelect").val(event.type);
  $("#message-text").val(event.reason);
  $("#start-date").val(event.sdate);
  $("#start-hour").val(event.shour);
  $("#end-date").val(event.edate);
  $("#end-hour").val(event.ehour);
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
  $('input[name="datetimes"]').daterangepicker({
    singleDatePicker: true,
    autoUpdateInput: true,
    timePicker: true,
    timePickerSeconds: true,
    timePicker24Hour: true,
    locale: {
      format: "HH:mm a",
    },
  });
  $('input[name="daterange"]').on("cancel.daterangepicker", function () {
    $(this).val("");
  });
}
