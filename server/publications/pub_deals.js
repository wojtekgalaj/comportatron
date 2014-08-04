Meteor.publish('deals', function(){
  return Deals.find({
    createdBy: this.userId
  });
});

Deals.allow({
  insert: function (userId, doc) {
    return true;
  },
  remove: function () {
    return true;
  },
  update: function () {
    return true;
  }
})
