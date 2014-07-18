Template.newScore.events({
  'submit form': function (ev) {
    ev.preventDefault();
    return;
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

Template.searchScores.rendered = function () {
   AutoCompletion.init("input#searchScores");
}

Template.searchScores.events = {
  'keyup input#searchScores': function () {
    AutoCompletion.autocomplete({
      element: 'input#searchScores',       // DOM identifier for the element
      collection: Rules,              // MeteorJS collection object
      field: 'thisAction',                    // Document field name to search for
      limit: 0,                         // Max number of elements to show
      sort: { name: 1 }});              // Sort object to filter results with
      //filter: { 'gender': 'female' }}); // Additional filtering
  }
}









