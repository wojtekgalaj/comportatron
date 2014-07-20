

Template.searchScores.rendered = function () {
   AutoCompletion.init("input#searchScores");
}

function addScoreByDescription (description) {
  var kidId = Session.get('currentKidId'),
      userId = Meteor.userId(),
      theRule = Rules.findOne({createdBy: userId, thisAction: description}),
      ruleScore = theRule.isWorth,
      metaData = {
        createdAt: moment() 
      }
  theRule = _.extend(theRule, metaData);
  console.log('numeriCValue', ruleScore);      
  console.log('value', description);      
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
}

Template.searchScores.events = {
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









