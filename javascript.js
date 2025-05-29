// === Format and Display Date ===
const todaysDate = new Date();
const formattedDate = todaysDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});
document.getElementById('date').textContent = formattedDate;

// === Arm/Leg Day Switch ===
const armsOrLegs = ['Arm Day', 'Leg Day'];
let currentIndex = 0;

const display = document.getElementById('displayItem');
const button = document.getElementById('switchButton');
display.textContent = armsOrLegs[currentIndex];

button.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % armsOrLegs.length;
    display.textContent = armsOrLegs[currentIndex];
    saveToStorage();
});

// === Grand Total Update ===
function updateGrandTotal() {
    const allExerciseTotals = document.querySelectorAll('.exercise-total');
    let grandTotal = 0;

    allExerciseTotals.forEach(totalSpan => {
        const match = totalSpan.textContent.match(/Total:\s*(\d+)/);
        if (match) grandTotal += parseInt(match[1]);
    });

    document.getElementById('grandTotal').textContent = `Grand Total: ${grandTotal} lbs`;
}

// === Local Storage Save ===
function saveToStorage() {
    const exercises = [];

    document.querySelectorAll('.exercise-item').forEach(ex => {
        const name = ex.querySelector('h3').textContent;
        const sets = Array.from(ex.querySelectorAll('.set')).map(set => {
            return {
                weight: set.querySelector('input[placeholder="Weight (lb)"]').value,
                reps: set.querySelector('input[placeholder="Reps"]').value
            };
        });
        exercises.push({ name, sets });
    });

    const data = {
        exercises,
        armOrLegDay: display.textContent,
        workoutTime: document.getElementById('timeLabel').value
    };

    localStorage.setItem('workoutData', JSON.stringify(data));
}

// === Load from Local Storage ===
function loadFromStorage() {
    const saved = localStorage.getItem('workoutData');
    if (!saved) return;

    const data = JSON.parse(saved);

    // Restore Arm/Leg day
    display.textContent = data.armOrLegDay;
    currentIndex = armsOrLegs.indexOf(data.armOrLegDay);

    // Restore workout time
    document.getElementById('timeLabel').value = data.workoutTime;

    // Restore exercises
    data.exercises.forEach(({ name, sets }) => {
        exerciseInput.value = name;
        addExercise();

        const lastExercise = exercisesContainer.lastElementChild;
        const setsContainer = lastExercise.querySelector('.sets-container');

        // Clear default dummy set
        setsContainer.innerHTML = '';

        sets.forEach(({ weight, reps }) => {
            const setDiv = createSet();
            setDiv.querySelector('input[placeholder="Weight (lb)"]').value = weight;
            setDiv.querySelector('input[placeholder="Reps"]').value = reps;
            setsContainer.appendChild(setDiv);
        });

        numberSets();
        updateExerciseTotal(lastExercise);
    });

    updateGrandTotal();
}

// === Exercise Management ===
const exerciseInput = document.getElementById('item');
const addExerciseBtn = document.getElementById('addExercise');
const exercisesContainer = document.getElementById('exercisesContainer');

function updateExerciseTotal(exerciseDiv) {
    const sets = exerciseDiv.querySelectorAll('.set');
    let total = 0;
    sets.forEach(set => {
        const weight = parseFloat(set.querySelector('input[placeholder="Weight (lb)"]').value) || 0;
        const reps = parseFloat(set.querySelector('input[placeholder="Reps"]').value) || 0;
        total += weight * reps;
    });
    exerciseDiv.querySelector('.exercise-total').textContent = `Total: ${total} lbs`;
    updateGrandTotal();
    saveToStorage();
}

