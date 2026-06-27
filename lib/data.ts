// All static placeholder content for the EHCC site lives here.
// Swap these out for real data as the club grows.

import type {
  ClubEvent,
  ConceptCard,
  DebugChallenge,
  GuestSpeaker,
  Milestone,
  Project,
  Resource,
  RoadmapPath,
  Stat,
  TeamMember,
  TriviaQuestion,
  Workshop,
  Branch,
} from "./types";

export const CLUB = {
  name: "Emerald Hacking & Coding Club",
  shortName: "EHCC",
  school: "Emerald High School",
  city: "Dublin, CA",
  tagline: "// Think. // Build. // Elevate.",
  founded: "2025",
  instagram: "@ehshackingclub",
  instagramUrl: "https://instagram.com/ehshackingclub",
  email: "ehshackingclub@gmail.com",
  description:
    "A collaborative, inclusive community at Emerald High School for students interested in coding, technology, and problem-solving — across our Hackathon, Data Science, and USACO/Programming branches.",
  // Meeting logistics
  meetingDays: "Wednesday & Thursday",
  meetingTime: "Access Period",
  meetingRoom: "Room F-105",
  officerMeeting: "Every 2 weeks",
  // Official membership form
  joinFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSc1HTRK_PhyTGlxi3rezmIASqHxIMhwEeExGZnbjxBWo71oOA/viewform",
};

export const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/learn", label: "Learn" },
  { href: "/team", label: "Team" },
] as const;

export const STATS: Stat[] = [
  { label: "Specialized Branches", value: 3, icon: "Code2" },
  { label: "Student Founders", value: 5, icon: "Users" },
  { label: "Meetings / Week", value: 2, icon: "GraduationCap" },
  { label: "Free to Join", value: 100, suffix: "%", icon: "Trophy" },
];

export const WHAT_WE_DO = [
  {
    icon: "Code2",
    title: "Hackathon Branch",
    blurb: "Build for the community.",
    detail: "Create impactful solutions through technology, building real projects that address problems in our school and the Tri-Valley community.",
  },
  {
    icon: "BrainCircuit",
    title: "Data Science Branch",
    blurb: "Learn from data.",
    detail: "Explore machine learning algorithms and data analysis through monthly challenges, guest speakers, and real-world applications.",
  },
  {
    icon: "Trophy",
    title: "USACO / Programming Branch",
    blurb: "Compete and conquer.",
    detail: "Prepare for coding competitions like USACO, mastering algorithms and efficient problem-solving in a collaborative academic environment.",
  },
  {
    icon: "Users",
    title: "Weekly Meetings",
    blurb: "Find your people.",
    detail: "All three branches come together every Wednesday and Thursday during Access Period in Room F-105 to learn, build, and collaborate.",
  },
  {
    icon: "Mic",
    title: "Guest Speakers",
    blurb: "Hear from the pros.",
    detail: "Industry professionals share insights on careers in tech, data science applications, and real-world programming experiences.",
  },
  {
    icon: "Medal",
    title: "Competitions & Challenges",
    blurb: "Put skills to the test.",
    detail: "Hackathons, USACO competitions, and monthly data science challenges — friendly competition that pushes everyone forward.",
  },
];

export const BRANCHES: Branch[] = [
  { id: "hackathon", name: "Hackathon Branch", description: "Create impactful community solutions through technology, building real projects that address problems in our school and the Tri-Valley community.", icon: "Code2" },
  { id: "datascience", name: "Data Science Branch", description: "Explore machine learning algorithms and data analysis through monthly challenges, guest speakers, and real-world applications.", icon: "BarChart3" },
  { id: "usaco", name: "USACO / Programming Branch", description: "Prepare for coding competitions like USACO, mastering algorithms and efficient problem-solving techniques in a collaborative academic environment.", icon: "Trophy" },
];

