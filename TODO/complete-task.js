// Define the completeTask function
function completeTask(taskId) {
    // Send a POST request to the server to update task completion status
    fetch(`/complete-task/${taskId}`, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Refresh the page to update the task list
          location.reload();
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  