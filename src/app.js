import { http } from './http'
import { ui } from './ui'

//getpost

document.addEventListener('DOMContentLoaded', getPosts);

//submit post
document.querySelector('.post-submit').addEventListener('click', submitPosts);
//listen for delete posts
document.querySelector('#posts').addEventListener('click', deletePosts);
function getPosts() {
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err))
}

function submitPosts() {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  console.log(typeof title, typeof body)
  const data = {
    title,
    body
  }
  if (title === '') {
    ui.showAlert("Please enter Title", 'alert alert-danger');
  }
  else if (body === '') {
    ui.showAlert("Please enter Body of post", 'alert alert-danger');
  }
  else {

    http.post('http://localhost:3000/posts', data)
      .then((data) => {
        ui.showAlert('Post Added', 'alert alert-success');
        ui.clearFields();
        getPosts();
      })
      .catch(err => console.log(err))
  }

}
function deletePosts(e) {

  e.preventDefault();
  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    if (confirm('Are you sure')) {
      http.delete(`http://localhost:3000/posts/${id}`)
        .then((data) => {
          ui.showAlert('Post Deleted', 'alert alert-success');

          getPosts();
        })
        .catch(err => console.log(err))
    }
  }
}