import { Template } from 'meteor/templating';
 
import { Tasks } from '../../api/tasks.js';

import './task.html';

Template.task.events({
    'click .heart'() {
        var deltaV;
        if(this.hearted === true) {
            deltaV = -1;
        } else {
            deltaV = 1;
        }
        Tasks.update(this._id, {
            $set: { hearted: !this.hearted, voteCount: this.voteCount + deltaV },
        });
    },
});