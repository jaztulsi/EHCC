// Content for the courses and games apps. Homepage copy lives in /content/site.ts.
import type { DebugChallenge, TriviaQuestion } from "./types";

export { CLUB } from "@/content/site";

export const NAV_LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#events", label: "Events" },
  { href: "/courses", label: "Courses" },
  { href: "/games", label: "Games" },
  { href: "/#crew", label: "Team" },
] as const;

export const TRIVIA: TriviaQuestion[] = [
  { question: "Who is widely regarded as the first computer programmer?", options: ["Ada Lovelace", "Alan Turing", "Grace Hopper", "Charles Babbage"], answer: 0, category: "History" },
  { question: "What does 'HTTP' stand for?", options: ["HyperText Transfer Protocol", "High Transfer Text Process", "HyperText Transmission Path", "Host Transfer Type Protocol"], answer: 0, category: "Web" },
  { question: "Which data structure uses LIFO (Last In, First Out) ordering?", options: ["Queue", "Stack", "Tree", "Graph"], answer: 1, category: "Concepts" },
  { question: "What is the time complexity of binary search?", options: ["O(n)", "O(n²)", "O(log n)", "O(1)"], answer: 2, category: "Algorithms" },
  { question: "Grace Hopper is credited with popularizing which term after a moth was found in a computer?", options: ["Glitch", "Crash", "Bug", "Patch"], answer: 2, category: "History" },
  { question: "Which language is primarily used for styling web pages?", options: ["HTML", "CSS", "SQL", "JSON"], answer: 1, category: "Web" },
  { question: "What does 'CPU' stand for?", options: ["Central Process Unit", "Computer Personal Unit", "Central Processing Unit", "Core Processing Utility"], answer: 2, category: "Hardware" },
  { question: "In binary, what is the decimal number 8?", options: ["1000", "1100", "0110", "1010"], answer: 0, category: "Concepts" },
  { question: "Who co-founded Apple alongside Steve Jobs?", options: ["Bill Gates", "Steve Wozniak", "Paul Allen", "Jack Dorsey"], answer: 1, category: "History" },
  { question: "Which sorting algorithm has a worst-case time of O(n²) but is simple to implement?", options: ["Merge Sort", "Quick Sort", "Bubble Sort", "Heap Sort"], answer: 2, category: "Algorithms" },
  { question: "What does 'RAM' stand for?", options: ["Random Access Memory", "Rapid Access Module", "Read Access Memory", "Runtime Allocated Memory"], answer: 0, category: "Hardware" },
  { question: "Which company developed the Python programming language's reference implementation?", options: ["Sun Microsystems", "Microsoft", "The Python Software Foundation", "Google"], answer: 2, category: "History" },
];

export const DEBUG_CHALLENGES: DebugChallenge[] = [
  {
    language: "python",
    prompt: "This function should return the sum of a list, but it's wrong. What's the bug?",
    code: "def total(nums):\n    s = 0\n    for n in nums:\n        s = n\n    return s",
    options: ["`s = n` should be `s += n`", "`return s` should be inside the loop", "`s = 0` should be `s = 1`", "Nothing is wrong"],
    answer: 0,
    explanation: "`s = n` overwrites the sum each iteration. It should accumulate with `s += n`.",
  },
  {
    language: "javascript",
    prompt: "This loop is supposed to print 0 through 4, but it prints 0 through 5. Fix it.",
    code: "for (let i = 0; i <= 5; i++) {\n  console.log(i);\n}",
    options: ["Change `<= 5` to `< 5`", "Change `i++` to `i--`", "Change `let i = 0` to `let i = 1`", "Change `console.log` to `print`"],
    answer: 0,
    explanation: "`<= 5` includes 5. Use `< 5` to stop at 4.",
  },
  {
    language: "python",
    prompt: "This should check if a number is even, but it always returns False. Why?",
    code: "def is_even(n):\n    if n % 2 == 1:\n        return True\n    return False",
    options: ["Compare to `== 0`, not `== 1`", "Use `//` instead of `%`", "Swap the return values", "Add an else clause"],
    answer: 0,
    explanation: "Even numbers have remainder 0 when divided by 2, so check `n % 2 == 0`.",
  },
  {
    language: "javascript",
    prompt: "This function should return the largest of two numbers. Spot the bug.",
    code: "function max(a, b) {\n  if (a > b)\n    return a;\n    return b;\n}",
    options: ["Logic is fine, indentation just misleads, it actually works", "Missing `else`, so `return b` always runs", "`a > b` should be `a < b`", "Needs a third parameter"],
    answer: 0,
    explanation: "Tricky one: the indentation suggests a bug, but `return a` exits early, so this is correct. Indentation isn't logic in JS.",
  },
  {
    language: "python",
    prompt: "This list comprehension should give squares of 0-4. What's broken?",
    code: "squares = [x * 2 for x in range(5)]",
    options: ["`x * 2` should be `x ** 2`", "`range(5)` should be `range(4)`", "Use parentheses not brackets", "Nothing is wrong"],
    answer: 0,
    explanation: "`x * 2` doubles the value; squaring is `x ** 2` (or `x * x`).",
  },
  {
    language: "javascript",
    prompt: "Why does this comparison behave unexpectedly?",
    code: "if (5 == '5') {\n  console.log('equal');\n}",
    options: ["`==` coerces types; use `===` for strict equality", "Strings can't be compared to numbers", "Missing semicolon", "`console.log` is misspelled"],
    answer: 0,
    explanation: "`==` performs type coercion so `5 == '5'` is true. Use `===` to compare without coercion.",
  },
  {
    language: "python",
    prompt: "This should reverse a string, but it errors. Why?",
    code: "def reverse(s):\n    return s.reverse()",
    options: ["Strings have no `.reverse()`; use `s[::-1]`", "Need to import a module", "`return` is misspelled", "Add parentheses around `s`"],
    answer: 0,
    explanation: "`.reverse()` exists for lists, not strings. Use slicing: `s[::-1]`.",
  },
  {
    language: "javascript",
    prompt: "This should add a number to each array element, but it returns undefined. Fix it.",
    code: "const out = [1, 2, 3].map((x) => {\n  x + 10;\n});",
    options: ["Arrow body with `{}` needs an explicit `return`", "`map` should be `forEach`", "Array is empty", "`x + 10` should be `x = 10`"],
    answer: 0,
    explanation: "A block body `{}` doesn't implicitly return. Either add `return x + 10;` or drop the braces.",
  },
  {
    language: "python",
    prompt: "This counter dictionary never increments past 1. What's wrong?",
    code: "counts = {}\nfor c in 'aab':\n    counts[c] = 1",
    options: ["`= 1` should be `= counts.get(c, 0) + 1`", "`{}` should be `[]`", "`for c in` should be `for c of`", "Nothing is wrong"],
    answer: 0,
    explanation: "Assigning `1` resets the count. Use `counts.get(c, 0) + 1` to accumulate.",
  },
  {
    language: "javascript",
    prompt: "This async function returns a Promise instead of the value. Why?",
    code: "async function getData() {\n  const res = fetch('/api');\n  return res.json();\n}",
    options: ["Missing `await` before `fetch`", "`async` should be `await`", "`return` should be `yield`", "`fetch` needs quotes removed"],
    answer: 0,
    explanation: "`fetch` returns a Promise; without `await`, `res` isn't the resolved Response. Use `const res = await fetch('/api')`.",
  },
];
