let currentDay = null;
let isContainerClick = true;
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
  for (let i = 0; i < range.length; i++) {
    let input = $("#inputTitle").val();
    // let data = sessionStorage.getItem(range[i]);
    let key = range[i] + "-1";
    let obj = {
      title: $("#inputTitle").val(),
      type: $("#inputGroupSelect").val(),
      reason: $("#message-text").val(),
      sdate: $("#start-date").val(),
      edate: $("#end-date").val(),
    };
    $("div[date='" + range[i] + "']").append(
      $(
        '<button id="' +
          key +
          '"  type="text" class="input-name" onclick="getId(this)" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>'
      )
        .html(input)
        .css("background-color", random)
    );
    sessionStorage.setItem(key, JSON.stringify(obj));
    // console.log(key);
    // else {
    //   let obj = JSON.parse(data);
    //   let objectLenght = Object.keys(obj).length;
    //   console.log(objectLenght);
    // }

    // $("div[date='" + range[i] + "']").append(
    //   $('<button type="text" class="input-name"></button>').css(
    //     "background-color",
    //     random
    //   )
    // );
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
  if (isContainerClick == true) {
    let startDate = $(this).children(0).attr("date");
    $("#start-date").val(startDate);
    let endDate = $(this).children(0).attr("date");
    $("#end-date").val(endDate);
  }
  isContainerClick = true;
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
  // let data = sessionStorage.getItem("29/03/2020");
  // if (data !== null) {
  //   data = JSON.parse(data);
  //   $("#inputTitle").val(data.title);
  //   $("#inputGroupSelect").val(data.type);
  //   $("#message-text").val(data.reason);
  //   $("#input-date").val(data.date);
  // }
});
function getId(btn) {
  let data = sessionStorage.getItem(btn.id);
  data = JSON.parse(data);
  $("#inputTitle").val(data.title);
  $("#inputGroupSelect").val(data.type);
  $("#message-text").val(data.reason);
  $("#start-date").val(data.sdate);
  $("#end-date").val(data.edate);
  isContainerClick = false;
}
