const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.init = null;
  }
  root() {
    return this.init || null;
  }

  add(data) {
    const addNode = (node, data) => {
      if (!node) return new Node(data);
      if (node.data === data) return node;
      if (data < node.data) {
        node.left = addNode(node.left, data);
      } else {
        node.right = addNode(node.right, data);
      }
      return node;
    };
    this.init = addNode(this.init, data);
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    const findNode = (node, data) => {
      if (!node) return null;
      if (node.data === data) return node;
      if (data < node.data) {
        return findNode(node.left, data);
      } else {
        return findNode(node.right, data);
      }
    };
    return findNode(this.init, data);
  }

  remove(data) {
    const removeNode = (node, data) => {
      if (!node) return null;

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          return node.right;
        }

        if (!node.right) {
          return node.left;
        }

        let minRightNode = node.right;
        while (minRightNode.left) {
          minRightNode = minRightNode.left;
        }

        node.data = minRightNode.data;

        node.right = removeNode(node.right, minRightNode.data);
        return node;
      }
    };

    this.init = removeNode(this.init, data);
  }

  min() {
    if (!this.init) return null;
    const helper = (node) => {
      if (!node.left) return node.data;
      return helper(node.left);
    };
    return helper(this.init);
  }

  max() {
    if (!this.init) return null;
    const helper = (node) => {
      if (!node.right) return node.data;
      return helper(node.right);
    };
    return helper(this.init);
  }
}

module.exports = {
  BinarySearchTree,
};
