let currentDay = null;
$("#exampleModal").on("hidden.bs.modal", function () {
  $("#myform").trigger("reset");
});
$("#myform").submit(function (event) {
  event.preventDefault();
  let startdate = moment($("#start-date").val(), "DD/MM/YYYY");
  let enddate = moment($("#end-date").val(), "DD/MM/YYYY");
  let countdate = enddate.diff(startdate, "days");
  // console.log(enddate.diff(startdate, "days"));
  // console.log(a.diff(b, 'days'));
  var range = [];
  if (startdate == enddate) {
    range.push(startdate.format("DD/MM/YYYY"));
  } else {
    for (var i = 0; i < countdate + 1; i++) {
      range.push(startdate.format("DD/MM/YYYY"));
      startdate.add(1, "days");
    }
  }
  for (let i = 0; i < range.length; i++) {
      let back = [
        "#E82B00",
        "#df7d5a",
        "#EA1EFF",
        "#484848",
        "#A2DA74",
        "#C097F2",
        "#64d0da",
        "#3281ac",
      ];
      let random = back[Math.floor(Math.random() * back.length)];
      $("div[date='" + range[i] + "']").append(
        $('<button type="text" class="input-name">Edit here</button>').css(
          "background-color",
          random
        )
      );
    }
  // console.log(range[0]);
  // let tmpObj = {
  //   title: $("#inputTitle").val(),
  //   type: $("#inputGroupSelect").val(),
  //   reason: $("#message-text").val(),
  //   date: $("#input-date").val(),
  // };
  // sessionStorage.setItem("29/03/2020", JSON.stringify(tmpObj));
});
// sessionStorage.setItem('lastname','Smith');
$(".date-container").click(function () {
  let passedID = $(this).children(0).attr("id");
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

  currentDay = passedID;
  let data = sessionStorage.getItem("29/03/2020");
  if (data !== null) {
    data = JSON.parse(data);
    $("#inputTitle").val(data.title);
    $("#inputGroupSelect").val(data.type);
    $("#message-text").val(data.reason);
    $("#input-date").val(data.date);
  }
});
