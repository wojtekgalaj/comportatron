Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function () {
    return Meteor.subscribe('usersKids')
  }
});


Router.map(function() {
  this.route('overview', {path: '/'}),
	this.route('kids', {
    path: 'kids',
    data: function () {
      return Kids.find({})
    }
  }),
	this.route('behaviours', {path: 'behaviours'})
});
