Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function () {
    return Meteor.subscribe('usersKids')
  }
});

Router.onBeforeAction(function() { Errors.clearSeen() });



Router.map(function() {
  this.route('overview', {path: '/'}),
	this.route('showKid', {
    path: 'kid/show/:_id',
    data: function () {
      var theId = this.params._id;
      Session.set('currentKidId', theId);
      return Kids.findOne({_id: theId});
    }
  }),

  this.route('newKid', {
    path: 'kid/new'
  }),

  this.route('newDeal', {
    path: 'deal/new'
  }),

  this.route('newScore', {
    path: 'score/new'
  })
});