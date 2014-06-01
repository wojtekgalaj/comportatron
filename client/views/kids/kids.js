Meteor.subscribe('kids');

Template.kids.helpers({
	'allTheKids': function () {
		return Kids.find();
	}
})

Template.kids.events({
	'submit form': function (ev) {
		ev.preventDefault();
		var $form = $(ev.currentTarget),
				newName = $form.find('input:text').val();

		if (Kids.find({name: newName}).count()) {
			// Let them know the kid already exists
			console.log('You are trying to add a kid that exists already');
			return;
		}

		Kids.insert({
			name: newName
		})
	},

	'click .remove': function () {
		if (!this.bootstrap) {
			Kids.remove({
				_id: this._id
			})
		} else {
			console.log('can\'t touch this')
		}
	}
})
