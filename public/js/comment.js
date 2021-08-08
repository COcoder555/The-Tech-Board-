const newFormHandler = async (event) => {
    event.preventDefault();
  
    const content = document.querySelector('#content').value.trim();

    if (content) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({content}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        console.log(response);
        alert('Failed to leave comment!');
      }
    }
  };
  

  document
    .querySelector('#submit')
    .addEventListener('click', newFormHandler);
  