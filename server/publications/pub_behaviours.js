Meteor.publish('behaviours', function(){
	return Behaviours.find({});
});
