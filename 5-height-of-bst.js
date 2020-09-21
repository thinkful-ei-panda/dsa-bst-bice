const BinarySearchTree=require ('./bst');

// 5. Height of a BST

function bstHeight(BST){
	// Verify tree is not empty.
	if(BST.key===null){return 0;}
	// // Recursively traverse BST.
	if(BST.left&&BST.right){
		if(bstHeight(BST.left)>bstHeight(BST.right)){
			return bstHeight(BST.left)+1
		}
		else{return bstHeight(BST.right)+1;}
	}
	else if(BST.left){
		return bstHeight(BST.left)+1;
	}
	else if(BST.right){
		return bstHeight(BST.right)+1;
	}
	else{return 0;}
}
// Create the BST.
let BST=new BinarySearchTree;
[3,1,4,6,9,2,5,7].forEach(item=>BST.insert(item));

console.log(bstHeight(BST));