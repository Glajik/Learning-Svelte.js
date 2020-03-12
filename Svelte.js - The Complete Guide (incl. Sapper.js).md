# Svelte.js - The complete Guide (incl. Sapper.js)

Build high-performance web applications with SvelteJS - a lightweight JavaScript compiler

Author: [Maximilian Schwarzmüller](academind.com)

## Section 1: Getting started

### What is Svelte?

- Reactive UI - интерфейс мгновенно реагирует на действия пользователя, без
белых экранов и пауз между переходами. Показать спиннер это нормально, если требуется
дозагрузка данных.
- Svelte mean slim, lightweight etc.
- Svelte is a compiler - что означает, в проекте будет только тот код, который
необходим, а не вся библиотека со всеми зависимостями.

### Setting Up a First App & The Course Project

- `<script defer src="...">` - scripts with the `defer` attribute will prevent the DOMContentLoaded event from firing until the script has loaded and finished evaluating.
- Setup project by template:
  ```BASH
  npx degit sveltejs/template my-svelte-project
  # or download and extract
  cd my-svelte-project
  npm install
  npm run dev
  ```
- VS Code extentions
  - Material Icon Theme
  - Svelte
- rollup - пакет см. package.json, вместе с плагинами, отвечает за локальный
веб сервер, компиляцию при изменении файлов и live preview. Настройки в rollup.config.js

### Writing Some Svelte Code

Пропсы можно задавать в main.js

```JS
const app = new App({
  target: document.body,
  props: {
    name: 'world',
    age: 45
  }
});
```

их нужно явно обозначить экспортами в компоненте вот так:

```HTML
<script>
  export let name;
  export let age;
</script>
```

Компонент App.svelte

```HTML
<main>
  <h1>Hello {name}, my age is {age}!</h1>
  <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
  <button on:click={incrementAge}>Increment Age</button>
</main>
```

- Тегу `<main>` соотв. файл main.js
- Пропсы и выражения подставляются с помощью фигурных скобок
- Привязка событий чуть необычна - `on:click={eventHandler}`

## Section 2: Base Syntax & Core Features

### 12. Reactive Variables

Label statement in JS, обычно не применяется. Задуман в качестве метки для инструкции перехода. Может применяться в циклах, и т.п.

В Svelte используется метка $ для обозначения кода, который будет выполняться каждый раз, при обновлении 

```HTML
<script>
  let name = 'Slava';
  
  $: uppercaseName = name.toUpperCase();
  
  function changeName() {
    name = 'Maximilian';
  }
</script>

<h1>Hello {uppercaseName}!</h1>
<button on:click={changeName}>Change name</button>

```
- Не нужно декларировать переменную uppercaseName, Svelte это делает за нас
- Каждый раз при изменении переменной name извне, содержимое переменной uppercaseName будет так же обновлено

### 13. More Reactivity

```HTML
<script>
  let name = 'Slava';
  let age = 37;
  
  $: uppercaseName = name.toUpperCase();
  
  $: if (name === 'Maximilian) {
    age = 31;
  }
  
  function changeName() {
    name = 'Maximilian';
  }
</script>

<h1>Hello {uppercaseName}!</h1>
<h2>Your age is {age}</h2>
<button on:click={changeName}>Change name</button>

```

### 14. Binding to Element Properties

```JS
<script>
  let name = 'Slava';
  
  function inputName(event) {
    name = event.target.value;
  }
</script>

<h1>Hello {name}!</h1>
<input type="text" value={name} on:input={inputName}>
```

### 15. Two-Way Binding Shortcut

```JS
<script>
  let name = 'Slava';
</script>

<h1>Hello {name}!</h1>
<input type="text" bind:value={name}>
```

- Рекомендует применять с умом данный подход, в большинстве случаев лучше явно указать свои обработчики и вывод
- Формы, это как раз тот случай, где это идеально подходит

### 16. Using Multiple Components

- Компонентный подход
- Компонент обычно состоит из трех секций
  - script
  - style
  - markup (html)
- Стили - локальные, влияют только на текущий компонент
- Можно использовать импорты
- Use Ctrl + Refresh in the browser 

```HTML
<-- src/MyComponent.svelte -->
<h2>This is my component</h2>

<-- src/App.svelte -->
<script>
  import MyComponent from './MyComponent';
</script>

<h1>Hello</h1>
<MyComponent />
```

Custom entry points at `index.html` file and bind it in `main.js`

```HTML
// public/index.html

<!-- Some code before -->
  <body>
    <div id="root"></div>
  </body>
</html>
```

```JS
// src/main.js

const app = new App({
	target: document.getElementById('root'), // document.body
	props: {
		name: 'world',
		age: 45
	}
});

export default app;
```

### 17. Components & Communication via Props

- `export` в Svelte означает, что переменную можно изменять извне компонента

```HTML
<-- src/MyComponent.svelte -->
<script>
  export let text = 'component';
</script>
<h2>This is my {text}</h2>

<-- src/App.svelte -->
<script>
  import MyComponent from './MyComponent';
</script>

<h1>Hello</h1>
<MyComponent text='Compontent'/>
```

### 19. Using Self-Extending Properties

- Use object destruction for props

```HTML
<script>
  let name = 'Slava';
  let url = 'https://some.image.url';
</script>

<MyComponent {name} imageUrl={url}/>
```

### 20. Outputting HTML Content

- Threated html by default from any text input
- @html

```HTML
<script>
  let text = 'some <strong>text</strong> is bold';
</script>

<p>{text}</p>
<p>{@html text}</p>
```

