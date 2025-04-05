const fetchProduct = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  return data;
};

const newPost = async (data) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const result = response.json();
  return result;
};

const updatePost = async (data) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${data.id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
  const result = response.json();
  return result;
};

export { fetchProduct, newPost, updatePost };
