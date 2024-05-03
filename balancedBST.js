// balanced binary search tree

const Node = require("./node");
const quick_sort = require("./quickSort");
const { levelOrder, inOrder, preOrder, postOrder } = require("./traversals");
const generateArray = require("./generateArray");

class Tree {
  constructor(arr) {
    quick_sort(arr); // sort the array
    arr = [...new Set(arr)]; // remove duplicates
    this.root = this.buildTree(arr, 0, arr.length - 1);
  }

  buildTree(arr, start, end) {
    if (start > end) {
      return null;
    }

    let mid = Math.floor((start + end) / 2);
    let node = new Node(arr[mid]);

    node.left = this.buildTree(arr, start, mid - 1);
    node.right = this.buildTree(arr, mid + 1, end);

    return node;
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  insert(value) {
    let newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  deleteItem(value) {
    this.root = this.deleteNode(this.root, value);
  }

  find(value) {
    return this.findNode(this.root, value);
  }

  height(node) {
    if (node === null) {
      return 0;
    } else {
      let leftHeight = this.height(node.left);
      let rightHeight = this.height(node.right);

      if (leftHeight > rightHeight) {
        return leftHeight + 1;
      } else {
        return rightHeight + 1;
      }
    }
  }

  depth(node, root = this.root, depth = 0) {
    if (root === null) {
      return -1;
    }
    if (root === node) {
      return depth;
    }

    let left = this.depth(node, root.left, depth + 1);
    if (left !== -1) {
      return left;
    }

    return this.depth(node, root.right, depth + 1);
  }

  isBalanced(node = this.root) {
    if (node === null) {
      return true;
    }

    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    return (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    );
  }

  rebalance() {
    let arr = [];
    inOrder(this.root, (node) => arr.push(node.data));
    this.root = this.buildTree(arr, 0, arr.length - 1);
  }

  insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else if (newNode.data > node.data) {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
    // do nothing if newNode.data is equal to node.data
  }

  deleteNode(node, value) {
    if (node === null) {
      return null;
    } else if (value < node.data) {
      node.left = this.deleteNode(node.left, value);
      return node;
    } else if (value > node.data) {
      node.right = this.deleteNode(node.right, value);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }
      const aux = this.findMinNode(node.right);
      node.data = aux.data;
      node.right = this.deleteNode(node.right, aux.data);
      return node;
    }
  }

  findMinNode(node) {
    if (node.left === null) {
      return node;
    } else {
      return this.findMinNode(node.left);
    }
  }

  findNode(node, value) {
    if (node === null) {
      return null;
    } else if (value < node.data) {
      return this.findNode(node.left, value);
    } else if (value > node.data) {
      return this.findNode(node.right, value);
    } else {
      return node;
    }
  }
}

const array = generateArray(99);
const tree = new Tree(array);

console.log(tree.isBalanced());

const levelOrderResult = levelOrder(tree.root);
console.log(levelOrderResult);

const inOrderResult = inOrder(tree.root);
console.log(inOrderResult);

const preOrderResult = preOrder(tree.root);
console.log(preOrderResult);

const postOrderResult = postOrder(tree.root);
console.log(postOrderResult);

tree.insert(101);
tree.insert(102);
tree.insert(103);
tree.insert(104);

console.log(tree.isBalanced());

tree.rebalance();

console.log(tree.isBalanced());

const levelOrderResult2 = levelOrder(tree.root);
console.log(levelOrderResult2);

const inOrderResult2 = inOrder(tree.root);
console.log(inOrderResult2);

const preOrderResult2 = preOrder(tree.root);
console.log(preOrderResult2);

const postOrderResult2 = postOrder(tree.root);
console.log(postOrderResult2);

tree.prettyPrint(tree.root);
