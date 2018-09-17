import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'
 
import { Tasks } from '../../api/tasks.js';
import { Hearts } from '../../api/hearts.js';


import './task.html';

Template.task.helpers({
    hearted() {
        if(Hearts.findOne({taskId: this._id, userId: Meteor.userId()})) {
            return true;
        } else {
            return false;
        }
    }
})

Template.task.events({
    'click .heart'(event) {
        event.stopImmediatePropagation();
        /*var deltaV = 1;
        if(Hearts.findOne({taskId: this._id, userId: Meteor.userId()})) {
            deltaV = -1;
            Hearts.remove({taskId: this._id, userId: Meteor.userId()});
        } else {
            Hearts.insert({taskId: this._id, userId: Meteor.userId()});
        }
        Tasks.update(this._id, {
            $set: { voteCount: this.voteCount + deltaV },
        });*/
        Meteor.call('tasks.heart', this._id);
    },
    'click'() {
        $('.modal-backdrop').fadeIn(100);
        Session.set('clickedTask', Tasks.findOne({_id: this._id}))
    }
});