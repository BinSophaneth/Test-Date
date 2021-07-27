let currentDay = null;
let isContainerClick = true;
let currentId = null;
$("#exampleModal").on("hidden.bs.modal", function () {
  $("#myform").trigger("reset");
});
$("#myform").submit(function (event) {
  event.preventDefault();
  let startdate = moment($("#start-date").val(), "DD/MM/YYYY");
  let enddate = moment($("#end-date").val(), "DD/MM/YYYY");
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
  var letters = "0123456789ABCDEF";
  var random = "#";
  for (var i = 0; i < 6; i++) {
    random += letters[Math.floor(Math.random() * 16)];
  }
  for (let i = 0; i < range.length; i++) {
    let title = $("#inputTitle").val();
    // let data = sessionStorage.getItem(range[i]);
    // let key = range[i] + "-1";
    let key = $(".dateid").length;
    if (currentId !== null) {
      key = currentId;
    }
    let obj = {
      title,
      type: $("#inputGroupSelect").val(),
      reason: $("#message-text").val(),
      sdate: $("#start-date").val(),
      edate: $("#end-date").val(),
    };
    console.log(currentId, isContainerClick);
    if (currentId == null || isContainerClick) {
      $("div[date='" + range[i] + "']").append(
        $(
          '<button id="' +
            key +
            '"  type="text" class="input-name dateid" onclick="getId(this)" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>'
        )
          .html(title)
          .css("background-color", random)
      );
    } else {
      $("#" + currentId).text(title);
    }
    sessionStorage.setItem(key, JSON.stringify(obj));
    currentId = null;
    isContainerClick = true;
  }
});
$(".date-container").click(function () {
  let passedID = $(this).children(0).attr("id");
  if (isContainerClick == true) {
    let startDate = $(this).children(0).attr("date");
    $("#start-date").val(startDate);
    let endDate = $(this).children(0).attr("date");
    $("#end-date").val(endDate);
  }

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

  currentDay = passedID;
});
function getId(btn) {
  let data = sessionStorage.getItem(btn.id);
  currentId = btn.id;
  data = JSON.parse(data);
  $("#inputTitle").val(data.title);
  $("#inputGroupSelect").val(data.type);
  $("#message-text").val(data.reason);
  $("#start-date").val(data.sdate);
  $("#end-date").val(data.edate);
  isContainerClick = false;
}
$("#close").click(function () {
  isContainerClick = true;
});

