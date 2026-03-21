const expl = document.getElementById('Expl');
const expltext = document.getElementById('ExplText');
const errorBtn = document.getElementById('ErrorBTN');
const solveBtn = document.getElementById('SolutionBTN');
const closeBtn = document.getElementById('CloseBTN');

errorBtn.addEventListener('click', () => {
    expltext.innerHTML = `
        <p>На мобильной версии сайта при выборе одного из вариантов в поле ввода (input) происходит некорректное поведение интерфейса.</p>

        <p>После выбора значения экран неожиданно смещается вправо, и страница выходит за пределы видимой области. В результате пользователь теряет доступ к части контента и не может нормально продолжать ввод данных.</p>

        <p>При повороте устройства в горизонтальное положение содержимое частично становится видимым, однако взаимодействие с формой остаётся затруднённым.</p>

        <p>Из-за чего вероятнее всего это происходит:</p>
        <ul>
            <li>Элемент увеличивает свою ширину при выборе (border, padding, контент)</li>
            <li>Отсутствует ограничение ширины (width &gt; 100%)</li>
            <li>Проблемы с flex/grid в мобильной вёрстке</li>
            <li>Некорректная обработка focus или auto-scroll</li>
        </ul>
    `;
    expl.classList.add('active');
});

solveBtn.addEventListener('click', () => {
    expltext.innerHTML = `
        <p>Способы решения:</p>
        <ul>
            <li>Зафиксировать размеры элементов (не менять width при выборе)</li>
            <li>Использовать box-sizing: border-box</li>
            <li>Заменить width: 100vw на width: 100%</li>
            <li>Добавить overflow-x: hidden для body</li>
            <li>Проверить появление динамических элементов (иконки, тексты)</li>
            <li>Убедиться, что ни один элемент не выходит за пределы viewport</li>
        </ul>
        <p>Вероятная причина:</p>
        <h3>CSS</h3>
        <pre><code>
            input {
                width: 100vw; /* Занимает всю ширину viewport */
                padding: 10px;
                border: 1px solid #ccc;
                box-sizing: content-box; /* Не учитывает padding и border в ширине */
            }

            /* Контейнер может быть flex или grid */
            .form-container {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
        </code></pre>
        <h3>JS</h3>
        <pre><code>
            // При выборе значения в input что-то меняется
            input.addEventListener('change', () => {
                input.value = "Длинный текст"; // увеличивает контент
                // из-за box-sizing: content-box ширина input растет
            });
        </code></pre>
        <p>Что происходит</p>
        <ol>
            <li>width: 100vw + padding/border = ширина больше экрана → горизонтальный скролл.</li>
            <li>Flex или grid не ограничивают ширину элементов → они «вылазят» за границы.</li>
            <li>Focus на input может вызвать авто-прокрутку → смещение экрана вправо.</li>
        </ol>
        <p>Решение:</p>
        <h3>CSS</h3>
        <pre><code>
            input {
                width: 100%; /* Используем ширину родителя */
                max-width: 100%; /* Не даем вылезти за контейнер */
                padding: 10px;
                border: 1px solid #ccc;
                box-sizing: border-box; /* Учитывает padding и border в ширине */
                overflow-x: hidden; /* На всякий случай */
            }

            body {
                overflow-x: hidden; /* Предотвращаем горизонтальный скролл */
            }

            .form-container {
                display: flex;
                flex-direction: column;
                gap: 10px;
                max-width: 100%; /* Контейнер не вылезает за экран */
            }
        </code></pre>
        <h3>JS</h3>
        <pre><code>
            // JS остаётся почти без изменений
            input.addEventListener('change', () => {
                input.value = "Длинный текст"; // теперь ширина не ломает верстку
            });
        </code></pre>
        <p>Что изменилось</p>
        <ol>
            <li>box-sizing: border-box → ширина input не растет из-за padding/border.</li>
            <li>width: 100% вместо 100vw → элемент подстраивается под родителя.</li>
            <li>overflow-x: hidden → экран больше не смещается.</li>
            <li>Flex/grid контейнеры ограничены max-width: 100%.</li>
        </ol>
    `;
    expl.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    expl.classList.remove('active');
});