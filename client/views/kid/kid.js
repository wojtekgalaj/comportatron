Template.showKid.helpers({
	dealStatus: function (kidModel) {
		var isReqMet = kidModel.score >= this.need;

		return isReqMet ? 'reqMet' : 'reqNotMet'
	},

	sortedScores: function () {
		console.log('sorted ', this);
		if (!this.scores) return;
		return this.scores.reverse();
	}
})

Template.showKid.events({
	'click .deals button': function () {
		var kidId = Session.get('currentKidId');
		Kids.update(
			{_id: kidId},
			{
				$pull: {
					deals: this
				}
			}
		)
	}
})

Template.newKid.events({
	'submit form': function (ev) {
		ev.preventDefault();
		var name = $('[name="name"]').val(),
				theId = Meteor.user()._id;

		if (!name) {
			Errors.throw('You need to specify a name.');
			return;
		}

		if (Kids.find({
			name: name,
			createdBy: theId
		}).count()) {
			Errors.throw('A kid with this name already exists.');
			return;
		} 

		Kids.insert({
			name: name,
			createdBy: theId,
			bootstrap: false,
			score: 0,
			deals: [],
			scores: []
		});
		Router.go('overview');
	}
})