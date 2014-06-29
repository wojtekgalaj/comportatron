Template.newDeal.events({
	'submit form': function (event, template) {
		event.preventDefault();
		var to = $('.to').val(),
				need = $('.need').val(),
				kidId = Session.get('currentKidId');

		if (!to || !need) {
			Errors.throw('I need to know all the details :)');
			return;
		}

		Kids.update(
			{_id: kidId},
			{$addToSet: {deals: {
				'to': to,
				'need': need
			}}}
		);
		Router.go('/kid/show/' + kidId);
	}
})