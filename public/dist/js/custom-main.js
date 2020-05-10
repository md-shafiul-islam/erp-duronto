$(document).ready(function () {
  console.log("data Ready");
  $(".hightLightText").summernote();
  $(".description").summernote();
  $(".editor").summernote();

  $(".editor").on("change", function (e) {
    console.log("Edito Val" + $(".editor").val());
  });
});
