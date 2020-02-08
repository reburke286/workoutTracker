$(document).ready(function() {
  $("#submit").on("click", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    const titleInput = $("#title")
      .val()
      .trim();
    const bodyInput = $("#body")
      .val()
      .trim();

    // Won't submit the alert if we are missing a client, metal or price
    if (!titleInput || !bodyInput) {
      alert(
        "Please check that you've filled out all required fields correctly."
      );
      return;
    }

    const newWorkout = {
      title: titleInput,
      body: bodyInput
    };
    console.log(newWorkout);

    $("#title").val("");
    $("#body").val("");

    // Send the POST request.
    $.post("/add", newWorkout).then(() => {
      // Reload the page to get the updated list
      location.reload();
    });
  });
});
