const ref = firebase.database().ref("Entry");
const storageRef = firebase.storage().ref("Muesum");

var val = "";
var entry = {
  name: "",
  id: "",
  des: "",
  imgLink: "",
};

ref.on("value", (snapshot) => {
  val = "";
  var count = 0;
  snapshot.forEach(function (childSnapshot) {
    count++;
    entry = childSnapshot.val();
    val += count + ". " + entry.name + " " + entry.imgLink + "\n";
    var img = document.createElement("img");

    img.src = entry.imgLink;
    img.style.width = "156px";
    document.body.appendChild(img);
  });
  if (val == "") {
    val = "no data";
  }
  console.log(val);
  data.value = val;
});
function upload() {
  var name = document.getElementById("itemName").value;
  var id = document.getElementById("itemID").value;
  var des = document.getElementById("itemDes").value;
  const file = document.querySelector("#photo").files[0];

  if (name == "" || id == "" || des == "" || file.name == "") {
    alert("enter value");
  } else {
    const fName = new Date() + "_" + file.name;

    const metadata = {
      contentType: file.type,
    };

    const task = storageRef.child(fName).put(file, metadata);

    task
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .then((url) => {
        console.log(url);
        entry.imgLink = url;
        alert("Image Uploaded SuccessFullyy");
        entry.name = name;
        entry.id = id;
        entry.des = des;
        ref
          .push(entry)
          .then(function (data) {
            alert("Item Submitted");
          })
          .catch(function (error) {
            alert(error);
            console.error(error);
          });
      });
  }
}
