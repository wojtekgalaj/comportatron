Meteor.subscribe('behaviours');

Template.behaviours.helpers({
	'allTheBehaviours': function () {
		return Behaviours.find();
	}
})

Template.behaviours.events({
	'submit form': function (ev) {
		ev.preventDefault();
		var $form = $(ev.currentTarget),
				behaviour = $form.find(':name=beaviour')

		if (Behaviours.find({name: newName}).count()) {
			// Let them know the kid already exists
			console.log('You are trying to add a kid that exists already');
			return;
		}

		Behaviours.insert({
			name: newName
		})
	},

	'click .remove': function () {
	}
})
