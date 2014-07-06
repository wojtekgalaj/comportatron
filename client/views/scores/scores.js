Template.newScore.events({
	'click .points button': function (ev) {
		ev.preventDefault();
		var kidId = Session.get('currentKidId'),
				$button = $(ev.currentTarget),
				content = $button.html(),
				increaseBy = parseInt(content, 10)
				whatHappened = $('.whatHappened').val(),
				when = moment().calendar();

		if (!whatHappened) {
			Errors.throw('What has happened?');
			return;
		}

		Kids.update(
			{_id: kidId},
			{$inc: {score: increaseBy}}
		);

		Kids.update(
			{_id: kidId},
			{$addToSet: {
				scores: {
					whatHappened: whatHappened,
					score: increaseBy,
					when: when
				}
			}}
		);

		Behaviours.insert({
			whatHappened: whatHappened,
			score: increaseBy
		});

		Router.go('/kid/show/' + Session.get('currentKidId'));
	}
})