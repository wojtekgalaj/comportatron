Meteor.publish('behaviours', function(){
	return Behaviours.find({});
});

Behaviours.allow({
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
