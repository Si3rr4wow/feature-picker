var tasks = [];

function task(screenshotURL, title, description) {
    this._id = Math.floor(Math.random() * 1000);
    this.screenshotURL = screenshotURL;
    this.title = title;
    this.description = description;
    this.voteCount = Math.floor(Math.random() * 100);
    this.hearted = false;
    this.incrimentVotes = function() {
        this.voteCount++;
        this.hearted = true;
        $('#' + this._id + ' .vote-count').val(this.voteCount);
        //console.log("Increasing task " + this._id + " to vote count " + this.voteCount);
    }
}

var urls = ["https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/559756_424951857587150_341858507_n.jpg?_nc_cat=0&oh=e5340c6b09639fe6658ecd499417be7e&oe=5C049A33",
"https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/38085760_1795857583829897_4921379746316550144_n.jpg?_nc_cat=0&oh=b4bac5e6db4ab34a1388dc4387a0991d&oe=5BF0A09B",
"https://scontent-lhr3-1.xx.fbcdn.net/v/t31.0-8/29060890_1630341560381501_1669079243771829833_o.jpg?_nc_cat=0&oh=691bbfd77ea7e4af88a4b2b8eeb74d0e&oe=5C082B67",
"https://scontent-lhr3-1.xx.fbcdn.net/v/t31.0-8/26951818_1575100692572255_1045645766142706154_o.jpg?_nc_cat=0&oh=2351a9b2eb289db2bc4874a4a12abb38&oe=5BFA08B1",
"https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/31947082_1683860771696246_2587063655140950016_n.jpg?_nc_cat=0&oh=8678f33f4411e826ba9d237b78a859b3&oe=5BED383B",
]

var titles = ["Lorem ipsum dolor.",
"Lorem ipsum dolor.",
"Lorem ipsum dolor.",
"Lorem ipsum dolor.",
"Lorem ipsum dolor.",
]

var descriptions = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
]

for(var i = 0; i < urls.length; i++) {
    tasks.push(new task(urls[i], titles[i], descriptions[i]));
}

tasks.reverse(tasks.sort(function(a,b){return a.voteCount - b.voteCount}));

//on load
$(function() {
    
    //inserts cards and background on page load
    tasks.forEach(function(task) {
        var card = $(createCard(task));
        $('body').append(card);
    });
    
    $('body').append($('<div class="slab"></div>')) //attach the slab after 
    $('body').append($('<div class="modal-backdrop hidden"></div>')) //attach the modal backdrop after 

    $('.heart.icon').click(function(element) {
        element.stopPropagation();
        //console.log("the id of this card is " + getCardId($(this)));
        if(!clickedTask) {
            var clickedTask = tasks.find(task => task._id == getCardId($(this)))
        }
        if(!clickedTask.hearted) {
            clickedTask.incrimentVotes();
            $(this).addClass('hearted')
        }
    });
    $('.card').click(function() {
        var clickedTask = tasks.find(task => task._id == getCardId($(this)))
        var cardDetails = $(createCardDetails(clickedTask))
        $('.modal-backdrop').append(cardDetails)
        $('.modal-backdrop').removeClass('hidden');

        $('.heart.icon').click(function(element) {
            element.stopPropagation();
            //console.log("the id of this card is " + getCardId($(this)));
            console.log(clickedTask);
            if(!clickedTask) {
                var clickedTask = tasks.find(task => task._id == getCardId($(this)))
            }
            console.log(clickedTask);
            if(!clickedTask.hearted) {
                clickedTask.incrimentVotes();
                $(this).addClass('hearted');
            }
        });

        $('.close-holder').click(function() {
            $('.modal-backdrop').html('');
            $('.modal-backdrop').addClass('hidden');
        });
    })
});

//gets the id of the card whose child has been clicked. Pass it jquery objects
function getCardId(element) {
    console.log(element.parentsUntil(".modal-backdrop",".card-details"))
    if(element.parentsUntil(".modal-backdrop",".card-details").attr('id')) {
        return element.parentsUntil(".modal-backdrop",".card-details").attr('id');
    }
    else if(element.parentsUntil(".card-container",".card").attr('id') == null){
        return element.attr('id');
    } else {
        return element.parentsUntil(".card-container",".card").attr('id');
    }
}

//translates task data into a card
function createCard(task) {
    var heartedClass = null;
    if(task.hearted) {heartedClass = "hearted"}
    return `
    <div class="card-container">
        <div id="${task._id}" class="card">
            <img class="screenshot" src="${task.screenshotURL}"/>
            <h2 class="title">${task.title}</h2>
            <input readonly type="number" value="${task.voteCount}" class="vote-count"></input>
            <span class="heart-holder">
                <div class="heart icon ` + heartedClass + ` " ></div>
            </span>
        </div>
    </div>`;
}

function createCardDetails(task) {
    var heartedClass = null;
    if(task.hearted) {heartedClass = "hearted"}
    return `
    <div id="${task._id}" class="card-details">
        <div class="close-holder">
            <div class="close">X</div>
        </div>
        <img class="screenshot" src="${task.screenshotURL}"/>
        <h2 class="title">${task.title}</h2>
        <input readonly type="number" value="${task.voteCount}" class="vote-count"></input>
        <!--<span class="heart-holder">
            <div class="heart icon ` + heartedClass + ` " ></div>
        </span>-->
        <p class="task-description">${task.description}</p>
    </div>`
}