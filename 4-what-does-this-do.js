const BinarySearchTree=require ('./bst');

// 4. What does this program do?
function tree(t){
	let BST=new BinarySearchTree;
	t.forEach(item=>BST.insert(item));
    if(!BST){return 0;}
    return tree(BST.left) + BST.value + tree(BST.right);
}
console.log(tree([3,1,4,6,9,2,5,7]));
// returns the total value
// What is the runtime of this algorithm? A: O(log n)