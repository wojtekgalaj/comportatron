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

Template.newScore.helpers({
  settings: function () {
    return {
     position: "top",
     limit: 5,
     rules: [
       {
         collection: Rules,
         field: "thisAction"
       }
     ]
    }
  }
});