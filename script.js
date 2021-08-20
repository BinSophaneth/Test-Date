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
  let count = 17;
  let resultTitle =
    event.title.slice(0, count) + (event.title.length > count ? "..." : "");
  let range = [];
  for (let i = 0; i < countdate + 1; i++) {
    range.push(startDate.format("DD/MM/YYYY"));
    startDate.add(1, "days");
  }
  for (i = 0; i < range.length; i++) {
    const buttonLength = $("div[date='" + range[i] + "']").children().length;
    let ButtonEvents = [];
    for (let k = 0; k < buttonLength; k++) {
      let tmp = $("div[date='" + range[i] + "']")
        .children()
        .eq(k)
        .attr("class");
      if (tmp !== undefined) {
        let tmpArr = tmp.split(" ").filter((O) => O.includes("event"));
        ButtonEvents = ButtonEvents.concat(tmpArr);
      }
    }
    // let checkSunday = moment(range[i], "DD/MM/YYYY").format("ddd");
    let btntag = $(
      '<button type="button" class="btn-title event-' +
        event.eventId +
        '" onclick="editEvent(' +
        event.eventId +
        ', event)"></button>'
    );
    const btns = $("div[date='" + range[i] + "']>button:eq(1)");
    btns.after('<div class="show-more"> More </div>');
    // btns.addClass("hide");
    if (i < range.length - 1 && i > 0) {
      btntag.addClass("mid-day");
    }
    if (i == 0) {
      if (range.length == 1) {
        btntag.addClass("one-day");
      } else {
        btntag.addClass("first-day");
      }
      btntag.html(
        "Title:" +
          " " +
          resultTitle +
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
    if (ButtonEvents.length > 0) {
      for (var j = 0; j < ButtonEvents.length; j++) {
        const btnRange = $("div[date='" + range[i] + "']>button:eq(" + j + ")");
        const classEventName = ButtonEvents[j];
        const sDate1Arr = ButtonEvents[j].split("-");
        let id1 = events[Number(sDate1Arr[1]) - 1].eventId;
        let id2 = event.eventId;
        let sDate1 = moment(
          events[Number(sDate1Arr[1]) - 1].sdate,
          "DD/MM/YYYY"
        );
        let sDate2 = moment(event.sdate, "DD/MM/YYYY");
        if ($("." + classEventName).length < range.length) {
          btnRange.before(btntag.css("background-color", event.color));
          break;
        } else if (j == ButtonEvents.length - 1) {
          if ($("." + classEventName).length === range.length) {
            if (sDate1.isSameOrBefore(sDate2) && id1 < id2) {
              btnRange.after(btntag.css("background-color", event.color));
            } else {
              btnRange.before(btntag.css("background-color", event.color));
            }
          } else {
            btnRange.after(btntag.css("background-color", event.color));
          }
        }
      }
    } else {
      $("div[date='" + range[i] + "']").append(
        btntag.css("background-color", event.color)
      );
    }
  }
}

$("#myform").submit(function (e) {
  e.preventDefault();
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
      color: $("#colorPick").val(),
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
    events[objIndex].color = $("#colorPick").val();
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
  $('input[name="daterange"]').on("cancel.daterangepicker", function () {
    $(this).val("");
  });
  $('input[name="timepicker"]')
    .daterangepicker({
      timePicker: true,
      singleDatePicker: true,
      timePickerIncrement: 1,
      locale: {
        format: "h:mm A",
      },
    })
    .on("show.daterangepicker", function (ev, picker) {
      picker.container.find(".calendar-table").hide();
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
  $("#colorPick").val(event.color);
  $('input[name="daterange"]').daterangepicker({
    locale: {
      format: "DD/MM/YYYY",
    },
    singleDatePicker: true,
    autoUpdateInput: true,
    minDate: "29/03/2020",
    maxDate: "02/05/2020",
  });
  $('input[name="timepicker"]')
    .daterangepicker({
      timePicker: true,
      singleDatePicker: true,
      timePickerIncrement: 1,
      locale: {
        format: "h:mm A",
      },
    })
    .on("show.daterangepicker", function (ev, picker) {
      picker.container.find(".calendar-table").hide();
    });
}
