

Template.searchScores.rendered = function () {
   AutoCompletion.init("input#searchScores");
}

function addScoreByDescription (description) {
  if (!description) Errors.throw("bla")
  var kidId = Session.get('currentKidId'),
      userId = Meteor.userId(),
      theRule = Rules.findOne({createdBy: userId, thisAction: description}),
      ruleScore,
      metaData = {
        createdAt: moment() 
      }

  if (!theRule) {
    Errors.throw("I dont know this rule.");
    return;
  }

  ruleScore = theRule.isWorth;
  
  theRule = _.extend(theRule, metaData);

  Kids.update(
    {_id: kidId},
    {
      $addToSet: {
        scoredRules: theRule
      },
      $inc: {
        score: ruleScore
      }
    }
  );
  Router.go('/kid/show/' + kidId)
}

Template.searchScores.events = {
  'submit form': function (ev) {
    ev.preventDefault();
    var description = $('#searchScores').val();

    if (!description) {
      Errors.throw("Add a description yo!");
      return;
    }
    addScoreByDescription(description);
  },
  'keyup input#searchScores': function (ev) {
    var keyCode = ev.keyCode,
        description = ev.currentTarget.value;
    if (keyCode === 13) {
      addScoreByDescription(description)
    }

    AutoCompletion.autocomplete({
      element: 'input#searchScores',       // DOM identifier for the element
      collection: Rules,              // MeteorJS collection object
      field: 'thisAction',                    // Document field name to search for
      limit: 0,                         // Max number of elements to show
      sort: { name: 1 }
    });              // Sort object to filter results with
  }
}









