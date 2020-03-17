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
  - Таких компонентов всего несколько, в зависимости от размера приложения.
- Presentational components
  - Receive & output data
  - Просто получают данные через свойства и отображают их.
  - Не изменяют и не обрабатывают данные.
  - Передают события или пользовательский ввод в родительский stateful компонент.
  - Примеры: `<Modal>, <Card>, <Button>`
  - Их большинство в приложении

### 50. Creating a "TextInput" Component

- Когда создается собственный компонент, `bind:value` синтаксис не будет работать для свойств, которые экспортированы наружу.
- Так же момент с событиями, если мы хотим обрабатывать события снаружи собственного компонента, можно их просто передать наверх таким образом: `<input ... on:input>` - это называется "event forwarding".
- В отличие от событий DOM, события компонентов не всплывают через иерархию компонентов. Если нужно словить событие из какого-либо глубоко вложенного компонента, промежуточные компоненты должны пробросить событие.

## Section 6: Diving Deeper Into Components

### 58. Emitting Custom Events

```JS
// Product.svelte
<script>
  import { createEventDispatcher } from 'svelte';
  
  export let productTitle;

  const dispatch = createEventDispatcher();

  const addToCart = () => dispatch('add-to-cart');
  const deleteProduct = () => dispatch('delete', { id: 'p1' });
</script>

<article>
  <h1>{productTitle}</h1>
  <button on:click={addToCart}>Add to Cart</button>
  <button on:click={deleteProduct}>Delete</button>
</article>

// App.svelte
<Product
  productTitle="A Book"
  on:add-to-cart={() => alert('Added to cart!')}
  on:delete={(event) => alert(`Product ${event.detail.id} deleted!`)}
/>
```
- Сигнатуры:
  - `dispatch(<message>, <payload>)`
  - `event.detail <payload>`
  - тип генерируемого события - `Custom Event`

### 60. Using Spread Props & Default Props

- Использование Spread оператора для передачи свойств из объекта: `<Product {...product}/>`
- Если присутствуют св-ва, которые компонент не ожидает - ничего страшного. Не нужно специально их извлекать.
- Значения по умолчанию задаются так: `export let bestseller = false;`

### 61. Working with Slots

Слоты позволяют указать где разместить вложенные компоненты

```JS
// Box.svelte
<div class="box">
  <slot /> // Вложенные компоненты отобразятся здесь
</div>

// App.svelte
<Box>
  <h2>Привет!</h2>
  <p>Это компонент box. Тут можно разместить что угодно.</p>
</Box>
```

- Слотов может быть несколько
- Слоты можно именовать и затем с помощью с-ва slot во вложенном элементе указать в какой слот выводить.

```JS
// Modal.svelte
<div class="modal">
  <header>
    <slot name="header" /> // Тут отобразится <h1>Hello!</h1>
  </header>
  <div class="content">
    <slot /> // Тут отобразится <p>This works!</p>
  </div>
  <footer>
    <slot name="footer">
      <button>Close</button> // Эта кнопка будет замещена кнопкой Confirm
    </slot>
  </footer>
</div>

// App.svelte
<Modal>
  <h1 slot="header">Hello!</h1>
  <p>This works!</p>
  <button slot="footer">Confirm</button>
</Modal>
```

### 64. Using Slot Props

Есть возможность передать значение из компонента в родительском компонент - обратно направленный поток данных. Сделать это можно используя свойства slot

1. В компоненте в теге slot прописываем произвольный аттрибут и привязываем к нему значение - точно так же, когда передаем в какой либо компонент свойство.

```JS
<script>
  let hovering = false;
</script>
<div on:mouseenter={() => hovering = true} on:mouseleave={() => hovering = false}>
  <slot hovering={hovering}></slot>
</div>
```

2. В родительском компоненте используем директиву `let:`

```JS
<script>
  let hovering = false;
</script>

<Hoverable let:hovering={hovering}>
  <div class:active={hovering}>
    {#if hovering}
      <p>На меня навели.</p>
    {:else}
      <p>Наведи на меня!</p>
    {/if}
  </div>
</Hoverable>
```

- Нужно объявить переменную `hovering` в обоих компонентах, т.к. хотя они связаны директивой, однако они все же две отдельные сущности.

### 65. The Component Lifecycle - Theory

Creation:

- Запускается секция `<script>` и выполняется базовая инициализация:
  - Внешние свойства компонента, значения по умолчанию
  - Переменные, их привязка
  - Функции и их привязка
- onMount() - специальная функция, предоставляемая Svelte - прекрасная возможность выполнить более сложную инициализацию.   
  - Например, получить данные из базы данных.
- onDestroy() - возможность удалить свои обработчики событий.

Updates:

