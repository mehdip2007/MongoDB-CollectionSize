//The mentioned script is created by the following
//https://www.linkedin.com/in/donald-bedroya-2b2144100/


// Container class
function CollStats(name, storageSizeGB, indexSizeGB,SizeGB, totalSizeGB) {
  this.name = name;
  this.storageSizeGB = storageSizeGB.toFixed(0);
  this.indexSizeGB = indexSizeGB.toFixed(0);
  this.SizeGB = SizeGB.toFixed(0);
  this.totalSizeGB = totalSizeGB.toFixed(0);
}

CollStats.prototype.toString = function toStr() {
  var s = this.name + ', size = ' + this.SizeGB + ' MB, storage = ' + this.storageSizeGB + ' MB, index = ' +
          this.indexSizeGB + ' MB, total = ' + this.totalSizeGB + ' MB';
  return s;
}

var bytesInGB = 1024 * 1024 ;
var collectionNames = db.getCollectionNames();
var collStats = [];
for (i = 0; i < collectionNames.length; i++) {
  coll = collectionNames[i];
  s = db[coll].stats();
  var storageSizeGB = s['storageSize'] / bytesInGB;
  var indexSizeGB = s['totalIndexSize'] / bytesInGB;
  var SizeGB = s['size'] / bytesInGB;
  var totalSizeGB = storageSizeGB + indexSizeGB;
  var cs = new CollStats(s['ns'], storageSizeGB, indexSizeGB,SizeGB, totalSizeGB);
  collStats.push(cs);
}

// descending order sort
collStats.sort(function compare(a, b) {
  return b.totalSizeGB - a.totalSizeGB;
});

for (var i = 0; i < collStats.length; i++) {
  print(collStats[i]);
}
