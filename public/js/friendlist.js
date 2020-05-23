
let friendarr=document.getElementById('friendarr').textContent
friendarr.textContent=JSON.parse(friendarr)
//console.log(JSON.parse(friendarr))
let friends=JSON.parse(friendarr)
console.log(friends)
// Make a container element for the list
let listContainer = document.getElementById('friendlist'),


 appenditem=(item)=>{
    node = document.createElement("LI");                 // Create a <li> node
    var textnode = document.createTextNode(item);         // Create a text node
    node.appendChild(textnode);                              // Append the text to <li>
    document.getElementById("list").appendChild(node);     // Append <li> to <ul> with id="myList"
}


for(i=0;i<friends.length;i++){

    appenditem(friends[i])
}

document.getElementById('friendarr').textContent=""