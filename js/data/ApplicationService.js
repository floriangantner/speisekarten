//Access to the DB
//

//return List of all Pubs
function getListOfPubs(){
var List = [];
DBpubs.allDocs({
    include_docs: true
  }).then(function (result) {
    var docs = result.rows.map(function (row) {
      return row.doc;
    });
    for(i in docs){
      var obj = new Pubs();
      obj = extend(obj, docs[i]);
      List.push(obj)
    }
  }).catch(function (err) {
    console.log(err);
  });
  console.log(List);
  return List;
}

//returning one Pub given by id