- beforeUpdate() - возможность выполнить код, прямо перед тем, как Svelte начнет обновлять DOM.
  - Например можно сохранить состояние прокрутки, чтобы затем восстановить его после обновления.
  - Обратите внимание, что beforeUpdate первый раз будет запущен до монтирования компонента (и ф-ия onMount будет выполнена после него), поэтому нам нужно проверить существование div перед чтением его свойств.
- afterUpdate() - позволит выполнить код сразу после обновления
- tick() - При вызове функции будет возвращен промис, который будет выполнен, как только к DOM будут применены все необходимые на данный момент изменения состояния(или сразу, при отсутствии таковых).
  - Наверно это можно использовать в каких-то программных анимациях, или играх. Для более тонкой работы с UI.

```JS
// Restore selection
  tick().then(() => {
    e.target.selectionStart = selectionStart;
    e.target.selectionEnd = selectionEnd;
  });
```

Прокрутка
```JS
const modal = document.querySelector('.modal');
modal.scrollTo(0, modal.scrollHeight);
```

Какая клавиша нажата и позиция начала и окончания выделения текста.
```JS
const keyPressed = (e) {
  if (e.which !== 9)  { // Ignore, if not TAB pressed
	  return;
  }
  e.preventDefault();
  
  const start = e.targer.selectionStart;
  const end = e.targer.selectionEnd;
  // ...
}
```

## Section 7: Course Project - Components Deep Dive

- Используем значения по умолчанию null для большинства пропсов
- Если я не ошибаюсь, кастомные компоненты не могут использовать аттрибут `slot`. Например мою кнопку пришлось обернуть в `<div>`

## Section 8: Working with Bindings & Forms

### 83. Understanding Custom Component Bindings

- 'type' attribute cannot be dynamic if input uses two-way binding
  - В Svelte есть ограничение для таких случаев `<input type={type} bind:value={val} />` - на данный момент динамическое свойство `type` не работает одновременно с двухсторонним связыванием. 
- Возможно использовать двухстороннее связывание с любым экспортируемым свойством кастомного компонента, но это настоятельно не рекомендуется делать, т.к. затрудняет понимание и может привести к неожиданным багам.
- Двухстороннее связывание лучше всего использовать с input
- В других случаях, лучше воспользоваться custom events и слушать их в родительском компоненте.

### 84. Relying on Automatic Number Conversion

- Для `<input type="number">` нужно помнить что содержимое `event.target.value` это текст. Однако при использовании директивы `bind:value` Svelte уже обрабатывает значения как числа.

### 85. Binding Checkboxes & Radio Buttons

- `<input type="checkbox" bind:checked={agreed}>`
  - Используется свойство `checked`
- `bind:group`
  - для type="radio" - выбранное значение
  - для type="checkbox" - массив значений
    - только инициализировать необходимо переменную с массивом

### 86. Binding `<select>` Dropdowns

```HTML
<select bind:value={favCar}>
  <option value="aston-martin">
    Aston Martin
  </option>
  <option value="ferrari">
    Ferrari
  </option>
  <option value="porsche">
    Porsche
  </option>
</select>
```

