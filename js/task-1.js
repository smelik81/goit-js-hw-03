function slugify(title) {
  let slug = title.toLowerCase().split(' ');
  return slug.join('-');
}
/* console.log(slugify('Arrays for begginers')); // "arrays-for-begginers"
console.log(slugify('English for developer')); // "english-for-developer"
console.log(slugify('Ten secrets of JavaScript')); // "ten-secrets-of-javascript"
console.log(slugify('How to become a JUNIOR developer in TWO WEEKS')); // "how-to-become-a-junior-developer-in-two-weeks" */

const fetchUser = document.querySelector('.btn-user');
const fetchPost = document.querySelector('.btn-post');
const list = document.querySelector('.list');

const searchParams = new URLSearchParams({
  _limit: 5,
});

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

let perPage = 10;
let page = 1;

/* function fetchUserReqestById(id) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}

function renderUsers(user) {
  const {
    name,
    email,
    phone,
    address: { street },
  } = user;
  const markup = `<li>
                <p><b>Name</b>: ${name}</p>
                <p><b>Email</b>: ${email}</p>
                <p><b>Phone</b>: ${phone}</p>
                <p><b>Adress</b>: ${street}</p>
              </li>`;
  userList.insertAdjacentHTML('beforeend', markup);
}

fetchUser.addEventListener('click', () => {
  const userId = 5;
  fetchUserReqestById(userId)
    .then(user => renderUsers(user))
    .catch(error => console.log(error));
}); */

const fetchUserRequest = async () => {
  const response = await axios.get('/users', {
    params: {
      _limit: 5,
    },
  });
  return response.data;
};

const renderUsers = users => {
  const markup = users
    .map(({ name, email, phone, address: { street } }) => {
      return `<li>
             <p><b>Name</b>: ${name}</p>
                <p><b>Email</b>: ${email}</p>
                <p><b>Phone</b>: ${phone}</p>
                <p><b>Adress</b>: ${street}</p>
                <hr />
        </li>`;
    })
    .join('');
  list.insertAdjacentHTML('beforeend', markup);
};

fetchUser.addEventListener('click', () => {
  if (list.innerHTML) {
    list.innerHTML = '';
  } else {
    fetchUserRequest()
      .then(users => renderUsers(users))
      .catch(error => console.log(error));
  }
});

const fetchPostsRequest = async () => {
  const response = await axios.get('/posts', {
    params: {
      _limit: perPage,
      _page: page,
    },
  });
  return response.data;
};

const renderPost = posts => {
  const markup = posts
    .map(post => {
      return `<li>
            <p><b>Body</b>: ${post.body}</p>
            <p><b>Title</b>: ${post.title}</p>
            <hr />
        </li>`;
    })
    .join('');
  list.insertAdjacentHTML('beforeend', markup);
};

fetchPost.addEventListener('click', async () => {
  try {
    const posts = await fetchPostsRequest();
    renderPost(posts);
    page += 1;
    if (page > 1 && page < 3) {
      fetchPost.textContent = 'Fetch more Posts';
    } else if (page === 3) {
      fetchPost.textContent = 'Show no more';
      fetchPost.disabled = true;
      fetchPost.style.backgroundColor = '#d3d3d3'; // сірий колір фону
      fetchPost.style.cursor = 'not-allowed';
    }
  } catch (error) {
    console.log(error.message);
  }
});