export const LEADERSHIP: TeamMember[] = [
  { id: "jasraj", name: "Jasraj Tulsi", role: "Co-Founder", grade: "Leadership", bio: "Passionate about creating inclusive tech communities and fostering innovation.", interests: ["Leadership", "Hackathons", "Full-Stack"], isLeadership: true },
  { id: "shivani", name: "Shivani Venkata", role: "Co-Founder", grade: "Data Science", bio: "Dedicated to exploring real-world applications of data analysis and machine learning.", interests: ["Data Science", "ML", "Python"], isLeadership: true },
  { id: "alexander", name: "Alexander Xu", role: "Co-Founder", grade: "USACO / Programming", bio: "Focused on competitive programming and algorithm optimization.", interests: ["USACO", "Algorithms", "C++"], isLeadership: true },
  { id: "dhruv", name: "Dhruv Kothari", role: "Co-Founder", grade: "Hackathon", bio: "Committed to building impactful community solutions through technology.", interests: ["Hackathons", "Web Dev", "React"], isLeadership: true },
  { id: "shaurya", name: "Shaurya Nigam", role: "Co-Founder", grade: "Operations", bio: "Ensuring smooth club operations and member engagement.", interests: ["Operations", "Events", "Outreach"], isLeadership: true },
];

// The club is organized by an elected officer board plus per-branch leadership.
export const OFFICER_BOARD = [
  { position: "Presidents", count: 3, description: "Oversee all branches, lead meetings, coordinate with ASB, and ensure club goals are met." },
  { position: "Vice President", count: 1, description: "Assists the Presidents and coordinates between the three branches." },
  { position: "Secretary", count: 1, description: "Keeps records of meetings, membership, and communications." },
  { position: "Treasurer", count: 1, description: "Manages funds, prepares budgets, and coordinates fundraising efforts." },
];

export const BRANCH_LEADERSHIP = [
  { branch: "Hackathon Branch", positions: ["President", "Vice President"], description: "Lead hackathon initiatives and community impact projects." },
  { branch: "USACO / Programming Branch", positions: ["President", "Vice President"], description: "Guide competitive programming and algorithm training." },
  { branch: "Data Science Branch", positions: ["President", "Vice President"], description: "Oversee data science education and machine learning projects." },
];

export const ELECTIONS = {
  when: "Annually in May",
  eligibility: "Active members for 1+ semester",
  requirements: "Good academic standing",
};

export const ACHIEVEMENTS: Milestone[] = [
  { date: "2025", title: "EHCC Founded", description: "Five Emerald High students launch the club with a mission: build real things, together." },
  { date: "2025", title: "Three Branches Launched", description: "Hackathon, Data Science, and USACO/Programming branches open their doors to all skill levels." },
  { date: "2025", title: "Weekly Meetings Begin", description: "The club starts meeting every Wednesday and Thursday during Access Period in Room F-105." },
  { date: "Ongoing", title: "Guest Speaker Series", description: "Industry professionals join us monthly to talk careers in tech and data science." },
  { date: "Each May", title: "Officer Elections", description: "Members in good standing run for board and branch-leadership positions." },
];

export const EVENTS: ClubEvent[] = [
  { id: "e1", title: "Weekly General Meeting", type: "Social", date: "2026-09-02", time: "Wednesday & Thursday · Access Period", location: "Room F-105", description: "Our weekly meeting where all three branches come together to share updates, learn new skills, and work on collaborative projects.", upcoming: true, featured: true },
  { id: "e2", title: "USACO Practice Session", type: "Workshop", date: "2026-09-03", time: "Weekly · Access Period", location: "Room F-105", description: "Focused practice for competitive programming — working through USACO problems and algorithm optimization together.", upcoming: true },
  { id: "e3", title: "Data Science Challenge", type: "Competition", date: "2026-09-18", time: "Monthly", location: "Room F-105", description: "Monthly challenges where students define a problem, collect data, and apply machine learning to build predictive models.", upcoming: true },
  { id: "e4", title: "Guest Speaker Series", type: "Guest Speaker", date: "2026-09-25", time: "Monthly", location: "Room F-105", description: "Industry professionals share insights about careers in tech, data science applications, and real-world programming.", upcoming: true },
  { id: "e5", title: "Hackathon Prep Workshop", type: "Workshop", date: "2026-10-09", time: "Quarterly · After School", location: "Room F-105", description: "Intensive workshops to prep for upcoming hackathons — rapid prototyping, teamwork, and project presentation skills.", upcoming: true },
];

