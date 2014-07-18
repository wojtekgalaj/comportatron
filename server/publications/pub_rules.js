Meteor.publish('rules', function(){
  return Rules.find({
    createdBy: this.userId
  });
});

Rules.allow({
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
