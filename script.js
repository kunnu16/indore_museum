
const ref=firebase.database().ref('Entry');

var val="";
var entry={
    name:"",
    id:"",
    des:""
};

ref.on('value', (snapshot) => {
    val="";
    snapshot.forEach(function(childSnapshot) {
         entry = childSnapshot.val();
         val+=entry.name+"\n";
       
      });
      console.log(val);
      data.value=val;
   
   
  });
function upload(){

      
   var name=document.getElementById("itemName").value;
   var id=document.getElementById("itemID").value;
   var des=document.getElementById("itemDes").value;

   if(name == "" || id == "" || des==""){
    alert("enter value");
   }else{
      
    
   entry.name=name;
   entry.id=id;
   entry.des=des
    ref.push(entry).then(function(data){
       console.log("Item Submitted");
    }).catch(function(error){
        alert(error);
        console.error(error);
    })
}
}
