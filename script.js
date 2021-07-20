let currentDay = null;
// let events = null;
// $(function () {
//   $('input[id="input-date"]').daterangepicker({
//     autoUpdateInput: false,
//     locale: {
//       cancelLabel: "Clear",
//     },
//   });

//   $('input[id="input-date"]').on(
//     "apply.daterangepicker",
//     function (ev, picker) {
//       $(this).val(
//         picker.startDate.format("DD-MMMM-YYYY") +
//           " --> " +
//           picker.endDate.format("DD-MMMM-YYYY")
//       );
//     }
//   );
// });
// $('document').on('focus',"#input-date", function(){
//   $(this).daterangepicker();
// });​
$(function () {
  $('input[id="start-date"]').daterangepicker({
    locale: {
      format: "DD/MM/YYYY",
      cancelLabel: "Clear",
    },
    singleDatePicker: true,
    minDate: "29/03/2020",
    maxDate: "02/05/2020",
  });
  $('input[id="start-date"]').on(
    "cancel.daterangepicker",
    function (ev, picker) {
      $(this).val("");
    }
  );
});
$(function () {
  $('input[id="end-date"]').daterangepicker({
    locale: {
      format: "DD/MM/YYYY",
      cancelLabel: "Clear",
    },
    singleDatePicker: true,
    minDate: "29/03/2020",
    maxDate: "02/05/2020",
  });
  $('input[id="end-date"]').on("cancel.daterangepicker", function (ev, picker) {
    $(this).val("");
  });
});

$("#exampleModal").on("hidden.bs.modal", function () {
  $("#myform").trigger("reset");
});
$("#myform").submit(function (event) {
  event.preventDefault();
var range = [];
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
