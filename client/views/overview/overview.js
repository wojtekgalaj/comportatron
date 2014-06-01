Template.overview.helpers({
	'allTheKids': function () {
		return Kids.find();
	},
	'allTheBehaviours': function () {
		return Behaviours.find();
	},
	'dealStatus': function (kidModel) {
		var isReqMet = kidModel.score >= this.need;

		return isReqMet ? 'reqMet' : 'reqNotMet'
	}
})

Template.overview.events({
})
