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

$(document).ready(function() {
  $("#update").on("click", function(event) {
    event.preventDefault();
    const id = $("#id")
      .val()
      .trim();
    const titleUpdateInput = $("#title-update")
      .val()
      .trim();
    const bodyUpdateInput = $("#body-update")
      .val()
      .trim();

    const updatedWorkout = {
      title: titleUpdateInput,
      body: bodyUpdateInput
    };
    console.log(updatedWorkout);

    $("#id").val("");
    $("#title-update").val("");
    $("#body-update").val("");

    // Send the POST request.
    $.post("/update/" + id, updatedWorkout).then(() => {
      // Reload the page to get the updated list
      location.reload();
    });
  });
});

// $(document).ready(function() {
//   $(".delete-button").on("click", function(event) {
//     event.preventDefault();
//     const id = $(this).data("id");
//     console.log(id);

//     $.ajax({
//       method: "DELETE",
//       url: "/delete/" + id
//     }).then(res => {
//       if (res.status !== 200) {
//         console.log(
//           "Looks like there was a problem. Status code: " + res.status
//         );
//         return;
//       }
//     });
//   });
// });
