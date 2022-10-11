const commetFormHandler = async (event) => {
    event.preventDefault();

    const comment_id = document.querySelector('input[name="post-id"]').value;
    const body = document.querySelector('textarea[name="comment-body"]').value;

    if (comment_id && body) {
        const response = await fetch('/api/comment', {
            method:'POST',
            body: JSON.stringify({ 
                comment_id,
                body
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log(response);
        if (response.ok){
            document.location.reload();
        }else {
            alert('Failed to create project');
        }
    }
};

document
  .querySelector('#new-comment-form')
  .addEventListener('submit', commetFormHandler);