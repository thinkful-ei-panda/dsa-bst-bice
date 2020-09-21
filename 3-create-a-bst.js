const BinarySearchTree=require ('./bst');

// 3. Create a BST class
function createBST(data){
	let BST=new BinarySearchTree;
	data.forEach(item=>BST.insert(item));
	return BST;
}
// console.log(createBST([3,1,4,6,9,2,5,7]));
// console.log(createBST(['E','A','S','Y','Q','U','E','S','T','I','O','N']));