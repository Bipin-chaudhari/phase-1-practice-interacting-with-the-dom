// Counter display
const counter = document.getElementById("counter");

// Buttons
const plusBtn = document.getElementById("plus");
const minusBtn = document.getElementById("minus");
const pauseBtn = document.getElementById("pause");
const restartBtn = document.getElementById("restart");
const likeBtn = document.getElementById("heart");

// Likes list
const likesList = document.querySelector(".likes");

// Comment form & input
const commentForm = document.getElementById("comment-form");
const commentInput = document.getElementById("comment-input");
const commentList = document.getElementById("list");

let count = 0;
let timer = setInterval(() => {
    count++;
    counter.textContent = count;
}, 1000);

plusBtn.addEventListener("click", () => {
    count++;
    counter.textContent = count;
});

minusBtn.addEventListener("click", () => {
    count--;
    counter.textContent = count;
});
const likes = {}; // Store number of likes per counter value

likeBtn.addEventListener("click", () => {
    const currentCount = count;

    if (likes[currentCount]) {
        likes[currentCount]++;
        document.getElementById(`like-${currentCount}`).textContent =
            `${currentCount} has ${likes[currentCount]} likes`;
    } else {
        likes[currentCount] = 1;
        const li = document.createElement("li");
        li.id = `like-${currentCount}`;
        li.textContent = `${currentCount} has 1 like`;
        likesList.appendChild(li);
    }
});
pauseBtn.addEventListener("click", () => {
    if (pauseBtn.textContent === "pause") {
        clearInterval(timer); // Stop timer

        // Disable other buttons
        plusBtn.disabled = true;
        minusBtn.disabled = true;
        likeBtn.disabled = true;
        commentInput.disabled = true;

        pauseBtn.textContent = "resume"; // Change label
    } else {
        // Resume timer
        timer = setInterval(() => {
            count++;
            counter.textContent = count;
        }, 1000);

        // Enable buttons
        plusBtn.disabled = false;
        minusBtn.disabled = false;
        likeBtn.disabled = false;
        commentInput.disabled = false;

        pauseBtn.textContent = "pause";
    }
});
restartBtn.addEventListener("click", () => {
    clearInterval(timer); // stop current timer
    count = 0;
    counter.textContent = count;

    // Reset likes
    likesList.innerHTML = "";
    for (let key in likes) delete likes[key];

    // Re-enable buttons
    plusBtn.disabled = false;
    minusBtn.disabled = false;
    likeBtn.disabled = false;
    commentInput.disabled = false;

    // Reset pause button
    pauseBtn.textContent = "pause";

    // Restart timer
    timer = setInterval(() => {
        count++;
        counter.textContent = count;
    }, 1000);
});
commentForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page reload
    const commentText = commentInput.value.trim();
    if (commentText !== "") {
        const li = document.createElement("li");
        li.textContent = commentText;
        commentList.appendChild(li);
        commentInput.value = ""; // Clear input
    }
});
