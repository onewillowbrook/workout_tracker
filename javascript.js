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
const exercisesContainer = document.getElementById('exercisesContainer');

function addExercise() {
    let exerciseName = exerciseInput.value.trim();
    if (exerciseName === '') return;

    // Capitalize every word in exerciseName
    exerciseName = exerciseName
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    // Create container div for the exercise item
    const exerciseDiv = document.createElement('div');
    exerciseDiv.classList.add('exercise-item'); // optional for styling

    // Exercise name text
    const nameSpan = document.createElement('span');
    nameSpan.textContent = exerciseName;

    // Create input for Weight
    const weightInput = document.createElement('input');
    weightInput.type = 'number';
    weightInput.min = '0';
    weightInput.placeholder = 'Weight (lbs)';

    // Create input for Reps
    const repsInput = document.createElement('input');
    repsInput.type = 'number';
    repsInput.min = '0';
    repsInput.placeholder = 'Reps';

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        exerciseDiv.remove();
    });

    // Append everything inside exerciseDiv
    exerciseDiv.appendChild(nameSpan);
    exerciseDiv.appendChild(weightInput);
    exerciseDiv.appendChild(repsInput);
    exerciseDiv.appendChild(deleteBtn);

    // Add exerciseDiv to the exercise list container
    exercisesContainer.appendChild(exerciseDiv);

    exerciseInput.value = '';
    exerciseInput.focus();
}

addExerciseBtn.addEventListener('click', addExercise);
 
// Adding elements to a list ^^

exerciseInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission or unintended behavior
        addExerciseBtn.click(); // Simulate clicking the "Add exercise" button
    }
});

// Kepress enter / return -> to next