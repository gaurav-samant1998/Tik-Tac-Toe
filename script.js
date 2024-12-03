let boxes = document.querySelectorAll(".box");
let btn = document.querySelector("#btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    msg.innerText = "";
};

boxes.forEach((box) => {
    box.addEventListener("click", (event) => {
        if (!event.target.disabled) { // Check if the box is not already disabled
            if (turnO) {
                event.target.innerText = "O";
                event.target.style.color = "blue";
            } else {
                event.target.innerText = "X";
                event.target.style.color = "green";
            }

            event.target.disabled = true; // Disable the clicked box

            turnO = !turnO; // Toggle turn

            checkWinner();
        }
    });
});

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = ""; // Clear box text
        box.style.color = ""; // Reset box color
    });
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes(); // Disable all boxes after a winner is determined
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            return; // Exit the function if there's a winner
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
btn.addEventListener("click", resetGame);
