Template.newDeal.events({
	'submit form': function (event, template) {
		event.preventDefault();
		var $to = $('.to'),
				to = $to.val(),
				$need = $('.need'),
				need = $need.val(),
				userId = Meteor.userId();

		if (!to || !need) {
			Errors.throw('I need to know all the details :)');
			return;
		}

		Deals.insert(
			{
				'createdBy': userId,
				'to': to,
				'need': need
			}
		);
		$need.val('');
		$to.val('');
	}
})