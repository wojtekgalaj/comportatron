Meteor.publish('usersKids', function () {
  return Kids.find({});
});

Kids.allow({
  insert: function (userId, doc) {
    return true;
  },
  remove: function () {
    return true;
  }
})
