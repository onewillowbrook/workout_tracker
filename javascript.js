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
    let exercise = exerciseInput.value.trim();
    exercise = exercise.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    if (exercise !== '') {
        const li = document.createElement('li');

        // Create a span to hold the exercise name
        const exerciseText = document.createElement('span');
        exerciseText.textContent = exercise;

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.style.marginLeft = '10px';
        deleteBtn.addEventListener('click', () => {
            li.remove(); // Remove the list item
        });

        // Append span and button to the list item
        li.appendChild(exerciseText);
        li.appendChild(deleteBtn);
        exerciseList.appendChild(li);

        // Clear input
        exerciseInput.value = '';
    }
});

// Adding elements to a list ^^

exerciseInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission or unintended behavior
        addExerciseBtn.click(); // Simulate clicking the "Add exercise" button
    }
});

// Kepress enter / return -> to next