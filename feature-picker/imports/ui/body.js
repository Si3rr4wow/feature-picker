import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';
import { ReleaseNotes } from '../api/releaseNotes';

import './body.html';
import './components/task.js';
import './components/taskDetails.js';
import './components/releaseNotesLinks.js';

var defaultTasks = [
    /*{
        screenshotURL: 'https://www.gstatic.com/webp/gallery3/1.png',
        title: 'Lorem ipsum dolor',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
        voteCount: Math.floor(Math.random() * 100),
        hearted: true,
    },
    {
        screenshotURL: 'https://www.gstatic.com/webp/gallery3/5.png',
        title: 'Lorem ipsum dolor',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
        voteCount: Math.floor(Math.random() * 100),
        hearted: true,
    },
    {
        screenshotURL: 'http://www.gstatic.com/webp/gallery/1.jpg',
        title: 'Lorem ipsum dolor',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
        voteCount: 22,
        hearted: true,
    },
    {
        screenshotURL: 'http://www.gstatic.com/webp/gallery/2.jpg',
        title: 'Lorem ipsum dolor',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
        voteCount: 22,
        hearted: false,
    },
    {
        screenshotURL: 'http://www.gstatic.com/webp/gallery/5.jpg',
        title: 'Lorem ipsum dolor',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
        voteCount: Math.floor(Math.random() * 100),
        hearted: true,
    }*/
]

Template.body.helpers({
    tasks() {
        if(Tasks.find({}).count() === 0) {
            defaultTasks.forEach(function(task) {
                Tasks.insert(task);
            })  
        }
        return Tasks.find({}, {sort: { voteCount: -1 }});
    },
    releaseNotes() {
        return ReleaseNotes.find({}, {sort: {createdAt: -1}});
    }
});

Template.body.events({
    'click #release-notes-drop-down'() {
        $('.li-container').toggleClass('hidden');
    }
})