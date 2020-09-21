class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }
	insert(key, value) {
		/*
		How does insertion perform? Essentially with insertion, 
		you have to iterate to the height of the tree. In the average case, 
		nodes are inserted equally on the left and right branches. 
		This produces what is known as a balanced tree. Because each row 
		in a balanced tree contains 2 times as many nodes as the row before, 
		the width grows exponentially with the number of nodes. This means 
		that conversely, the height must grow logarithmically with the number 
		of nodes. So the average case is O(log(n)).

		The worst case in a binary search tree occurs when the tree takes its 
		worst possible shape: the tree skews either left or right. A picture of 
		what a skewed tree looks like is shown below. If you look at it closely, 
		you'll notice that a skewed binary search tree is basically a linked list. 
		Therefore, you will need to iterate through each of those nodes in order 
		to get to the bottom of the tree to insert something. This makes the time 
		complexity O(n).
		*/
        
		// If the tree is empty then this key being inserted is the root node of the tree
        if (this.key == null) {
            this.key = key;
            this.value = value;
        }
        /* If the tree already exists, then start at the root, 
           and compare it to the key you want to insert.
           If the new key is less than the node's key 
           then the new node needs to live in the left-hand branch */
        else if (key < this.key) {
            /* If the existing node does not have a left child, 
               meaning that if the `left` pointer is empty, 
               then we can just instantiate and insert the new node 
               as the left child of that node, passing `this` as the parent */
            if (this.left == null) {
                this.left = new BinarySearchTree(key, value, this);
            }
            /* If the node has an existing left child, 
               then we recursively call the `insert` method 
               so the node is added further down the tree */
            else {
                this.left.insert(key, value);
            }
        }
        /* Similarly, if the new key is greater than the node's key 
           then you do the same thing, but on the right-hand side */
        else {
            if (this.right == null) {
                this.right = new BinarySearchTree(key, value, this);
            }
            else {
                this.right.insert(key, value);
            }
        }
    }
    _findMin() {
        if (!this.left) {
            return this;
        }
        return this.left._findMin();
    }
	find(key) {
		/*
		The average time complexity of finding something in a BST would 
		require traversing the height of a balanced tree and would be 
		O(log(n)). Just like insert, the worst case for finding something 
		in a BST will occur when the tree is skewed left or right and you 
		are searching for the node at the bottom where everything is inserted 
		to 1 side, so it is O(n). The best case is that the node you are 
		trying to find is the root node, which would be O(1).
		*/
        
		// If the item is found at the root then return that value
        if (this.key == key) {
            return this.value;
        }
        /* If the item you are looking for is less than the root 
           then follow the left child.
           If there is an existing left child, 
           then recursively check its left and/or right child
           until you find the item */
        else if (key < this.key && this.left) {
            return this.left.find(key);
        }
        /* If the item you are looking for is greater than the root 
           then follow the right child.
           If there is an existing right child, 
           then recursively check its left and/or right child
           until you find the item */
        else if (key > this.key && this.right) {
            return this.right.find(key);
        }
        // You have searched the tree and the item is not in the tree
        else {
            throw new Error('Key Error');
        }
    }
	_replaceWith(node) {
        if (this.parent) {
            if (this == this.parent.left) {
                this.parent.left = node;
            }
            else if (this == this.parent.right) {
                this.parent.right = node;
            }

            if (node) {
                node.parent = this.parent;
            }
        }
        else {
            if (node) {
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            }
            else {
                this.key = null;
                this.value = null;
                this.left = null;
                this.right = null;
            }
        }
    }
	remove(key) {
		/*
		For removal from a tree, you can use similar logic to insertion and 
		retrieval to show that the best case is O(1), the average case is 
		O(log(n)), and the worst case is O(n).
		*/
        
		if (this.key == key) {
            if (this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key);
            }
            /* If the node only has a left child, 
               then you replace the node with its left child */
            else if (this.left) {
                this._replaceWith(this.left);
            }
            /* And similarly if the node only has a right child 
               then you replace it with its right child */
            else if (this.right) {
                this._replaceWith(this.right);
            }
            /* If the node has no children then
               simply remove it and any references to it 
               by calling "this._replaceWith(null)" */
            else {
                this._replaceWith(null);
            }
        }
        else if (key < this.key && this.left) {
            this.left.remove(key);
        }
        else if (key > this.key && this.right) {
            this.right.remove(key);
        }
        else {
            throw new Error('Key Error');
        }
    }
}
module.exports=BinarySearchTree;