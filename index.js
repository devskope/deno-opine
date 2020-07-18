import opine from 'https://deno.land/x/opine@main/mod.ts';

import loadReq from './middleware.ts';

const app = opine();

const responses = await Promise.all([
  fetch('https://jsonplaceholder.typicode.com/todos'),
  fetch('https://jsonplaceholder.typicode.com/posts'),
  fetch('https://jsonplaceholder.typicode.com/comments'),
  fetch('https://jsonplaceholder.typicode.com/users'),
]);

const [todos, posts, comments, users] = responses.map(
  async (r) => await r.json()
);

app.use(loadReq);

app.use('/all', async (req, res) => {
  Object.assign(req.payload, {
    todos: await todos,
    posts: await posts,
    comments: await comments,
    users: await users,
  });
  res.setStatus(200).json({ data: req.payload });
});

app.listen(3000);