- Списки можно создавать динамически с помощью {#each}
- В качестве значений можно использовать не только строки, но и числа и даже объекты

### 87. Binding to Element References

Доступная только для чтения привязка this применяется к любому HTML-элементу (или компоненту) и позволяет вам получить ссылку на отрендеренный элемент. 

- Есть возможность привязать ссылку на объект DOM
  - `bind:this={usernameInput}`
  - Может быть полезной, чтобы чтобы получить значения, классы, аттрибуты напрямую используя DOM API
  - Не рекомендуется использовать, чтобы менять DOM элементы.
- log.dir

### 88. Binding to Component References

- Ссылаться можно и на кастомные компоненты, которые, однако могут выглядеть и по другому.
- Используя Refs можно вызвать экспортированную функцию из кастомного компонента

```JS
// CustomInput.svelte
<script>
  export let val;
  export function empty() {
    val = '';
  };
</script>

<input type="text" bind:value={val} />

// App.svelte
<script>
  let val = 'Max';
  let customInput;
  const clearCustomInput = () => customInput.empty();
</script>

<CustomInput bind:val={val} bind:this={customInput}/>
<button on:click={clearCustomInput}>Clear Inputs</button>
```

### 89. Validating Forms & Inputs

Svelte не имеет встроенных средств для валидации, и предоставляет возможность реализовать свое решение, или использовать готовые библиотеки, например validate.js

## Section 9: Course Project - Bindings & Forms

- Для динамически вычисляемых значений в `$:` не нужно объявлять переменные. Кстати они по другому называются "реактивные объявления".

## Section 10: Managing State & Data with Stores

Проблема: С ростом сложности приложения, увеличивается количество statefull компонентов, которые должны быть связанны между собой. Ответственность за изменения этих данных распределена между ними, это удобно, но управлять изменениями становится сложно. Svelte.js имеет решение для таких случаев.

### 102. Creating a Writable Store, Subscribing & Updating

- Специальная функция `writable()` для создания хранилища
- Обычно хранилища находятся в отдельном js файле
- Функция `subscribe()` позволяет подписаться на изменения, используется для чтения/вывода данных
- Функция `set()` или `update()` которая изменяет данные, может использоваться в обработчиках событий
  - `set` полностью заменяет хранилище новыми данными
  - `update` принимает функцию

```JS
// cartStore.js
import { writable } from 'svelte/store';

const cart = writable([
  {
    id: "p1",
    title: "Test",
    price: 9.99
  },
  {
    id: "p2",
    title: "Test",
    price: 9.99
  }
]);

export default cart;

// Cart.svelte
<script>
  import CartItem from "./CartItem.svelte";
  import cartStore from "./cartStore.js"

  let items;

  cartStore.subscribe(
    data => items = data
  );
</script>

<ul>
  {#each items as item (item.id)}
    <CartItem id={item.id} title={item.title} price={item.price} />
  {:else}
    <p>No items in cart yet!</p>
  {/each}
</ul>

// Product.svelte
<script>
  import Button from "../UI/Button.svelte";
  import cartStore from "../Cart/cartStore.js"

  export let id;
  export let title;
  export let price;

  function addToCart() {
    cartStore.update(
      items => [...items, { id, title, price }]
    );
  }
</script>

<div class="product">
  <h1>{title}</h1>
  <h2>{price}</h2>
  <Button on:click={addToCart}>Add to Cart</Button>
</div>
```

- Никогда не мутируйте объект хранилища

### 105. Managing Store Subscriptions

- Подписка сохраняется, когда компонент удаляется из DOM. Во избежании утечки памяти, в таких случаях надо отменить подписку.
- Функция `subscribe()` возвращает функцию, с помощью которой можно отменить подписку на обновления в хранилище. Это удобно сделать в хуке `onDestroy`

```JS
// Cart.svelte
<script>
  import { onDestroy } from 'svelte';
  import cartStore from "./cartStore.js"

  let items;

  const unsubscribe = cartStore.subscribe(
    data => items = data
  );

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });
</script>
```

### 106. Using Autosubscriptions

- Используя префикс `$` перед именем хранилища позволяет сразу получать значения из хранилища, а Svelte управлять подпиской автоматически.
- Автоподписка работает только с переменными хранилищ, которые были объявлены (или импортированы) в верхнем уровне кода компонента.
- Предполагается, что любое имя, начинающееся с $, ссылается на значение хранилища. Это зарезервированный символ — Svelte не позволит вам объявлять переменные с префиксом $.

```JS
<script>
  import { onDestroy } from 'svelte';
  import CartItem from "./CartItem.svelte";
  import cartItems from "./cartStore.js"
</script>

<ul>
  {#each $cartItems as item (item.id)}
    <CartItem id={item.id} title={item.title} price={item.price} />
  {:else}
    <p>No items in cart yet!</p>
  {/each}
</ul>
```

### 109. Understanding Readable Stores

Иногда нам не нужно, чтобы подписчики могли изменять данные.

- Например:
  - Положение указателя мыши
  - Таймеры
  - Геолокация, которая не будет обновляться снаружи

```JS
import { readable } from 'svelte/store';

let currentDate = new Date();

export const time = readable(currentDate, function start(set) {
  const interval = setInterval(() => {
    currentDate = new date();
    set(currentDate);
  }, 1000);

  return function stop() {
    clearInterval(interval);
  };
});
```

- Первый аргумент readable — начальное значение. Можно задать null или undefined, если на данный момент значение ещё неизвестно.
- Второй — это функция start, которая принимает callback-функцию set и возвращает функцию stop.
  - Функция start вызывается, когда у хранилища появляется первый подписчик;
  - stop вызывается, когда отписывается последний подписчик.

### 110. Unlimited Power with Custom Stores

Можно создать хранилище с собственной логикой по управлению состоянием для конкретных задач.

```JS
import { writable } from 'svelte/store';

function createCount() {
  const { subscribe, set, update } = writable(0);

  return {
    subscribe,
    increment: () => update(n => n + 1),
    decrement: () => update(n => n - 1),
    reset: () => set(0)
  };
}

export const count = createCount();
```

- function паттерн удобен, если в одном файле находится несколько хранилищ. В противном случае, можно обойтись и без него, просто экспортировать объект.
- Главное условие, чтобы был правильный метод `subscribe`.
- Важно также, чтобы хранилище обновлялось с помощью методов `update/set`
