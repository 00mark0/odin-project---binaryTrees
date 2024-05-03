// level order traversal
function levelOrder(node, callback) {
  const queue = [node];
  const result = [];

  while (queue.length) {
    const current = queue.shift();

    if (current) {
      if (callback) {
        callback(current);
      } else {
        result.push(current.data);
      }

      queue.push(current.left);
      queue.push(current.right);
    }
  }

  if (!callback) {
    return result;
  }
}

// in-order traversal
const walk2 = (curr, callback, path = []) => {
  // base case
  if (!curr) return path;

  // recurse
  walk2(curr.left, callback, path);

  if (callback) {
    callback(curr);
  } else {
    path.push(curr.data);
  }

  walk2(curr.right, callback, path);

  return path;
};

const inOrder = (head, callback) => walk2(head, callback, []);

// pre-order traversal
const walk = (curr, callback, path = []) => {
  // base case
  if (!curr) return path;

  // pre
  if (callback) {
    callback(curr);
  } else {
    path.push(curr.data);
  }

  // recurse
  walk(curr.left, callback, path);
  walk(curr.right, callback, path);

  // post
  return path;
};

const preOrder = (head, callback) => {
  return walk(head, callback, []);
};

// post-order traversal
const walk3 = (curr, callback, path = []) => {
  // base case
  if (!curr) return path;

  // recurse
  walk3(curr.left, callback, path);
  walk3(curr.right, callback, path);

  if (callback) {
    callback(curr);
  } else {
    path.push(curr.data);
  }

  return path;
};

const postOrder = (head, callback) => {
  return walk3(head, callback, []);
};

module.exports = {
  levelOrder,
  inOrder,
  preOrder,
  postOrder,
};
