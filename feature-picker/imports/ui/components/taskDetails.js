import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import { Tasks } from '../../api/tasks.js';
import { Hearts } from '../../api/hearts.js';

import './taskDetails.html';

Template.taskDetails.helpers({
    clickedTask() {
        return Session.get('clickedTask');
    },
    hearted() {
        var thisTask = Session.get('clickedTask');
        if(thisTask && Hearts.findOne({taskId: thisTask._id, userId: Meteor.userId()})) {
            return true;
        } else {
            return false;
        }
    }
})

Template.taskDetails.events({
    //close on close click
    'click .close-holder'() {
        $('.modal-backdrop').fadeOut(100);
        delete Session.keys['clickedTask'];
    },
    //close on click outside modal
    /*'click .modal-backdrop'() {
        $('.modal-backdrop').fadeOut(100);
        delete Session.keys['clickedTask'];
    },*/
    //change vote count, add hearted on heart click
    'click .heart'(event) {
        event.stopImmediatePropagation();
        var thisTask = Session.get('clickedTask');
        /*var deltaV;
        if(thisTask.hearted === true) {
            deltaV = -1;
        } else {
            deltaV = 1;
        }
        Tasks.update(thisTask._id, {
            $set: { hearted: !thisTask.hearted, voteCount: thisTask.voteCount + deltaV },
        });*/
        Meteor.call('tasks.heart', thisTask._id);
        Session.set('clickedTask', Tasks.findOne({_id: thisTask._id})) //this is here to refresh the taskDetail template after heart is clicked so that the heart is visible
    },
})