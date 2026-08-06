// EHCC course catalog. 20 courses; each lesson has reading, 3 videos, and a
// required quiz. Add courses/lessons here — the /courses pages render from this.
import type { Difficulty } from "./types";

export interface Video {
  title: string;
  channel: string;
  url: string;
}
export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number; // index of the correct option
}
export interface Lesson {
  id: string;
  title: string;
  summary: string;
  minutes: number;
  reading: string[]; // paragraphs (inline `code` supported)
  videos: Video[];
  quiz: QuizQuestion[];
}
export interface Course {
  id: string;
  title: string;
  icon: string; // emoji
  topic: string;
  difficulty: Difficulty;
  tagline: string;
  description: string;
  lessons: Lesson[];
}

// Shorthands to keep the data readable.
const v = (title: string, channel: string, url: string): Video => ({ title, channel, url });
const q = (question: string, options: string[], answer: number): QuizQuestion => ({ q: question, options, answer });

export const COURSES: Course[] = [
  {
    id: "python-foundations",
    title: "Python Foundations",
    icon: "🐍",
    topic: "Python",
    difficulty: "Beginner",
    tagline: "The on-ramp to everything else.",
    description: "Variables, logic, loops, and functions in Python — the language behind our Data Science and AI branches.",
    lessons: [
      {
        id: "variables-types",
        title: "Variables & Types",
        summary: "Name values and know what kind they are.",
        minutes: 12,
        reading: [
          "A variable is a name that points at a value; you assign with `=`. Python's core types are strings (text in quotes), ints and floats (numbers), and booleans (`True`/`False`). The type decides what you can do with a value.",
          "Python figures out the type for you, but you still have to keep them straight: `\"2\" + \"2\"` is `\"22\"` (joining text) while `2 + 2` is `4` (adding numbers). Mixing them is the classic beginner bug.",
        ],
        videos: [
          v("Learn Python — Full Course for Beginners", "freeCodeCamp", "https://www.youtube.com/watch?v=rfscVS0vtbw"),
          v("Python Variables & Data Types", "Programming with Mosh", "https://www.youtube.com/watch?v=kqtD5dpn9C8"),
          v("Python in 100 Seconds", "Fireship", "https://www.youtube.com/watch?v=x7X9w_GIm1s"),
        ],
        quiz: [
          q("What does `\"3\" + \"4\"` produce in Python?", ['`7`', '`\"34\"`', 'an error', '`\"7\"`'], 1),
          q("Which is a boolean value?", ['`\"True\"`', '`1`', '`True`', '`yes`'], 2),
          q("How do you assign the value 10 to a variable named score?", ['`score == 10`', '`score = 10`', '`10 = score`', '`let score 10`'], 1),
        ],
      },
      {
        id: "logic-and-loops",
        title: "Logic & Loops",
        summary: "Make code decide and repeat.",
        minutes: 14,
        reading: [
          "`if` / `elif` / `else` run different blocks depending on a condition built from comparisons (`==`, `<`, `>=`) and `and` / `or` / `not`. Indentation defines the block — Python is strict about it.",
          "A `for` loop walks through a collection one item at a time; a `while` loop repeats until its condition becomes `False`. Make sure a `while` can actually end, or it runs forever.",
        ],
        videos: [
          v("Conditionals & Booleans", "Corey Schafer", "https://www.youtube.com/watch?v=DZwmZ8Usvnk"),
          v("Loops in Python", "Corey Schafer", "https://www.youtube.com/watch?v=6iF8Xb7Z3wQ"),
          v("Python Full Course — control flow", "freeCodeCamp", "https://www.youtube.com/watch?v=rfscVS0vtbw"),
        ],
        quiz: [
          q("Which keyword handles the 'none of the above' case?", ['`elif`', '`else`', '`otherwise`', '`default`'], 1),
          q("What risk does a `while` loop carry that a `for` loop usually doesn't?", ['Using too much memory', 'Running forever', 'Skipping the first item', 'Reversing the list'], 1),
          q("What defines a block of code in Python?", ['Curly braces', 'Semicolons', 'Indentation', 'Parentheses'], 2),
        ],
      },
    ],
  },
  {
    id: "web-html-css",
    title: "Web: HTML & CSS",
    icon: "🎨",
    topic: "Web Dev",
    difficulty: "Beginner",
    tagline: "Build and style your first page.",
    description: "The structure and style of every website — the skills our Tech Master team uses to build sites like this one.",
    lessons: [
      {
        id: "html-structure",
        title: "HTML — Structure",
        summary: "The skeleton of every page.",
        minutes: 12,
        reading: [
          "HTML describes structure and content with tags. `<h1>` is a heading, `<p>` a paragraph, `<a href>` a link, `<img>` an image. Most tags come in pairs: an opening `<p>` and a closing `</p>`.",
          "The browser reads your HTML top to bottom and draws the page from it. Good structure (semantic tags) also makes your page accessible and easier to style.",
        ],
        videos: [
          v("HTML & CSS — Full Course", "freeCodeCamp", "https://www.youtube.com/watch?v=mU6anWqZJcc"),
          v("HTML in 100 Seconds", "Fireship", "https://www.youtube.com/watch?v=ok-plXXHlWw"),
          v("MDN — HTML basics", "Mozilla", "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics"),
        ],
        quiz: [
          q("Which tag makes a link?", ['`<link>`', '`<a>`', '`<href>`', '`<url>`'], 1),
          q("What does most HTML content need?", ['A semicolon', 'An opening and closing tag', 'A CSS file', 'A script'], 1),
          q("Which is a heading tag?", ['`<head>`', '`<h1>`', '`<title>`', '`<top>`'], 1),
        ],
      },
      {
        id: "css-style",
        title: "CSS — Style",
        summary: "Control how it looks.",
        minutes: 13,
        reading: [
          "CSS sets colors, spacing, fonts, and layout. You write a selector (what to target) and a set of properties (how it should look): `h1 { color: #22c55e; }`.",
          "Nobody memorizes all of CSS — keep MDN open. Modern layout uses Flexbox and Grid; learn those two and most layouts become straightforward.",
        ],
        videos: [
          v("CSS Crash Course", "freeCodeCamp", "https://www.youtube.com/watch?v=mU6anWqZJcc"),
          v("Flexbox in 100 Seconds", "Fireship", "https://www.youtube.com/watch?v=K74l26pE4YA"),
          v("MDN — Learn CSS", "Mozilla", "https://developer.mozilla.org/en-US/docs/Learn/CSS"),
        ],
        quiz: [
          q("What does a CSS selector do?", ['Runs JavaScript', 'Chooses which elements to style', 'Creates a variable', 'Loads an image'], 1),
          q("Which property sets text color?", ['`text`', '`font`', '`color`', '`ink`'], 2),
          q("Which is a modern CSS layout system?", ['Tables', 'Flexbox', 'Frames', 'Marquee'], 1),
        ],
      },
    ],
  },
  {
    id: "javascript-essentials",
    title: "JavaScript Essentials",
    icon: "⚡",
    topic: "Web Dev",
    difficulty: "Beginner",
    tagline: "Make pages do things.",
    description: "The language that runs in every browser — respond to clicks, change content, and fetch data.",
    lessons: [
      {
        id: "js-basics",
        title: "JavaScript Basics",
        summary: "Variables, functions, and the DOM.",
        minutes: 14,
        reading: [
          "You already know the ideas from Python — variables, conditions, loops, functions. JavaScript's syntax differs (`let`/`const`, curly braces, `===`), but the thinking transfers directly.",
          "In the browser, JavaScript reaches into the page through the DOM: `document.querySelector` finds an element, and `addEventListener` runs code when the user does something.",
        ],
        videos: [
          v("JavaScript Programming — Full Course", "freeCodeCamp", "https://www.youtube.com/watch?v=jS4aFq5-91M"),
          v("JavaScript in 100 Seconds", "Fireship", "https://www.youtube.com/watch?v=DHjqpvDnNGE"),
          v("MDN — JavaScript first steps", "Mozilla", "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps"),
        ],
        quiz: [
          q("Which keyword declares a constant?", ['`var`', '`let`', '`const`', '`def`'], 2),
          q("What does `document.querySelector` do?", ['Fetches a URL', 'Finds an element on the page', 'Declares a variable', 'Starts a loop'], 1),
          q("Which comparison checks value AND type in JS?", ['`=`', '`==`', '`===`', '`~=`'], 2),
        ],
      },
    ],
  },
  {
    id: "git-github",
    title: "Git & GitHub",
    icon: "🔀",
    topic: "Tools",
    difficulty: "Beginner",
    tagline: "How teams ship together.",
    description: "Version control, branches, and pull requests — the workflow every EHCC project runs on.",
    lessons: [
      {
        id: "commits-branches",
        title: "Commits & Branches",
        summary: "Save checkpoints and work in parallel.",
        minutes: 12,
        reading: [
          "A commit is a saved snapshot of your files with a message describing the change — a save point you can rewind to. The habit: small change, clear commit, repeat.",
          "A branch is a parallel copy of the project. You try something on a branch while `main` stays safe; if it works you merge it back, if not you delete the branch. This is what lets a whole team work at once.",
        ],
        videos: [
          v("Git & GitHub for Beginners", "freeCodeCamp", "https://www.youtube.com/watch?v=RGOj5yH7evk"),
          v("Git in 100 Seconds", "Fireship", "https://www.youtube.com/watch?v=hwP7WQkmECE"),
          v("Git Branching & Merging", "The Net Ninja", "https://www.youtube.com/watch?v=e2IbNHi4uCI"),
        ],
        quiz: [
          q("What is a commit?", ['A saved snapshot with a message', 'A deleted file', 'A new branch', 'A merge conflict'], 0),
          q("Why work on a branch?", ['To make code run faster', 'To experiment without breaking main', 'To delete history', 'To hide bugs'], 1),
          q("On GitHub, what proposes merging your branch in?", ['An issue', 'A pull request', 'A gist', 'A fork'], 1),
        ],
      },
    ],
  },
  {
    id: "command-line",
    title: "The Command Line",
    icon: "⌨️",
    topic: "Tools",
    difficulty: "Beginner",
    tagline: "Talk to your computer directly.",
    description: "Navigate, move files, and run tools from the terminal — the developer's default workspace.",
    lessons: [
      {
        id: "terminal-basics",
        title: "Terminal Basics",
        summary: "Move around and manage files.",
        minutes: 10,
        reading: [
          "The terminal runs one command at a time. `pwd` shows where you are, `ls` lists files, `cd` changes directory, `mkdir` makes a folder. These four get you most of the way.",
          "The command line feels intimidating for a day, then becomes faster than clicking. Every serious tool — git, Python, deploys — is driven from here.",
        ],
        videos: [
          v("Command Line Crash Course", "freeCodeCamp", "https://www.youtube.com/watch?v=uwAqEzhyjtw"),
          v("The Missing Semester — the shell", "MIT", "https://missing.csail.mit.edu/2020/course-shell/"),
          v("Terminal in 100 Seconds", "Fireship", "https://www.youtube.com/watch?v=Uf7Sc82W90A"),
        ],
        quiz: [
          q("Which command lists files in the current folder?", ['`cd`', '`ls`', '`pwd`', '`mv`'], 1),
          q("What does `cd` do?", ['Copies a file', 'Deletes a folder', 'Changes directory', 'Clears the screen'], 2),
          q("Which makes a new folder?", ['`mkdir`', '`newdir`', '`touch`', '`folder`'], 0),
        ],
      },
    ],
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering",
    icon: "✨",
    topic: "AI",
    difficulty: "Beginner",
    tagline: "Ask well, get better results.",
    description: "Get reliable, useful output from AI models — a core skill of the AI Principles / Programming branch.",
    lessons: [
      {
        id: "prompt-basics",
        title: "Prompting Basics",
        summary: "Context, goal, format, examples.",
        minutes: 11,
        reading: [
          "A prompt is your instruction to the model. Vague prompts get vague answers. The fixes are simple: give context, state the goal clearly, show the format you want, and ask it to work step by step.",
          "Treat prompting like debugging — if the output is off, change one thing and try again. Iteration beats hunting for a mythical 'perfect prompt'.",
        ],
        videos: [
          v("Intro to Large Language Models", "Andrej Karpathy", "https://www.youtube.com/watch?v=zjkBMFhNj_g"),
          v("Prompt Engineering Overview", "Anthropic Docs", "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview"),
          v("Prompt Engineering in 100 Seconds", "Fireship", "https://www.youtube.com/watch?v=_ZvnD73m40o"),
        ],
        quiz: [
          q("What usually improves a weak prompt most?", ['Making it shorter', 'Adding context, goal, and format', 'Using all caps', 'Asking twice'], 1),
          q("What is a good mindset for prompting?", ['One perfect try', 'Iterate like debugging', 'Never revise', 'Copy someone else'], 1),
          q("Asking a model to 'work step by step' tends to...", ['Slow your computer', 'Improve reasoning on hard tasks', 'Delete context', 'Do nothing'], 1),
        ],
      },
    ],
  },
  {
    id: "building-with-ai",
    title: "Building with AI",
    icon: "🤖",
    topic: "AI",
    difficulty: "Intermediate",
    tagline: "Ship real things faster.",
    description: "Use AI as a force multiplier to prototype, debug, and build — while still owning and understanding the result.",
    lessons: [
      {
        id: "ai-as-tool",
        title: "AI as a Build Tool",
        summary: "Scaffold, explain, and prototype fast.",
        minutes: 12,
        reading: [
          "AI can scaffold a page, explain an error, draft a function, or turn an idea into a first prototype in minutes. Used well, it removes the blank-page problem.",
          "But you own the result: read what it gives you, test it, and make sure you understand the code. The AI branch is about using these tools on a real foundation, not blindly.",
        ],
        videos: [
          v("CS50 — AI with Python", "Harvard", "https://cs50.harvard.edu/ai/"),
          v("How AI Models Work — Neural Networks", "3Blue1Brown", "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi"),
          v("Build apps with AI", "Fireship", "https://www.youtube.com/@Fireship"),
        ],
        quiz: [
          q("What should you always do with AI-generated code?", ['Ship it immediately', 'Read, test, and understand it', 'Never use it', 'Hide it'], 1),
          q("A good use of AI while building is to...", ['Avoid learning', 'Prototype and explain errors', 'Skip testing', 'Guess randomly'], 1),
          q("Who is responsible for the final result?", ['The model', 'You', 'Nobody', 'The browser'], 1),
        ],
      },
    ],
  },
  {
    id: "react-intro",
    title: "React from Scratch",
    icon: "⚛️",
    topic: "Web Dev",
    difficulty: "Intermediate",
    tagline: "Build interfaces from components.",
    description: "Components, props, and state — the library behind this very website.",
    lessons: [
      {
        id: "components-props",
        title: "Components & Props",
        summary: "Reusable pieces that take inputs.",
        minutes: 13,
        reading: [
          "A React component is a function that returns UI. You compose small components into bigger ones — a page is just components inside components.",
          "Props are the inputs you pass to a component, like arguments to a function. The same component with different props renders different content — that's how one `Card` shows many events.",
        ],
        videos: [
          v("React Course — Beginner's Tutorial", "freeCodeCamp", "https://www.youtube.com/watch?v=bMknfKXIFA8"),
          v("React in 100 Seconds", "Fireship", "https://www.youtube.com/watch?v=Tn6-PIqc4UM"),
          v("React Docs — Quick Start", "react.dev", "https://react.dev/learn"),
        ],
        quiz: [
          q("What does a React component return?", ['A database row', 'UI', 'A CSS file', 'A commit'], 1),
          q("What are props?", ['Inputs passed to a component', 'A styling system', 'A type of loop', 'A server'], 0),
          q("How do you build big UIs in React?", ['One giant function', 'Compose small components', 'Only HTML', 'Copy-paste'], 1),
        ],
      },
    ],
  },
  {
    id: "data-science-python",
    title: "Data Science with Python",
    icon: "📊",
    topic: "Data Science",
    difficulty: "Intermediate",
    tagline: "Turn raw data into insight.",
    description: "pandas, cleaning, and visualization — the Data Science branch's core toolkit.",
    lessons: [
      {
        id: "pandas-intro",
        title: "Working with pandas",
        summary: "Load, clean, and explore data.",
        minutes: 14,
        reading: [
          "pandas is Python's data workhorse. A DataFrame is a table you can filter, group, and summarize in a line or two. Most data work is loading a file into a DataFrame and asking questions of it.",
          "Real data is messy — missing values, wrong types, duplicates. Cleaning is most of the job, and doing it carefully is what separates a trustworthy analysis from a misleading one.",
        ],
        videos: [
          v("Data Analysis with Python — Full Course", "freeCodeCamp", "https://www.youtube.com/watch?v=r-uOLxNrNk8"),
          v("pandas in 100 Seconds", "Fireship", "https://www.youtube.com/watch?v=dcqPhpY7tWk"),
          v("Kaggle Learn — pandas", "Kaggle", "https://www.kaggle.com/learn/pandas"),
        ],
        quiz: [
          q("What is a pandas DataFrame?", ['A chart', 'A table of data', 'A neural network', 'A web page'], 1),
          q("What takes up most of real data work?", ['Cleaning data', 'Naming files', 'Picking colors', 'Writing loops'], 0),
          q("pandas is primarily used with which language?", ['JavaScript', 'Python', 'C++', 'Java'], 1),
        ],
      },
    ],
  },
  {
    id: "machine-learning",
    title: "Intro to Machine Learning",
    icon: "🧠",
    topic: "AI",
    difficulty: "Intermediate",
    tagline: "Programs that learn from data.",
    description: "The intuition and the code behind models that find patterns and make predictions.",
    lessons: [
      {
        id: "ml-concepts",
        title: "Core ML Concepts",
        summary: "Training, features, and overfitting.",
        minutes: 13,
        reading: [
          "Instead of hand-coding every rule, an ML model learns patterns from example data (features and labels) and uses them to predict on new, unseen inputs.",
          "The big trap is overfitting: a model that memorizes the training data but fails on new data. You guard against it by testing on data the model never saw during training.",
        ],
        videos: [
          v("Machine Learning for Everybody", "freeCodeCamp", "https://www.youtube.com/watch?v=i_LwzRVP7bg"),
          v("Machine Learning in 100 Seconds", "Fireship", "https://www.youtube.com/watch?v=PeMlggyqz0Y"),
          v("Kaggle Learn — Intro to ML", "Kaggle", "https://www.kaggle.com/learn/intro-to-machine-learning"),
        ],
        quiz: [
          q("What does an ML model learn from?", ['Random guesses', 'Example data', 'The programmer only', 'Nothing'], 1),
          q("What is overfitting?", ['A model too small', 'Memorizing training data, failing on new data', 'A fast model', 'A missing file'], 1),
          q("How do you check for overfitting?", ['Test on unseen data', 'Train longer', 'Use bigger fonts', 'Delete the data'], 0),
        ],
      },
    ],
  },
  {
    id: "neural-networks",
    title: "Neural Networks",
    icon: "🕸️",
    topic: "AI",
    difficulty: "Advanced",
    tagline: "The math that learns.",
    description: "How layers of simple units combine to recognize patterns — built from intuition up.",
    lessons: [
      {
        id: "how-nets-learn",
        title: "How Networks Learn",
        summary: "Neurons, weights, and backprop.",
        minutes: 15,
        reading: [
          "A neural network is layers of connected 'neurons'. Each connection has a weight, and training nudges those weights so the network's output gets closer to the right answer.",
          "That nudging is done by backpropagation and gradient descent — measure how wrong you are, then adjust weights a little in the direction that reduces the error. Repeat millions of times and the network learns.",
        ],
        videos: [
          v("But what is a Neural Network?", "3Blue1Brown", "https://www.youtube.com/watch?v=aircAruvnKk"),
          v("Gradient descent, how networks learn", "3Blue1Brown", "https://www.youtube.com/watch?v=IHZwWFHWa-w"),
          v("Neural Networks — full playlist", "3Blue1Brown", "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi"),
        ],
        quiz: [
          q("What does training adjust?", ['The screen', 'The weights', 'The dataset size', 'The language'], 1),
          q("What is backpropagation used for?", ['Loading data', 'Adjusting weights to reduce error', 'Drawing charts', 'Saving files'], 1),
          q("A neural network is organized into...", ['Rows', 'Layers of neurons', 'Folders', 'Branches'], 1),
        ],
      },
    ],
  },
  {
    id: "sql-databases",
    title: "Databases & SQL",
    icon: "🗄️",
    topic: "Data Science",
    difficulty: "Intermediate",
    tagline: "Store and query structured data.",
    description: "Tables, queries, and relationships — where real apps keep their data.",
    lessons: [
      {
        id: "sql-basics",
        title: "SQL Basics",
        summary: "SELECT, WHERE, and JOIN.",
        minutes: 13,
        reading: [
          "A relational database stores data in tables of rows and columns. SQL is the language you use to ask questions: `SELECT name FROM members WHERE grade = 10`.",
          "The real power is relationships — a `JOIN` combines rows from two tables that share a key, so you can answer questions that span your whole dataset.",
        ],
        videos: [
          v("SQL Tutorial — Full Course", "freeCodeCamp", "https://www.youtube.com/watch?v=HXV3zeQKqGY"),
          v("SQL in 100 Seconds", "Fireship", "https://www.youtube.com/watch?v=zsjvFFKOm3c"),
          v("Kaggle Learn — Intro to SQL", "Kaggle", "https://www.kaggle.com/learn/intro-to-sql"),
        ],
        quiz: [
          q("Which SQL keyword reads data?", ['`GET`', '`SELECT`', '`READ`', '`FIND`'], 1),
          q("What does `WHERE` do?", ['Sorts rows', 'Filters rows by a condition', 'Deletes a table', 'Creates a column'], 1),
          q("What does a `JOIN` do?", ['Combines rows from two tables', 'Deletes duplicates', 'Backs up data', 'Renames a column'], 0),
        ],
      },
    ],
  },
  {
    id: "apis-and-http",
    title: "APIs & HTTP",
    icon: "🔌",
    topic: "Web Dev",
    difficulty: "Intermediate",
    tagline: "How programs talk to each other.",
    description: "Requests, responses, and JSON — the glue between every modern app and service.",
    lessons: [
      {
        id: "http-json",
        title: "Requests, Responses & JSON",
        summary: "The language of the web.",
        minutes: 12,
        reading: [
          "An API lets one program request data or actions from another using set rules. Over HTTP you send a request (a method like GET or POST and a URL) and get back a response with a status code and data.",
          "That data is usually JSON — a simple, human-readable format of keys and values that maps neatly onto objects in code. Fetch it, parse it, use it.",
        ],
        videos: [
          v("APIs for Beginners", "freeCodeCamp", "https://www.youtube.com/watch?v=WXsD0ZgxjRw"),
          v("HTTP in 100 Seconds", "Fireship", "https://www.youtube.com/watch?v=iYM2zFP3Zn0"),
          v("MDN — Fetch & working with APIs", "Mozilla", "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch"),
        ],
        quiz: [
          q("Which HTTP method typically reads data?", ['POST', 'GET', 'DELETE', 'PUT'], 1),
          q("What format do most APIs return?", ['PDF', 'JSON', 'MP3', 'ZIP'], 1),
          q("A status code tells you...", ['The weather', 'Whether the request succeeded', 'Your IP', 'The font'], 1),
        ],
      },
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Basics",
    icon: "🛡️",
    topic: "Cybersecurity",
    difficulty: "Intermediate",
    tagline: "Think like an attacker, defend like a pro.",
    description: "Threat models, common web exploits, and safe habits — hands-on, CTF-style thinking.",
    lessons: [
      {
        id: "security-foundations",
        title: "Security Foundations",
        summary: "Threats, passwords, and encryption.",
        minutes: 12,
        reading: [
          "Security starts with a threat model: who might attack, what they want, and what you're protecting. You can't defend everything, so you defend what matters against realistic attackers.",
          "Two everyday pillars: strong, unique passwords (a manager beats memory) and encryption, which scrambles data with a key so only the right person can read it — the backbone of safe communication online.",
        ],
        videos: [
          v("Cyber Security Full Course", "freeCodeCamp", "https://www.youtube.com/watch?v=U_P23SqJaDc"),
          v("PicoCTF — beginner CTF challenges", "picoCTF", "https://picoctf.org/"),
          v("Encryption in 100 Seconds", "Fireship", "https://www.youtube.com/watch?v=NuyzuNBFWxQ"),
        ],
        quiz: [
          q("What is a threat model?", ['A firewall', 'Who might attack and what you protect', 'A password', 'A virus'], 1),
          q("What does encryption do?", ['Speeds up wifi', 'Scrambles data so only a key can read it', 'Deletes files', 'Blocks ads'], 1),
          q("Best password habit?", ['Reuse one everywhere', 'Strong, unique passwords via a manager', 'Short and simple', 'Your birthday'], 1),
        ],
      },
    ],
  },
  {
    id: "algorithms",
    title: "Algorithms & Big-O",
    icon: "📈",
    topic: "Programming",
    difficulty: "Intermediate",
    tagline: "Write code that scales.",
    description: "Core algorithms and how to reason about efficiency — essential for interviews and competitions.",
    lessons: [
      {
        id: "big-o",
        title: "Big-O & Efficiency",
        summary: "How code grows with input.",
        minutes: 13,
        reading: [
          "An algorithm is a step-by-step procedure to solve a problem. Big-O notation describes how its time or memory grows as the input gets larger, ignoring constants — `O(n)` is linear, `O(n²)` is quadratic.",
          "This matters because a slow approach that works on 10 items can freeze on 10,000. Choosing the right algorithm is often the difference between instant and unusable.",
        ],
        videos: [
          v("Big-O Notation — Full Course", "freeCodeCamp", "https://www.youtube.com/watch?v=Mo4vesaut8g"),
          v("Big-O in 100 Seconds", "Fireship", "https://www.youtube.com/watch?v=BgLTDT03QtU"),
          v("Algorithms — Harvard CS50", "Harvard", "https://cs50.harvard.edu/x/"),
        ],
        quiz: [
          q("What does Big-O describe?", ['Code color', 'How runtime grows with input size', 'File size', 'Bug count'], 1),
          q("Which is faster for large inputs?", ['`O(n²)`', '`O(n)`', 'They are equal', '`O(n²)` always'], 1),
          q("An algorithm is...", ['A programming language', 'A step-by-step procedure', 'A computer', 'A database'], 1),
        ],
      },
    ],
  },
  {
    id: "discord-bots",
    title: "Build a Discord Bot",
    icon: "💬",
    topic: "Projects",
    difficulty: "Intermediate",
    tagline: "Automate your server.",
    description: "A hands-on project course: build a bot that responds to commands and events.",
    lessons: [
      {
        id: "first-bot",
        title: "Your First Bot",
        summary: "Commands, events, and tokens.",
        minutes: 14,
        reading: [
          "A Discord bot is a program that logs into Discord and reacts to events — messages, joins, reactions. You register it in the Discord developer portal and drive it with a library like discord.py or discord.js.",
          "Your bot token is a secret — never commit it to a public repo. Keep it in an environment variable, exactly the kind of thing our `.gitignore` protects.",
        ],
        videos: [
          v("Discord Bot with Python", "freeCodeCamp", "https://www.youtube.com/watch?v=SPTfmiYiuok"),
          v("Discord.js Bot Tutorial", "The Net Ninja", "https://www.youtube.com/watch?v=NwmHbYJcCyg"),
          v("Discord Developer Portal — docs", "Discord", "https://discord.com/developers/docs/intro"),
        ],
        quiz: [
          q("What drives a Discord bot?", ['Reacting to events', 'A spreadsheet', 'A CSS file', 'A printer'], 0),
          q("What must you keep secret?", ['The bot name', 'The bot token', 'The server icon', 'The channel list'], 1),
          q("Where should a token live?", ['In the public repo', 'In an environment variable', 'In the README', 'In a tweet'], 1),
        ],
      },
    ],
  },
  {
    id: "game-dev",
    title: "Game Dev Basics",
    icon: "🎮",
    topic: "Projects",
    difficulty: "Beginner",
    tagline: "Loops, input, and drawing.",
    description: "The core loop behind every game — update, draw, repeat — and how to handle player input.",
    lessons: [
      {
        id: "game-loop",
        title: "The Game Loop",
        summary: "Update, render, repeat.",
        minutes: 11,
        reading: [
          "Every game runs a loop: read input, update the game state (positions, score), draw the frame, and repeat many times per second. Smooth movement is just small updates done fast.",
          "Start tiny — move a square with the arrow keys. Games are motivating because you see and feel every change instantly, which makes debugging fun instead of abstract.",
        ],
        videos: [
          v("Game Development with JavaScript", "freeCodeCamp", "https://www.youtube.com/watch?v=GFO_txvwK_c"),
          v("Pygame in 90 Minutes", "freeCodeCamp", "https://www.youtube.com/watch?v=jO6qQDNa2UY"),
          v("The Game Loop explained", "Fireship", "https://www.youtube.com/@Fireship"),
        ],
        quiz: [
          q("What does a game loop do each frame?", ['Nothing', 'Input, update, draw, repeat', 'Only draw once', 'Save the file'], 1),
          q("Smooth movement comes from...", ['One big jump', 'Small fast updates', 'Slower computers', 'More colors'], 1),
          q("A good first game project is...", ['A 3D MMO', 'Move a square with arrow keys', 'An operating system', 'A compiler'], 1),
        ],
      },
    ],
  },
  {
    id: "deploy-and-hosting",
    title: "Shipping & Hosting",
    icon: "🚀",
    topic: "Tools",
    difficulty: "Beginner",
    tagline: "Put it on the internet.",
    description: "Take a project from your laptop to a public URL people can actually use — like this site on Vercel.",
    lessons: [
      {
        id: "deploy-basics",
        title: "Deploying a Project",
        summary: "From localhost to a live URL.",
        minutes: 10,
        reading: [
          "A project isn't real until someone else can open it. Free hosts like Vercel, Netlify, and GitHub Pages take your code and give you a public URL — often by connecting your GitHub repo so every push auto-deploys.",
          "Ship early, ship rough, then improve. A live link you can share beats a perfect project nobody sees — this website went live the same way.",
        ],
        videos: [
          v("Deploy a website — full guide", "freeCodeCamp", "https://www.youtube.com/watch?v=Kx_1NYYJS7Q"),
          v("Vercel in 100 Seconds", "Fireship", "https://www.youtube.com/watch?v=hEnDFmB5W25"),
          v("Vercel — deploy docs", "Vercel", "https://vercel.com/docs/deployments/overview"),
        ],
        quiz: [
          q("When is a project 'real'?", ['When it compiles', 'When others can open it', 'When it has comments', 'Never'], 1),
          q("What does connecting a GitHub repo enable?", ['Auto-deploy on push', 'Faster typing', 'More storage', 'Free coffee'], 0),
          q("Good shipping advice?", ['Wait for perfect', 'Ship early, then improve', 'Never deploy', 'Email a zip'], 1),
        ],
      },
    ],
  },
  {
    id: "hackathon-playbook",
    title: "Hackathon Playbook",
    icon: "🏆",
    topic: "Projects",
    difficulty: "Beginner",
    tagline: "Build and pitch in 24 hours.",
    description: "How to scope, build, and present a project under time pressure — the Hackathon branch's edge.",
    lessons: [
      {
        id: "hackathon-strategy",
        title: "Scope, Build, Pitch",
        summary: "Win with focus, not features.",
        minutes: 11,
        reading: [
          "Hackathons are won by focus. Pick one clear problem, build the smallest version that shows the idea, and leave time to polish the demo. Judges remember a working story, not a feature list.",
          "Split the team by strength — someone builds, someone designs, someone prepares the pitch. Practice the demo out loud; a smooth 2-minute pitch beats a buggy live coding attempt.",
        ],
        videos: [
          v("How to win a Hackathon", "Fireship", "https://www.youtube.com/watch?v=Unzc731iCUY"),
          v("Hackathon tips for beginners", "freeCodeCamp", "https://www.youtube.com/@freecodecamp"),
          v("MLH — Hackathon resources", "Major League Hacking", "https://mlh.io/"),
        ],
        quiz: [
          q("Hackathons are won mostly by...", ['The most features', 'Focus and a clear demo', 'The biggest team', 'Luck'], 1),
          q("What should you protect time for?", ['More features', 'Polishing the demo/pitch', 'Sleeping in', 'Rewriting from scratch'], 1),
          q("A strong pitch is...", ['Long and technical', 'A smooth 2-minute story', 'Silent', 'Only code'], 1),
        ],
      },
    ],
  },
  {
    id: "interview-prep",
    title: "Coding Interview Prep",
    icon: "🎯",
    topic: "Programming",
    difficulty: "Advanced",
    tagline: "Solve problems under pressure.",
    description: "Patterns, data structures, and communication for technical interviews and competitions.",
    lessons: [
      {
        id: "interview-patterns",
        title: "Patterns & Communication",
        summary: "Think out loud, use the right structure.",
        minutes: 13,
        reading: [
          "Most interview problems are variations on a few patterns — two pointers, hash maps for lookups, sliding windows, recursion. Recognizing the pattern is half the battle; practice builds that recognition.",
          "Communication counts as much as the answer. Restate the problem, think out loud, state your approach and its Big-O before coding, then test with an example. A clear, correct O(n) beats a silent, clever O(n²).",
        ],
        videos: [
          v("Coding Interview Patterns", "freeCodeCamp", "https://www.youtube.com/watch?v=xo7XrRVxH8Y"),
          v("Data Structures — Full Course", "freeCodeCamp", "https://www.youtube.com/watch?v=RBSGKlAvoiM"),
          v("LeetCode patterns — NeetCode", "NeetCode", "https://neetcode.io/"),
        ],
        quiz: [
          q("Most interview problems reduce to...", ['Memorizing answers', 'A few reusable patterns', 'Luck', 'Typing speed'], 1),
          q("A hash map is great for...", ['Fast lookups', 'Drawing UI', 'Sorting colors', 'Nothing'], 0),
          q("What should you state before coding?", ['Your favorite language', 'Your approach and its Big-O', 'The weather', 'Your name'], 1),
        ],
      },
    ],
  },
];

// ---- Derived helpers (single source of truth) ----
export const COURSE_COUNT = COURSES.length;
export const LESSON_COUNT = COURSES.reduce((n, c) => n + c.lessons.length, 0);
export const TOPICS = Array.from(new Set(COURSES.map((c) => c.topic))).sort();

export function getCourse(id: string) {
  return COURSES.find((c) => c.id === id) ?? null;
}

export function getLesson(courseId: string, lessonId: string) {
  const course = getCourse(courseId);
  if (!course) return null;
  const idx = course.lessons.findIndex((l) => l.id === lessonId);
  if (idx === -1) return null;
  return {
    course,
    lesson: course.lessons[idx],
    prev: idx > 0 ? course.lessons[idx - 1] : null,
    next: idx < course.lessons.length - 1 ? course.lessons[idx + 1] : null,
  };
}

/** All (courseId, lessonId) pairs — for static generation. */
export const ALL_LESSON_PARAMS = COURSES.flatMap((c) =>
  c.lessons.map((l) => ({ courseId: c.id, lessonId: l.id }))
);

