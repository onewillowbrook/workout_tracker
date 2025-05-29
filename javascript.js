const todaysDate = new Date();
const formattedDate = todaysDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

document.getElementById('date').textContent = formattedDate;

// Displaying time: ^^

const armsOrLegs = ['Arm Day', 'Leg Day'];
let currentIndex = 0;

const display = document.getElementById('displayItem');
const button = document.getElementById('switchButton');

display.textContent = armsOrLegs[currentIndex];

button.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % armsOrLegs.length;
    display.textContent = armsOrLegs[currentIndex];
});

// Arms or legs switch button ^^

const exerciseInput = document.getElementById('item');
const addExerciseBtn = document.getElementById('addExercise');
const exerciseList = document.getElementById('exerciseList');

addExerciseBtn.addEventListener('click', () => {
    const exercise = exerciseInput.value.trim();
    if (exercise !== '') {
        const li = document.createElement('li');
        li.textContent = exercise;
        exerciseList.appendChild(li);
        exerciseInput.value = ''; // clear input
    }
});

// Adding elements to a list ^^