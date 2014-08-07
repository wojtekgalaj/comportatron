Template.showKid.helpers({
	deals: function () {
		return Deals.find(
			{createdBy: Meteor.userId()}
		)
	},
	dealStatus: function () {
		var kidId = Session.get('currentKidId'),
				kidModel = Kids.findOne({_id: kidId});
				isReqMet = kidModel.score >= this.need;

		return isReqMet ? 'reqMet' : 'reqNotMet'
	},

	sortedScores: function () {
		if (!this.scores) return;
		return this.scores.reverse();
	}
})


Template.showKid.events({
	'click .deals .remove': function () {
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
				theId = Meteor.userId();

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
			scoredRules: []
		});
		Router.go('overview');
	}
})

Template.editKid.events({
	'click .delete': function () {
		if (confirm('Are you sure you want to remove ' + this.name + ' from the app?')) {
			Kids.remove({_id: this._id});
			Router.go('/')
		}
	},
	'submit form': function (ev) {
		ev.preventDefault();
		var newName = $('[name="name"]').val(),
				currentKidId = Session.get('currentKidId');

		if (! newName) {
			Errors.throw('There is no new name to set genious :)');
			return;
		}
		Kids.update(
			{_id: currentKidId},
			{$set: {name: newName}}
		)


	}
})