// balanced binary search tree

const Node = require("./node");
const quick_sort = require("./quickSort");
const levelOrder = require("./traversals");
const inOrder = require("./traversals");
const preOrder = require("./traversals");
const postOrder = require("./traversals");

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

const tree = new Tree([15, 10, 20, 8, 12, 16, 25]);

const values = postOrder(tree.root);
console.log(values);

tree.prettyPrint(tree.root);
