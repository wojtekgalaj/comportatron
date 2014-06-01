if (!Kids.find().count()) {
	Kids.insert({
		name: 'Alex',
		score: 0,
		bootstrap: true,
		deals: [
			{
				to: 'Play the tablet',
				need: 15
			}
		]
	});

	Kids.insert({
		name: 'Lisa',
		score: 0,
		bootstrap: true,
		deals: [
			{
				to: 'Play the tablet',
				need: 15
			}
		]
	})
}

if (!Behaviours.find().count()) {
	Behaviours.insert({
		name: 'Talking back',
		sign: '-',
		score: 10
	})
}
