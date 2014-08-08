Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function () {
    return [
      Meteor.subscribe('usersKids'), 
      Meteor.subscribe('rules'),
      Meteor.subscribe('deals')
    ];
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
  this.route('editKid', {
    path: 'kid/edit',
    data: function () {
      var theId = Session.get('currentKidId');
      return Kids.findOne({_id: theId});
    }
  })
  this.route('newKid', {
    path: 'kid/new'
  }),
  this.route('newDeal', {
    path: 'deal/new'
  }),
  this.route('newScore', {
    path: 'score/new',
    data: function () {
      var theId = Session.get('currentKidId');
      return Kids.findOne({_id: theId});
    }
  }),
  this.route('newRule', {
    path: 'rule/new'
  })
});
