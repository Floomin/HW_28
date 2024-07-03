/* This JavaScript code is setting up an event listener for the 'DOMContentLoaded' event, which
triggers when the initial HTML document has been completely loaded and parsed. Inside this event
listener function, the code is performing the following actions: */
document.addEventListener('DOMContentLoaded', () => {

    const postForm = document.getElementById('postForm');
    const postConteiner = document.getElementById('post');
    const commentsConteiner = document.getElementById('comments');

    /* This code block is setting up an event listener for the 'submit' event on the `postForm` element.
    When the form is submitted, it prevents the default form submission behavior using
    `event.preventDefault()`. */
    postForm.addEventListener('submit', event => {
        event.preventDefault();

        postConteiner.innerHTML = '';
        commentsConteiner.innerHTML = '';

        const postId = document.getElementById('postId').value;


        /* This block of code is making a series of HTTP requests using the `fetch` API to retrieve
        data from a REST API endpoint. Here's a breakdown of what it does: */
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(post => {
                postConteiner.innerHTML = `
                 <h2>${post.title}</h2>
                 <p>${post.body}</p>
                 <button id="getComments">Get comments</button>
             `;
                document.getElementById('getComments').addEventListener('click', () => {
                    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then(comments => {
                            commentsConteiner.innerHTML = '';
                            comments.forEach(comment => {
                                commentsConteiner.innerHTML += `
                                        <div class="comment">
                                          <p>${comment.name}</p>
                                          <p>${comment.email}</p>
                                          <p>${comment.body}</p>
                                        </div>
                                    `;
                            })
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                }
                )
                    .catch(error => {
                        postConteiner.innerHTML = '<p>${error.message}</p>';
                    });
            });
    });
});
