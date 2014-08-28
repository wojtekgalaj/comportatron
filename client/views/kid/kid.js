Template.showKid.helpers({
	deals: function () {
		return Deals.find(
			{createdBy: Meteor.userId()}
		)
	},
	
	dealsCount: function () {
		return Deals.find().count();
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

Template.scoredRule.helpers({
	when: function () {
		var actionScoredAt = this.createdAt,
				thatMoment = moment(actionScoredAt, 'DD-MM-YYYY')
				thisMomentString = moment().format('DD-MM-YYYY'),
				thisMoment = moment(thisMomentString, 'DD-MM-YYYY'),
				daysAgo = thisMoment.diff(thatMoment, 'days'),
				niceAgo = '';

		switch	(daysAgo) {
			case 0:
				niceAgo = 'Today';
				break;
			case 1:
				niceAgo = 'Yesterday';
				break;
			default:
				niceAgo = daysAgo + ' days ago';
				break;
		}

		return niceAgo;
	}
});


Template.showKid.events({
	'click .deals .remove': function () {
		var idToRemove = this._id;

		Deals.remove({_id: idToRemove});
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
			score: 10,
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