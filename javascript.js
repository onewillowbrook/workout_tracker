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

    const exerciseDiv = document.createElement('div');
    exerciseDiv.classList.add('exercise-item');

    const nameSpan = document.createElement('span');
    nameSpan.textContent = exerciseName;
    exerciseDiv.appendChild(nameSpan);

    const setsContainer = document.createElement('div');
    setsContainer.classList.add('sets-container');
    exerciseDiv.appendChild(setsContainer);

    function refreshSetLabels() {
        const sets = setsContainer.querySelectorAll('.set');
        sets.forEach((setDiv, index) => {
            const label = setDiv.querySelector('.set-label');
            if (label) {
                label.textContent = `Set:  ${index + 1}`;
            }
        });
    }

    function createSet() {
        const setDiv = document.createElement('div');
        setDiv.classList.add('set');

        // Set label
        const setLabel = document.createElement('span');
        setLabel.classList.add('set-label');
        // We'll set the text later when refreshing labels
        setDiv.appendChild(setLabel);

        const weightInput = document.createElement('input');
        weightInput.type = 'number';
        weightInput.min = '0';
        weightInput.placeholder = 'Weight (lb)';

        const repsInput = document.createElement('input');
        repsInput.type = 'number';
        repsInput.min = '0';
        repsInput.placeholder = 'Reps';

        const deleteSetBtn = document.createElement('button');
        deleteSetBtn.textContent = 'Delete Set';
        deleteSetBtn.addEventListener('click', () => {
            setDiv.remove();
            refreshSetLabels(); // update labels after delete
        });

        setDiv.appendChild(weightInput);
        setDiv.appendChild(repsInput);
        setDiv.appendChild(deleteSetBtn);

        return setDiv;
    }

    // Add the first set by default
    setsContainer.appendChild(createSet());
    refreshSetLabels();

    const addSetBtn = document.createElement('button');
    addSetBtn.textContent = 'Add Set';
    addSetBtn.addEventListener('click', () => {
        setsContainer.appendChild(createSet());
        refreshSetLabels(); // update labels after adding
    });

    exerciseDiv.appendChild(addSetBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete Exercise';
    deleteBtn.addEventListener('click', () => {
        exerciseDiv.remove();
    });

    exerciseDiv.appendChild(deleteBtn);

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