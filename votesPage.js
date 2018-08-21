var tasks = [];

function task(screenshotURL,description) {
    this._id = Math.floor(Math.random() * 1000);
    this.screenshotURL = screenshotURL;
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

var descriptions = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
]

for(var i = 0; i < urls.length; i++) {
    tasks.push(new task(urls[i],descriptions[i]));
}

tasks.reverse(tasks.sort(function(a,b){return a.voteCount - b.voteCount}));

//on load
$(function() {
    
    //inserts cards and background on page load
    tasks.forEach(function(dataRecord) {
        var card = $(createCard(dataRecord));
        $('body').append(card);
    });
    
    $('body').append($('<div class="slab"></div>')) //attach the slab after 

    $('.heart.icon').click(function() {
        //console.log("the id of this card is " + getCardId($(this)));
        for(var i = 0; i < tasks.length; i++) {
            if(tasks[i]._id == $(this).parentsUntil(".card-container",".card").attr('id') && tasks[i].hearted == false) {
                tasks[i].incrimentVotes();
                $(this).addClass('hearted')
            }
        }
    });
});

//gets the id of the card whose child has been clicked. Pass it jquery objects
function getCardId(element) {
    return element.parentsUntil(".card-container",".card").attr('id')
}

//translates task data into a card
function createCard(dataRecord) {
    var heartedClass = null;
    if(dataRecord.hearted) {heartedClass = "hearted"}
    return `
    <div class="card-container">
        <div id="${dataRecord._id}" class="card">
            <img class="screenshot" src="${dataRecord.screenshotURL}"/>
            <p class="description">${dataRecord.description}</p>
            <input readonly type="number" value="${dataRecord.voteCount}" class="vote-count"></input>
            <span class="heart-holder">
                <div class="heart icon ` + heartedClass + ` " ></div>
            </span>
        </div>
    </div>`;
}
