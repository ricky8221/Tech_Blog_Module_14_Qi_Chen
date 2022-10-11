const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const body = document.querySelector('textarea[name="post-body"]').value;

    if (title && body) {
        const response = await fetch('/api/post', {
            method:'POST',
            body: JSON.stringify({ 
                title,
                body
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok){
            document.location.replace('/dashboard');
        }else {
            alert('Failed to create project');
        }
    }
};

document
  .querySelector('#new-post-form')
  .addEventListener('submit', newFormHandler);