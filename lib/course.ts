// EHCC "Coding Foundations" curriculum — the shared base across all three branches.
// Add units/lessons by editing this file; the /courses pages render from it.
import type { Difficulty } from "./types";

export interface VideoSource {
  title: string;
  channel: string;
  url: string; // real, curated free source (opens in a new tab)
}

export interface Lesson {
  id: string; // globally unique, used in the URL: /courses/[id]
  title: string;
  summary: string;
  minutes: number;
  content: string[]; // short paragraphs
  code?: string; // optional static example
  video?: VideoSource;
}

export interface CourseUnit {
  num: number;
  id: string;
  title: string;
  summary: string;
  difficulty: Difficulty;
  lessons: Lesson[]; // empty ⇒ "Coming soon"
}

export const COURSE = {
  title: "EHCC Coding Foundations",
  eyebrow: "// curriculum.units[]",
  tagline: "Student-built lessons for going from zero to shipping — Python, the web, and building with AI.",
  primaryLanguage: "Python",
  focus: "Web + AI",
};

export const UNITS: CourseUnit[] = [
  {
    num: 1,
    id: "getting-started",
    title: "Getting Started",
    summary: "Run your first code in the browser, then set up the tools real projects use.",
    difficulty: "Beginner",
    lessons: [
      {
        id: "how-code-runs",
        title: "How Code Runs",
        summary: "What actually happens when you run a program.",
        minutes: 6,
        content: [
          "Code is a set of instructions a computer follows top to bottom, exactly as written. The computer never guesses what you meant — precision is the whole game.",
          "You write source code in a language (we start with Python), and an interpreter reads it and does what it says. When something breaks, it's almost always because the instructions said something slightly different from what you intended.",
          "You don't need to install anything to start. You can run and read every lesson in the browser, and set up local tools later when you're ready to build real projects.",
        ],
        video: {
          title: "Learn Python — Full Course for Beginners",
          channel: "freeCodeCamp",
          url: "https://www.youtube.com/watch?v=rfscVS0vtbw",
        },
      },
      {
        id: "your-first-program",
        title: "Your First Program",
        summary: "Print output and read what the computer tells you back.",
        minutes: 7,
        content: [
          "`print()` displays a value. It's how your program talks to you, and it's the single most useful debugging tool you'll ever have — when unsure what a value is, print it.",
          "Text values are called strings and go in quotes. Numbers don't. Getting that distinction right is most of what beginners trip on early.",
        ],
        code: 'print("Hello, EHCC!")\nprint(2 + 2)          # 4\nprint("2" + "2")      # "22"  ← strings join, they don\'t add',
        video: {
          title: "Python in 100 Seconds",
          channel: "Fireship",
          url: "https://www.youtube.com/watch?v=x7X9w_GIm1s",
        },
      },
      {
        id: "setting-up-tools",
        title: "Setting Up Your Tools",
        summary: "Optional: the local setup real projects use.",
        minutes: 8,
        content: [
          "The browser is enough for lessons. When you want to build something real and share it, you'll set up a local environment: an editor (VS Code), Python installed, and a terminal.",
          "This is optional for now. Come back when you start your first project — don't let setup block you from learning the ideas.",
        ],
        video: {
          title: "CS50x — Harvard's Intro to Computer Science",
          channel: "Harvard (free)",
          url: "https://cs50.harvard.edu/x/",
        },
      },
    ],
  },
  {
    num: 2,
    id: "python-basics",
    title: "Python Basics",
    summary: "Variables, data types, and getting input in and out of a program.",
    difficulty: "Beginner",
    lessons: [
      {
        id: "variables-and-types",
        title: "Variables & Types",
        summary: "Name values so you can reuse them.",
        minutes: 8,
        content: [
          "A variable is a name that points at a value. You assign with `=`. The name on the left, the value on the right.",
          "Python has a few core types: strings (text), ints and floats (numbers), and booleans (`True`/`False`). The type decides what you can do with a value.",
        ],
        code: 'name = "Ada"\nage = 15\nis_member = True\n\nprint(name, "is", age)   # Ada is 15',
        video: {
          title: "Python Variables & Data Types",
          channel: "Programming with Mosh",
          url: "https://www.youtube.com/watch?v=kqtD5dpn9C8",
        },
      },
      {
        id: "strings-and-input",
        title: "Strings & Input",
        summary: "Work with text and read from the user.",
        minutes: 8,
        content: [
          "Strings can be joined, sliced, and formatted. f-strings (`f\"...\"`) let you drop variables straight into text — the cleanest way to build output.",
          "`input()` pauses and waits for the user to type. Remember: it always returns a string, so convert with `int()` when you need a number.",
        ],
        code: 'name = input("Your name? ")\nprint(f"Welcome to EHCC, {name}!")',
        video: {
          title: "Python Full Course — Strings & I/O",
          channel: "freeCodeCamp",
          url: "https://www.youtube.com/watch?v=rfscVS0vtbw",
        },
      },
    ],
  },
  {
    num: 3,
    id: "logic-and-decisions",
    title: "Logic & Decisions",
    summary: "Use conditions and comparisons to make code react.",
    difficulty: "Beginner",
    lessons: [
      {
        id: "if-statements",
        title: "If / Elif / Else",
        summary: "Branch based on a condition.",
        minutes: 9,
        content: [
          "An `if` runs a block only when its condition is `True`. Add `elif` for more cases and `else` for everything left over. Indentation defines the block — Python is strict about it.",
          "Conditions are built from comparisons (`==`, `!=`, `<`, `>=`) and can be combined with `and`, `or`, and `not`.",
        ],
        code: 'score = 82\nif score >= 90:\n    print("A")\nelif score >= 80:\n    print("B")\nelse:\n    print("Keep going")',
        video: {
          title: "Conditionals & Booleans",
          channel: "Corey Schafer",
          url: "https://www.youtube.com/watch?v=DZwmZ8Usvnk",
        },
      },
    ],
  },
  {
    num: 4,
    id: "loops-and-collections",
    title: "Loops & Collections",
    summary: "Repeat work and store many values at once.",
    difficulty: "Beginner",
    lessons: [
      {
        id: "lists-and-dicts",
        title: "Lists & Dictionaries",
        summary: "The two collections you'll use constantly.",
        minutes: 9,
        content: [
          "A list holds an ordered sequence of values: `[1, 2, 3]`. You index from 0. A dictionary maps keys to values: `{\"name\": \"Ada\"}` — great for structured records.",
          "Almost every real program is moving data in and out of lists and dicts. Get comfortable here and everything else gets easier.",
        ],
        code: 'branches = ["Hackathon", "Data Science", "AI Principles"]\nprint(branches[0])        # Hackathon\n\nmember = {"name": "Ada", "grade": 10}\nprint(member["name"])     # Ada',
        video: {
          title: "Lists, Tuples & Dictionaries",
          channel: "Corey Schafer",
          url: "https://www.youtube.com/watch?v=W8KRzm-HUcc",
        },
      },
      {
        id: "for-and-while",
        title: "For & While Loops",
        summary: "Do something to every item, or until a condition changes.",
        minutes: 9,
        content: [
          "A `for` loop walks through a collection one item at a time. A `while` loop keeps going until its condition is `False` — powerful, but make sure it can actually end, or it runs forever.",
        ],
        code: 'for branch in branches:\n    print("Welcome to the", branch, "branch")\n\ncount = 3\nwhile count > 0:\n    print(count)\n    count = count - 1',
        video: {
          title: "Loops in Python",
          channel: "Corey Schafer",
          url: "https://www.youtube.com/watch?v=6iF8Xb7Z3wQ",
        },
      },
    ],
  },
  {
    num: 5,
    id: "functions",
    title: "Functions & Organization",
    summary: "Package logic into reusable, named pieces.",
    difficulty: "Intermediate",
    lessons: [
      {
        id: "defining-functions",
        title: "Defining Functions",
        summary: "Give a block of code a name you can call.",
        minutes: 8,
        content: [
          "A function is a named, reusable block of code. You define it once with `def` and call it as many times as you like. This is how you stop repeating yourself.",
          "Everything indented under the `def` line is the function body. Nothing runs until you actually call the function by its name followed by `()`.",
        ],
        code: 'def greet():\n    print("Welcome to EHCC!")\n\ngreet()   # Welcome to EHCC!\ngreet()   # Welcome to EHCC!',
        video: {
          title: "Python Functions",
          channel: "Corey Schafer",
          url: "https://www.youtube.com/watch?v=9Os0o3wzS_I",
        },
      },
      {
        id: "parameters-and-return",
        title: "Parameters & Return Values",
        summary: "Pass data in, get a result back out.",
        minutes: 9,
        content: [
          "Parameters let a function take input. You list them in the parentheses, and pass matching arguments when you call it.",
          "`return` hands a value back to whoever called the function. A function that prints shows you something; a function that returns gives you something you can keep using.",
        ],
        code: 'def add(a, b):\n    return a + b\n\ntotal = add(3, 4)\nprint(total)          # 7\nprint(add(10, 5))     # 15',
        video: {
          title: "Python Full Course — Functions section",
          channel: "freeCodeCamp",
          url: "https://www.youtube.com/watch?v=rfscVS0vtbw",
        },
      },
      {
        id: "modules-and-reuse",
        title: "Modules & Reuse",
        summary: "Borrow code other people already wrote.",
        minutes: 7,
        content: [
          "A module is a file of Python code you can pull into your own program with `import`. The standard library ships with hundreds of them, so you rarely start from scratch.",
          "Reaching for an existing, well-tested module beats writing your own version — less code, fewer bugs.",
        ],
        code: 'import random\n\nbranches = ["Hackathon", "Data Science", "AI Principles"]\nprint(random.choice(branches))   # a random branch',
        video: {
          title: "Python Modules & the Standard Library",
          channel: "Corey Schafer",
          url: "https://www.youtube.com/watch?v=CqvZ3vGoGs0",
        },
      },
    ],
  },
  {
    num: 6,
    id: "web-foundations",
    title: "Web Foundations",
    summary: "HTML, CSS, and JavaScript — build and deploy your first page.",
    difficulty: "Intermediate",
    lessons: [
      {
        id: "html-structure",
        title: "HTML — Structure",
        summary: "The skeleton of every web page.",
        minutes: 8,
        content: [
          "HTML describes the structure and content of a page using tags. A tag like `<h1>` wraps content and gives it meaning — a heading, a paragraph, a link, an image.",
          "Most tags come in pairs: an opening `<p>` and a closing `</p>`. The browser reads your HTML top to bottom and draws the page from it.",
        ],
        code: "<h1>EHCC</h1>\n<p>Think. Build. Elevate.</p>\n<a href=\"/join\">Join the club</a>",
        video: {
          title: "HTML & CSS — Full Course for Beginners",
          channel: "freeCodeCamp",
          url: "https://www.youtube.com/watch?v=mU6anWqZJcc",
        },
      },
      {
        id: "css-style",
        title: "CSS — Style",
        summary: "Make it look the way you want.",
        minutes: 9,
        content: [
          "CSS controls how HTML looks — colors, spacing, fonts, layout. You select elements and set properties on them.",
          "The best reference on Earth for any HTML or CSS feature is MDN. Keep it open in a tab; nobody memorizes all of this.",
        ],
        code: "h1 {\n  color: #22c55e;\n  font-family: sans-serif;\n}",
        video: {
          title: "MDN Web Docs — HTML & CSS reference",
          channel: "Mozilla (free)",
          url: "https://developer.mozilla.org/en-US/docs/Learn",
        },
      },
      {
        id: "javascript-behavior",
        title: "JavaScript — Behavior",
        summary: "Make the page do things.",
        minutes: 10,
        content: [
          "JavaScript adds behavior — responding to clicks, changing content, fetching data. It's the language that runs in every browser.",
          "You already know the ideas from Python: variables, conditions, loops, functions. The syntax differs, but the thinking transfers directly.",
        ],
        code: 'const btn = document.querySelector("button");\nbtn.addEventListener("click", () => {\n  alert("Welcome to EHCC!");\n});',
        video: {
          title: "JavaScript Programming — Full Course",
          channel: "freeCodeCamp",
          url: "https://www.youtube.com/watch?v=jS4aFq5-91M",
        },
      },
      {
        id: "deploy-your-page",
        title: "Deploy Your First Page",
        summary: "Put it on the internet for free.",
        minutes: 6,
        content: [
          "A site isn't real until someone else can open it. Free hosts like GitHub Pages, Netlify, and Vercel take your files and give you a public URL in minutes.",
          "Ship early, ship ugly, then improve. A live link you can share beats a perfect page nobody sees.",
        ],
        video: {
          title: "The Odin Project — free full-stack curriculum",
          channel: "The Odin Project",
          url: "https://www.theodinproject.com/",
        },
      },
    ],
  },
  {
    num: 7,
    id: "building-with-ai",
    title: "Building with AI",
    summary: "Prompt engineering, using AI to build, and judging what it gives you.",
    difficulty: "Intermediate",
    lessons: [
      {
        id: "how-ai-models-work",
        title: "How AI Models Work",
        summary: "A useful mental model of what's under the hood.",
        minutes: 9,
        content: [
          "Modern AI models are trained on huge amounts of text and learn to predict what comes next. That simple mechanism, at scale, produces the ability to write, summarize, and reason through problems.",
          "They don't 'know' facts the way a database does — they generate likely responses. Understanding that is the difference between using AI well and getting burned by it.",
        ],
        video: {
          title: "Neural Networks — visual intuition",
          channel: "3Blue1Brown",
          url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi",
        },
      },
      {
        id: "prompt-engineering",
        title: "Prompt Engineering Basics",
        summary: "Ask well, get better results.",
        minutes: 9,
        content: [
          "A prompt is your instruction to the model. Vague prompts get vague answers. The fixes are simple: give context, state the goal, show an example of the format you want, and ask it to work step by step.",
          "Treat prompting like debugging — if the output is off, change one thing and try again. Iteration beats the 'perfect prompt.'",
        ],
        code: '# Weak:  "write about our club"\n# Strong: "Write a 2-sentence Instagram caption for EHCC,\n#          a high-school coding club. Upbeat, no hashtags."',
        video: {
          title: "Intro to Large Language Models",
          channel: "Andrej Karpathy",
          url: "https://www.youtube.com/watch?v=zjkBMFhNj_g",
        },
      },
      {
        id: "building-with-ai-tools",
        title: "Building With AI",
        summary: "Use AI to actually ship something.",
        minutes: 10,
        content: [
          "AI is a force multiplier for builders: scaffold a website, explain an error, draft a function, or turn an idea into a first prototype fast.",
          "But you own the result. Read what it gives you, test it, and make sure you understand the code — the AI Principles branch is about using these tools on a real foundation, not blindly.",
        ],
        video: {
          title: "Anthropic — Prompt Engineering Guide",
          channel: "Anthropic Docs",
          url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        },
      },
      {
        id: "evaluating-ai-output",
        title: "Evaluating AI Output",
        summary: "Know what AI can and can't be trusted with.",
        minutes: 8,
        content: [
          "Models can sound confident and still be wrong — that's called hallucination. For anything that matters, verify claims against a real source and test code before you trust it.",
          "The critical-thinking skill is knowing where AI shines (drafts, explanations, boilerplate) and where you must check (facts, math, security, anything you'll ship).",
        ],
        video: {
          title: "CS50 — Artificial Intelligence with Python",
          channel: "Harvard (free)",
          url: "https://cs50.harvard.edu/ai/",
        },
      },
    ],
  },
  {
    num: 8,
    id: "git-and-github",
    title: "Version Control with Git",
    summary: "Commits, branches, and pull requests — how teams ship together.",
    difficulty: "Beginner",
    lessons: [
      {
        id: "commits-and-history",
        title: "Commits & History",
        summary: "Save checkpoints you can always return to.",
        minutes: 8,
        content: [
          "Git tracks every change to your files. A commit is a saved snapshot with a message describing what changed — like a save point you can rewind to.",
          "The habit: make a small change, commit it with a clear message, repeat. Your history becomes a story of how the project grew.",
        ],
        code: 'git add .\ngit commit -m "Add join form"\ngit log --oneline',
        video: {
          title: "Git & GitHub for Beginners — Crash Course",
          channel: "freeCodeCamp",
          url: "https://www.youtube.com/watch?v=RGOj5yH7evk",
        },
      },
      {
        id: "branches",
        title: "Branches",
        summary: "Experiment without breaking what works.",
        minutes: 8,
        content: [
          "A branch is a parallel copy of your project. You try something new on a branch, and `main` stays safe. If it works, you merge it back; if not, you throw the branch away.",
          "This is what lets a whole team work on the same project at once without stepping on each other.",
        ],
        code: 'git checkout -b new-feature\n# ...make changes and commit...\ngit checkout main\ngit merge new-feature',
        video: {
          title: "Git Branching & Merging",
          channel: "The Net Ninja",
          url: "https://www.youtube.com/watch?v=e2IbNHi4uCI",
        },
      },
      {
        id: "pull-requests",
        title: "Pull Requests & Collaboration",
        summary: "Propose changes and review each other's work.",
        minutes: 8,
        content: [
          "On GitHub, a pull request (PR) proposes merging your branch into the main project. Teammates review it, comment, and approve — it's how real teams keep quality high.",
          "For EHCC projects, this is the workflow: branch, commit, open a PR, get a review, merge. Learn it once and it's yours for every project after.",
        ],
        video: {
          title: "GitHub Docs — About Pull Requests",
          channel: "GitHub Docs",
          url: "https://docs.github.com/en/pull-requests",
        },
      },
    ],
  },
];

// ---- Derived helpers (single source of truth for counts + lookups) ----
export const ALL_LESSONS: (Lesson & { unitNum: number; unitTitle: string })[] = UNITS.flatMap(
  (u) => u.lessons.map((l) => ({ ...l, unitNum: u.num, unitTitle: u.title }))
);

export const LESSON_COUNT = ALL_LESSONS.length;

export function getLesson(id: string) {
  const idx = ALL_LESSONS.findIndex((l) => l.id === id);
  if (idx === -1) return null;
  return {
    lesson: ALL_LESSONS[idx],
    prev: idx > 0 ? ALL_LESSONS[idx - 1] : null,
    next: idx < ALL_LESSONS.length - 1 ? ALL_LESSONS[idx + 1] : null,
  };
}