function createSet(onChange) {
    const setDiv = document.createElement('div');
    setDiv.classList.add('set');

    const setLabel = document.createElement('span');
    setLabel.classList.add('set-label');
    setDiv.appendChild(setLabel);

    const weightInput = document.createElement('input');
    weightInput.type = 'number';
    weightInput.min = '0';
    weightInput.placeholder = 'Weight (lb)';
    setDiv.appendChild(weightInput);

    const repsInput = document.createElement('input');
    repsInput.type = 'number';
    repsInput.min = '0';
    repsInput.placeholder = 'Reps';
    setDiv.appendChild(repsInput);

    const setTotal = document.createElement('span');
    setTotal.classList.add('set-total');
    setTotal.textContent = 'Total: 0 lbs';
    setDiv.appendChild(setTotal);

    const deleteSetBtn = document.createElement('button');
    deleteSetBtn.textContent = 'Delete Set';
    setDiv.appendChild(deleteSetBtn);

    deleteSetBtn.addEventListener('click', () => {
        setDiv.remove();
        numberSets();
        const parent = setDiv.closest('.exercise-item');
        updateExerciseTotal(parent);
    });

    function updateSetTotal() {
        const weight = parseFloat(weightInput.value) || 0;
        const reps = parseFloat(repsInput.value) || 0;
        const total = weight * reps;
        setTotal.textContent = `Total: ${total} lbs`;
        const parent = setDiv.closest('.exercise-item');
        updateExerciseTotal(parent);
        saveToStorage();
    }

    weightInput.addEventListener('input', updateSetTotal);
    repsInput.addEventListener('input', updateSetTotal);

    return setDiv;
}

function numberSets() {
    document.querySelectorAll('.exercise-item').forEach(ex => {
        const sets = ex.querySelectorAll('.set-label');
        sets.forEach((label, i) => {
            label.textContent = `Set ${i + 1}`;
        });
    });
}

function addExercise() {
    let name = exerciseInput.value.trim();
    if (!name) return;

    name = name.split(' ')
               .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
               .join(' ');

    const exerciseDiv = document.createElement('div');
    exerciseDiv.className = 'exercise-item';

    const title = document.createElement('h3');
    title.textContent = name;
    exerciseDiv.appendChild(title);

    const exerciseTotal = document.createElement('span');
    exerciseTotal.className = 'exercise-total';
    exerciseTotal.textContent = 'Total: 0 lbs';
    exerciseTotal.style.marginBottom = '5px';
    exerciseTotal.style.display = 'inline-block';
    exerciseTotal.style.marginLeft = '10px';
    exerciseDiv.appendChild(exerciseTotal);

    const setsContainer = document.createElement('div');
    setsContainer.className = 'sets-container';
    exerciseDiv.appendChild(setsContainer);

    // Add first set
    const firstSet = createSet();
    setsContainer.appendChild(firstSet);

    numberSets();
    updateExerciseTotal(exerciseDiv);

    const addSetBtn = document.createElement('button');
    addSetBtn.textContent = 'Add Set';
    addSetBtn.onclick = () => {
        const newSet = createSet();
        setsContainer.appendChild(newSet);
        numberSets();
    };

    const delExerciseBtn = document.createElement('button');
    delExerciseBtn.textContent = 'Delete Exercise';
    delExerciseBtn.onclick = () => {
        exerciseDiv.remove();
        updateGrandTotal();
        saveToStorage();
    };

    exerciseDiv.append(addSetBtn, delExerciseBtn);
    exercisesContainer.appendChild(exerciseDiv);

    exerciseInput.value = '';
    exerciseInput.focus();

    saveToStorage();
}

addExerciseBtn.addEventListener('click', addExercise);

exerciseInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        addExerciseBtn.click();
    }
});

// Optional: Save when workout time changes
const timeInput = document.getElementById('timeLabel');
timeInput.addEventListener('input', saveToStorage);

// Load from storage on page load
window.addEventListener('DOMContentLoaded', loadFromStorage);

// === Clear All Data Button ===
const clearBtn = document.getElementById('clearButton');
clearBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all workout data?')) {
        localStorage.removeItem('workoutData');
        location.reload();
    }
});