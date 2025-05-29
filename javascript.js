const todaysDate = new Date();
const formattedDate = todaysDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

document.getElementById('date').textContent = formattedDate;

// Displaying time: ^^

function updateGrandTotal() {
    const allExerciseTotals = document.querySelectorAll('.exercise-total');
    let grandTotal = 0;

    allExerciseTotals.forEach(totalSpan => {
        const match = totalSpan.textContent.match(/Total:\s*(\d+)/);
        if (match) grandTotal += parseInt(match[1]);
    });

    document.getElementById('grandTotal').textContent = `Grand Total: ${grandTotal} lbs`;
}

// Grand total weight

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
const exercisesContainer = document.getElementById('exercisesContainer');

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

    function updateExerciseTotal() {
        const sets = setsContainer.querySelectorAll('.set');
        let total = 0;
        sets.forEach(set => {
            const weight = parseFloat(set.querySelector('input[placeholder="Weight (lb)"]').value) || 0;
            const reps = parseFloat(set.querySelector('input[placeholder="Reps"]').value) || 0;
            total += weight * reps;
        });
        exerciseTotal.textContent = `Total: ${total} lbs`;
        updateGrandTotal(); // 👈 add this line
    }
    
    function createSet() {
        const setDiv = document.createElement('div');
        setDiv.classList.add('set');
    
        // Set label
        const setLabel = document.createElement('span');
        setLabel.classList.add('set-label');
        setLabel.style.marginRight = '10px';
        setDiv.appendChild(setLabel);
    
        const weightInput = document.createElement('input');
        weightInput.type = 'number';
        weightInput.min = '0';
        weightInput.placeholder = 'Weight (lb)';
        weightInput.style.marginRight = '5px';
    
        const repsInput = document.createElement('input');
        repsInput.type = 'number';
        repsInput.min = '0';
        repsInput.placeholder = 'Reps';
        repsInput.style.marginRight = '10px';
    
        const setTotal = document.createElement('span');
        setTotal.classList.add('set-total');
        setTotal.style.marginRight = '10px';
        setTotal.textContent = 'Total: 0 lbs';
    
        const deleteSetBtn = document.createElement('button');
        deleteSetBtn.textContent = 'Delete Set';
        deleteSetBtn.addEventListener('click', () => {
            setDiv.remove();
            numberSets();
            updateExerciseTotal();
        });
    
        function updateSetTotal() {
            const weight = parseFloat(weightInput.value) || 0;
            const reps = parseFloat(repsInput.value) || 0;
            const total = weight * reps;
            setTotal.textContent = `Total: ${total} lbs`;
            updateExerciseTotal();
        }
    
        weightInput.addEventListener('input', updateSetTotal);
        repsInput.addEventListener('input', updateSetTotal);
    
        setDiv.appendChild(weightInput);
        setDiv.appendChild(repsInput);
        setDiv.appendChild(setTotal);
        setDiv.appendChild(deleteSetBtn);
    
        return setDiv;
    }

    function numberSets() {
        setsContainer.querySelectorAll('.set').forEach((s, i) => {
            s.querySelector('.set-label').textContent = `Set ${i + 1}`;
        });
    }

    setsContainer.appendChild(createSet());
    numberSets();
    updateExerciseTotal();

    const addSetBtn = document.createElement('button');
    addSetBtn.textContent = 'Add Set';
    addSetBtn.onclick = () => {
        setsContainer.appendChild(createSet());
        numberSets();
    };

    const delExerciseBtn = document.createElement('button');
    delExerciseBtn.textContent = 'Delete Exercise';
    delExerciseBtn.onclick = () => exerciseDiv.remove();

    exerciseDiv.append(addSetBtn, delExerciseBtn);
    exercisesContainer.appendChild(exerciseDiv);

    exerciseInput.value = '';
    exerciseInput.focus();
}

addExerciseBtn.addEventListener('click', addExercise);

exerciseInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        addExerciseBtn.click();
    }
});