- be carefull with it - XSS attack is possible
  - if you enter this `data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" onload="alert('You were hacked!');`, alert is showed 

```HTML
<script>
    let userInput = '';
</script>
 
<input type="text" bind:value={userInput} />
<div>{@html userInput}</div>
```

### 22. Setting Dynamic CSS Classes

```HTML
<div class={userImage ? 'thumb' : 'thumb thumb-placeholder'}>

<!-- Alternative way - using directive -->

<div class="thumb" class:thumb-placeholder={!userName}>
```

## Section 3: Working with Conditionals & Loops

### 26. Using "If" Statements in HTML

### 27. If, else & else-if

```HTML
{#if formState === 'done'}
  <ContactCard userName={name} jobTitle={title} {description} userImage={image} />
{:else if formState === 'invalid'}
  <p>Invalid input.</p>
{/if}
```

### 28. Outputting Lists with "each"

- Svelte не может отследить изменения в объектах, т.к. они передаются по ссылке.
- В массивах вместо push лучше использовать spread operator

```JS
let contacts = [];

// later
contacts = [...contacts, newContact]
```

```HTML
{#each createdContacts as contact}
  <ContactCard
    userName={contact.userName}
    jobTitle={contact.jobTitle}
    description={contact.description}
    userImage={contact.imageUrl} />
{/each}
```

### 29. "each", "else" & Extracting the Index

- `{:else}` в списках отображает контент, когда список пуст
- `{#each contacts as contact, index}` - вторым аргументом передается индекс элемента

```HTML
{#each createdContacts as contact, index}
  <h2># {index + 1}</h2>
  <ContactCard
    userName={contact.userName}
    jobTitle={contact.jobTitle}
    description={contact.description}
    userImage={contact.imageUrl} />
{:else}
  <p>No any contact found.</p>
{/each}
```

### 30. Lists & Keys

- Svelte по умолчанию при работе со списками не индексирует блоки в DOM и это хорошо работает только когда последовательность элементов не нарушается. Стоит только удалить какой-то элемент по середине, он начинает путаться, т.к. все повторяющиеся блоки DOM для него одинаковые.
- Добавляем уникальный идендификатор к индексу - тут особый синтаксис, без запятых - просто пробел и в скобках идендификатор

```HTML
{#each contacts as contact, index (contact.id)}
  <h2># {index + 1}</h2>
  <ContactCard />
{:else}
  <p>No any contact found.</p>
{/each}
```

- Когда добавил индекс - сломался `{:else}`

### 31. A Closer Look at List Keys

- Посмотрели, как удаляются элементы списка в случаях:
  - когда элементы не индексированы, Svelte удаляет последний элемент DOM в списке, а затем приводит  соответствие с новыми данными.
    - в инструментах разработчика видно, что обновился контейнер списка. А так же все элементы списка ниже удаленного элемента и содержимое этих элементов.
  - когда элементы индексированы, производительность намного выше, т.к. Svelte точно знает что удалить.
    - в инструментах разработчика видно, что обновился только контейнер списка. Элемент списка при этом просто исчез, другие элементы не перерисовывались.

## Section 4: A Closer Look at Reactivity

### 35. Updating Arrays & Objects Immutably

- Reference Types vs Primitives
- Чтобы Svelte отследил изменения, необходимо присвоить переменной новое значение. Если переменная хранит ссылку на объект, то нужно заменить на новую ссылку.

### 36. Understanding Event Modifiers

- `on:click|once` - срабатывает только один раз, удаляя затем обработчик.
- `on:scroll|passive` - улучшает производительность прокрутки при тач-событиях или при прокрутке колёсиком мышки
- `on:click|capture` - вызывает событие в режиме capture вместо bubbling.
- `on:click|stopPropagation` - предотвращает "всплытие" события
- `on:click|preventDefault` - вызывает event.preventDefault() перед запуском обработчика.

Можно назначить несколько обработчиков для одного события:

```HTML
<button on:click={increment} on:click={track}>Нажми меня!</button>
```

## Section 5: Course Project - First Steps

### 42. Different Ways of Mounting Components

- Можно монтировать отдельные компоненты в соотв. контейнеры. Не обязательно все это монтировать через одну точку.

```JS
// Main.js
import App from './App.svelte';
import Header from './UI/Header.svelte';

const app = new App({
  target: document.querySelector('#app')
});

const app = new App({
  target: document.querySelector('#header')
});

export default app;
```

- Важный момент при таком способе - компоненты не могут напрямую взаимодействовать - передавать друг другу данные.
- Это великолепный подход для виджетов, но не подходит для SPA - Single Page Applications
- Когда и где использовать такой подход:,
  - Существующие (server-side rendered) страницы, которые Вы не хотите превращать в Svelte Single-Page-Apps - вместо этого Вы можете захотеть добавить некоторые динамические элементы (например, кнопку Dropdown с управлением Svelte).
  - Веб-приложения (SPA или нет), которые обычно управляются через другой фреймворк или библиотеку (например, через React) - вы все равно можете взять на себя управление частью страницы через компоненты Svelte.

### 46. Working with Different Component Types

- Stateful components, containers
  - Hold & manage data, pass data around
  - Хранит и управляет данными, меняет их в результате взаимодействия с пользователем, сервером, источником данных.
  - Примеры: `<App>, <Products>, <Checkout>`
- Presentational components
  - Receive & output data
  - Просто получают данные через свойства и отображают их.
  - Не изменяют и не обрабатывают данные.
  - Передают события или пользовательский ввод в родительский stateful компонент.
  - Примеры: `<Modal>, <Card>, <Button>`
  