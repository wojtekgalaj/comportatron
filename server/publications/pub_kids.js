Meteor.publish('usersKids', function () {
  return Kids.find({
    createdBy: this.userId
  });
});

Kids.allow({
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