export const SPEAKERS: GuestSpeaker[] = [
  { id: "s1", name: "To Be Announced", role: "Industry Professional", company: "Monthly Series", topic: "Careers in Software Engineering", date: "2026-09-25" },
  { id: "s2", name: "To Be Announced", role: "Industry Professional", company: "Monthly Series", topic: "Real-World Data Science & Machine Learning", date: "2026-10-23" },
  { id: "s3", name: "To Be Announced", role: "Industry Professional", company: "Monthly Series", topic: "Competitive Programming & Problem Solving", date: "2026-11-20" },
];

export const PROJECTS: Project[] = [
  { id: "p1", name: "StudySync", description: "A Data Science branch concept: an AI-powered study planner that builds personalized revision schedules from your syllabus and spaced-repetition data.", category: "AI/ML", members: ["Data Science Branch"], tech: ["Next.js", "OpenAI API", "Postgres", "TypeScript"], featured: true },
  { id: "p2", name: "HallPass", description: "A Hackathon branch idea: a digital hall-pass system for EHS with QR check-in, live dashboards, and abuse detection.", category: "Web Dev", members: ["Hackathon Branch"], tech: ["React", "Firebase", "Tailwind"], featured: true },
  { id: "p3", name: "PhishNet", description: "A browser extension concept that flags phishing emails and suspicious links using a lightweight on-device classifier.", category: "Cybersecurity", members: ["Hackathon Branch"], tech: ["JavaScript", "TensorFlow.js", "Chrome API"], featured: true },
  { id: "p4", name: "CafeteriaIQ", description: "A Data Science project idea: a dashboard predicting lunch-line wait times from historical foot-traffic data.", category: "Data Science", members: ["Data Science Branch"], tech: ["Python", "pandas", "Plotly", "scikit-learn"] },
  { id: "p5", name: "DragonBot", description: "A club Discord bot concept: event reminders, code-snippet sharing, and a built-in trivia game.", category: "Other", members: ["Hackathon Branch"], tech: ["Python", "discord.py", "SQLite"] },
  { id: "p6", name: "VisionLabel", description: "An AI/ML idea: a real-time object detection web app for science-fair projects, running entirely in the browser.", category: "AI/ML", members: ["Data Science Branch"], tech: ["TensorFlow.js", "React", "WebRTC"] },
  { id: "p7", name: "Algorithm Visualizer", description: "A USACO/Programming branch project: an interactive tool that animates sorting and graph algorithms to make practice click.", category: "Web Dev", members: ["USACO / Programming Branch"], tech: ["React", "TypeScript", "Canvas"] },
];

export const WORKSHOPS: Workshop[] = [
  { id: "w1", title: "Python Fundamentals", difficulty: "Beginner", sessions: 5, description: "From variables to functions to your first real program. The on-ramp to everything else.", topics: ["Variables & types", "Control flow", "Functions", "Lists & dicts", "Mini-project"], icon: "FileCode2" },
  { id: "w2", title: "Web Development", difficulty: "Beginner", sessions: 6, description: "Build and deploy your own website with modern HTML, CSS, and JavaScript.", topics: ["HTML & CSS", "Responsive design", "JavaScript basics", "DOM", "APIs", "Deploy"], icon: "Globe" },
  { id: "w3", title: "AI / Machine Learning", difficulty: "Intermediate", sessions: 6, description: "The intuition and the code behind models that learn from data.", topics: ["What is ML?", "Regression", "Classification", "Training & loss", "Overfitting", "Project"], icon: "BrainCircuit" },
  { id: "w4", title: "Cybersecurity", difficulty: "Intermediate", sessions: 4, description: "Think like an attacker, defend like a pro. Hands-on CTF-style labs.", topics: ["Threat models", "Web exploits", "Cryptography basics", "CTF lab"], icon: "ShieldCheck" },
  { id: "w5", title: "Git & GitHub", difficulty: "Beginner", sessions: 2, description: "Version control and collaboration — the workflow every developer lives in.", topics: ["Commits & history", "Branches", "Pull requests", "Resolving conflicts"], icon: "GitBranch" },
  { id: "w6", title: "Neural Networks", difficulty: "Advanced", sessions: 4, description: "Build a neural net from scratch, then with PyTorch. Math included.", topics: ["Perceptrons", "Backprop", "Activation functions", "Building with PyTorch"], icon: "Network" },
  { id: "w7", title: "Data Science", difficulty: "Intermediate", sessions: 5, description: "Turn raw data into insight with Python's data stack.", topics: ["pandas", "Cleaning data", "Visualization", "Statistics", "Telling a story"], icon: "BarChart3" },
];

