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
    exerciseTotal.textContent = 'Total: 0';
    exerciseDiv.appendChild(exerciseTotal);

    const setsContainer = document.createElement('div');
    setsContainer.className = 'sets-container';
    exerciseDiv.appendChild(setsContainer);

    function refreshExerciseTotal() {
        const totals = setsContainer.querySelectorAll('.set-total');
        const sum = [...totals].reduce((acc, el) => acc + (+el.dataset.value || 0), 0);
        exerciseTotal.textContent = `Total: ${sum}`;
    }

    function createSet() {
        const setDiv = document.createElement('div');
        setDiv.className = 'set';

        const label = document.createElement('span');
        label.className = 'set-label';
        setDiv.appendChild(label);

        const wInput = document.createElement('input');
        wInput.type = 'number'; wInput.min = 0; wInput.placeholder = 'Wt';
        const wEcho  = document.createElement('span');
        wEcho.className = 'weight-echo';

        const rInput = document.createElement('input');
        rInput.type = 'number'; rInput.min = 0; rInput.placeholder = 'Reps';

        const totalSpan = document.createElement('span');
        totalSpan.className = 'set-total';
        totalSpan.textContent = '0';
        totalSpan.dataset.value = 0;

        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete Set';
        delBtn.addEventListener('click', () => {
            setDiv.remove();
            numberSets();
            refreshExerciseTotal();
        });

        function recalc() {
            wEcho.textContent = wInput.value ? `${wInput.value} lb` : '';
            const total = (+wInput.value || 0) * (+rInput.value || 0);
            totalSpan.textContent = total;
            totalSpan.dataset.value = total;
            refreshExerciseTotal();
        }
        wInput.addEventListener('input', recalc);
        rInput.addEventListener('input', recalc);

        [wInput, wEcho, rInput, totalSpan, delBtn].forEach(el => setDiv.appendChild(el));
        return setDiv;
    }

    function numberSets() {
        setsContainer.querySelectorAll('.set').forEach((s, i) => {
            s.querySelector('.set-label').textContent = `Set ${i + 1}`;
        });
    }

    setsContainer.appendChild(createSet());
    numberSets();
    refreshExerciseTotal();

    const addSetBtn = document.createElement('button');
    addSetBtn.textContent = 'Add Set';
    addSetBtn.onclick = () => { setsContainer.appendChild(createSet()); numberSets(); };

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