import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { Hearts } from './hearts.js';

export const Tasks = new Mongo.Collection('tasks');

Meteor.methods({
    'tasks.heart'(taskId) {
        var deltaV = 1;
        if(Hearts.findOne({taskId: taskId, userId: Meteor.userId()})) {
            deltaV = -1;
            Hearts.remove({taskId: taskId, userId: Meteor.userId()});
        } else {
            Hearts.insert({taskId: taskId, userId: Meteor.userId()});
        }
        var currentVotes = Tasks.findOne({_id: taskId}).voteCount;
        Tasks.update(taskId, {
            $set: { voteCount: currentVotes + deltaV },
        });
    },
})