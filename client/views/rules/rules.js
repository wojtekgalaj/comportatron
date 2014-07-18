

Template.rules.helpers({
  allRules: function () {
    var userId = Meteor.userId();
    return Rules.find();
  }
});
Template.rules.events({
  "submit form": function (ev) {
    ev.preventDefault();
    var thisAction = $('[name="thisAction"]').val(),
        isWorth = $('[name="isWorth"]').val(),
        userId = Meteor.userId();

    if (!thisAction || !isWorth) {
      Errors.throw('I need both fields filled.');
      return;
    }

    Rules.insert({
      createdBy: userId,
      thisAction: thisAction,
      isWorth: parseInt(isWorth, 10)
    })
  }
})