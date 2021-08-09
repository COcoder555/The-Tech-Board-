const newFormHandler = async (event) => {
    event.preventDefault();
  
    const content = document.querySelector('#content').value.trim();
    const postId = document.querySelector('#postID').textContent;

console.log(typeof postId);
console.log(content);
    if (content) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({content, postId}),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.reload();
        console.log(response);
      } else {
        console.log(response);
        alert('Failed to leave comment!');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      console.log(id);
      const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete comment');
      }
    }
  };
  const upButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to update comment');
      }
    }
  };
  
  
  document
    .querySelector('#submit')
    .addEventListener('click', newFormHandler);
    document
    .querySelector('.commentDelete')
    .addEventListener('click', delButtonHandler);
    document
    .querySelector('.commentUpdate')
    .addEventListener('click', upButtonHandler);
  