var collectionNames = db.getCollectionNames(), stats = [];
collectionNames.forEach(function (n) { stats.push(db[n].stats()); });
for (var c in stats) {
    size = Number(stats[c]['size'])
    totalIndexSize = Number(stats[c]['totalIndexSize'])
    var mtotalIndexSize = Math.round(totalIndexSize/1024/1024)
    var msize = Math.round(size/1024/1024)
    storagesize = Number(stats[c]['storageSize'])
    var mstoragesize = Math.round(storagesize/1024/1024)
    var mTotal = (msize + mstoragesize)
    print(new Date().toISOString().slice(0, 10) + ","
    + stats[c]['ns'] + " ,"
    + msize + " ,"
    + mstoragesize + " ,"
    + mtotalIndexSize + ","
    + mTotal
    );
}
