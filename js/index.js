const username = document.querySelector('.user_name');
const userblog = document.querySelector('.user_blog');
const userlocation = document.querySelector('.user_location');
const userbio = document.querySelector('.user_bio');
const userphoto = document.querySelector('.user_photo');
const submitButton = document.querySelector('.submit');


const githubUsername = document.querySelector('#github-username');
const actionResult = document.querySelector('.action_result');


// send request to server and get data for input username then call functions to show result

async function getprofile(e) {
    let username = githubUsername.value;
    e.preventDefault();
    
        try {
            let response = await fetch(`https://api.github.com/users/${username}`);
            let obj = await response.json();
            if (response.status != 200) {
                return Promise.reject(`Request failed with error ${response.status}`);
            }
            profile(obj);
            let data = await JSON.parse(window.localStorage.getItem(username));
            console.log(data);
            if (data != null) {
                savedAnswerCard.style.display = "block";
                setSavedAnswer(data);
            } else {
                savedAnswerCard.
                style.display = "none";
            }
        } catch (e) {
            console.log(e);
        }
}

// show Information extraction result to user
function profile(obj) {
    if (obj.name == null) {
        // username.innerHTML = '<span><i class="fas fa-ban"></i></span>';
        userblog.innerHTML = '<span><i class="fas fa-question"></i></span>';
        showAlert("Can't Find!");
    } else {
        userphoto.innerHTML = '<span>' + '<img src=' + obj.avatar_url + ' width=50 height= 60 >' + '</span>';
        username.innerHTML = "<span>" + obj.name + "</span>";
        userblog.innerHTML = '<span>'+obj.blog +'</span>';
        userlocation.innerHTML = '<span>' + obj.location + '</span>';
        userbio.innerHTML = '<span>' + obj.bio + '</span>';
        
    }
}

//show error 
function showAlert(title) {
    actionResult.style.display = "block";
    actionResult.innerHTML = "<span>" + title + "</span>";
    setTimeout(() => { // removes the error message from screen after 4 seconds.
        actionResult.style.display = "none";
    }, 4000);
}

submitButton.addEventListener('click', getprofile);
window.localStorage.clear();
