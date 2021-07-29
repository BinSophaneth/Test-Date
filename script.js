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
    $(".event-" + eventId).html($("#inputTitle").val());
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