export const RESOURCES: Resource[] = [
  { id: "r1", title: "freeCodeCamp", category: "Tutorial", topic: "Web Dev", url: "https://www.freecodecamp.org", description: "Free, project-based curriculum covering the full web stack." },
  { id: "r2", title: "Python Official Docs", category: "Docs", topic: "Python", url: "https://docs.python.org/3/", description: "The authoritative reference for the Python language and standard library." },
  { id: "r3", title: "3Blue1Brown — Neural Networks", category: "Video", topic: "AI/ML", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi", description: "The best visual intuition for how neural networks learn." },
  { id: "r4", title: "MDN Web Docs", category: "Docs", topic: "Web Dev", url: "https://developer.mozilla.org", description: "The definitive reference for HTML, CSS, and JavaScript." },
  { id: "r5", title: "PicoCTF", category: "Tool", topic: "Cybersecurity", url: "https://picoctf.org", description: "Beginner-friendly capture-the-flag challenges from Carnegie Mellon." },
  { id: "r6", title: "Kaggle Learn", category: "Tutorial", topic: "Data Science", url: "https://www.kaggle.com/learn", description: "Short, hands-on courses on data science and machine learning." },
  { id: "r7", title: "The Missing Semester (MIT)", category: "Video", topic: "Tools", url: "https://missing.csail.mit.edu", description: "The command line, git, and developer tools they don't teach in class." },
  { id: "r8", title: "React Docs", category: "Docs", topic: "Web Dev", url: "https://react.dev", description: "The official, modern React documentation with interactive examples." },
  { id: "r9", title: "CS50 (Harvard)", category: "Video", topic: "Python", url: "https://cs50.harvard.edu/x/", description: "Harvard's legendary intro to computer science — free and online." },
  { id: "r10", title: "PyTorch Tutorials", category: "Tutorial", topic: "AI/ML", url: "https://pytorch.org/tutorials/", description: "Official tutorials for building and training neural networks." },
  { id: "r11", title: "OverTheWire", category: "Tool", topic: "Cybersecurity", url: "https://overthewire.org/wargames/", description: "Wargames that teach security concepts through play." },
  { id: "r12", title: "Excalidraw", category: "Tool", topic: "Tools", url: "https://excalidraw.com", description: "Whiteboard tool perfect for sketching system designs and ideas." },
];

export const CONCEPTS: ConceptCard[] = [
  { id: "c1", term: "What is an API?", short: "A contract between programs.", detail: "An Application Programming Interface lets one program request data or actions from another using a defined set of rules — like a waiter taking your order to the kitchen and bringing food back." },
  { id: "c2", term: "What is Machine Learning?", short: "Programs that learn from data.", detail: "Instead of hand-coding every rule, ML systems find patterns in examples and use them to make predictions on new, unseen data." },
  { id: "c3", term: "What is a Neural Network?", short: "Layers of math that learn.", detail: "A model loosely inspired by the brain: layers of connected 'neurons' adjust their weights during training to map inputs to outputs." },
  { id: "c4", term: "What is Git?", short: "Time travel for your code.", detail: "Git is a version-control system that tracks every change to your files, lets you branch off to experiment, and merge work back together with teammates." },
  { id: "c5", term: "What is the Cloud?", short: "Someone else's computer.", detail: "Cloud computing means renting servers, storage, and services over the internet instead of owning the hardware yourself." },
  { id: "c6", term: "What is an Algorithm?", short: "A recipe for solving problems.", detail: "An algorithm is a finite, step-by-step procedure for transforming input into a desired output — the core of all computer science." },
  { id: "c7", term: "What is Big-O Notation?", short: "How code scales.", detail: "Big-O describes how an algorithm's time or memory grows as the input gets larger, ignoring constants — e.g. O(n) is linear, O(n²) is quadratic." },
  { id: "c8", term: "What is a Database?", short: "Organized, queryable storage.", detail: "A database stores structured data so it can be efficiently saved, searched, updated, and related — SQL databases use tables; NoSQL uses flexible documents." },
  { id: "c9", term: "What is Encryption?", short: "Scrambling secrets safely.", detail: "Encryption transforms readable data into ciphertext using a key, so only someone with the right key can read it — the backbone of online security." },
  { id: "c10", term: "What is a Compiler?", short: "Human code → machine code.", detail: "A compiler translates source code you write into the low-level instructions a computer's processor can actually execute." },
  { id: "c11", term: "What is Recursion?", short: "A function that calls itself.", detail: "Recursion solves a problem by breaking it into smaller versions of the same problem, with a base case to stop — elegant for trees and divide-and-conquer." },
  { id: "c12", term: "What is Open Source?", short: "Code anyone can use & improve.", detail: "Open-source software is published with a license that lets anyone view, modify, and share it — the foundation of most modern technology." },
];

export const ROADMAPS: RoadmapPath[] = [
  {
    id: "aiml",
    title: "Get into AI / ML",
    goal: "From zero to training your own models.",
    color: "#22c55e",
    steps: [
      { label: "Learn Python", detail: "Master the basics — variables, loops, functions, and data structures." },
      { label: "Math Foundations", detail: "Linear algebra, probability, and a little calculus go a long way." },
      { label: "Data with pandas", detail: "Learn to load, clean, and explore real datasets." },
      { label: "Classic ML", detail: "Regression, classification, and the scikit-learn workflow." },
      { label: "Neural Networks", detail: "Build nets from scratch, then with PyTorch." },
      { label: "Ship a Project", detail: "Train a model on something you care about and deploy it." },
    ],
  },
  {
    id: "webdev",
    title: "Get into Web Dev",
    goal: "From your first webpage to full-stack apps.",
    color: "#4ade80",
    steps: [
      { label: "HTML & CSS", detail: "Structure and style — the bones and skin of every site." },
      { label: "JavaScript", detail: "Add interactivity and logic to the browser." },
      { label: "Git & GitHub", detail: "Version your work and collaborate like a pro." },
      { label: "React", detail: "Build component-based, dynamic interfaces." },
      { label: "Backend & APIs", detail: "Servers, databases, and connecting it all together." },
      { label: "Deploy", detail: "Ship your app to the world with Vercel or Netlify." },
    ],
  },
  {
    id: "cyber",
    title: "Get into Cybersecurity",
    goal: "From curious to capture-the-flag competitor.",
    color: "#16a34a",
    steps: [
      { label: "Networking Basics", detail: "How data moves: IP, ports, HTTP, and DNS." },
      { label: "Linux & CLI", detail: "Live in the terminal — the security pro's home turf." },
      { label: "Web Exploits", detail: "Understand XSS, SQL injection, and how to defend against them." },
      { label: "Cryptography", detail: "Hashing, encryption, and why they matter." },
      { label: "CTF Practice", detail: "Sharpen skills on PicoCTF and OverTheWire." },
      { label: "Compete", detail: "Join a real CTF and put it all together." },
    ],
  },
];

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
    options: ["Logic is fine, indentation just misleads — it actually works", "Missing `else`, so `return b` always runs", "`a > b` should be `a < b`", "Needs a third parameter"],
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

export const FAQS = [
  { q: "Do I need coding experience to join?", a: "Not at all. All skill levels are welcome — we pair newcomers with experienced members, and curiosity is the only real requirement." },
  { q: "When and where does the club meet?", a: "We meet during Access Period every Wednesday and Thursday in Room F-105 at Emerald High School." },
  { q: "How much does it cost?", a: "Nothing. EHCC is free to join for all Emerald High students." },
  { q: "What are the three branches?", a: "Hackathon, Data Science, and USACO/Programming. You can focus on one branch or explore all three." },
  { q: "Who can join?", a: "Any Emerald High School student in good academic and behavioral standing who's willing to contribute positively to the club." },
  { q: "How do I join?", a: "Fill out our membership form, come to a meeting in Room F-105, pick your branch, and start building." },
];
