Template.newRule.helpers({
  allRules: function () {
    var userId = Meteor.userId();
    return Rules.find();
  }
});
Template.newRule.events({
  "submit form": function (ev) {
    ev.preventDefault();
    var $thisAction = $('[name="thisAction"]'),
        thisAction = $thisAction.val(),
        $isWorth = $('[name="isWorth"]'),
        isWorth = $isWorth.val(),
        userId = Meteor.userId();

    if (!thisAction || !isWorth) {
      Errors.throw('I need both fields filled.');
      return;
    }

    Rules.insert({
      createdBy: userId,
      thisAction: thisAction,
      isWorth: parseInt(isWorth, 10)
    });

    $isWorth.val('');
    $thisAction.val('').focus();
  }
})