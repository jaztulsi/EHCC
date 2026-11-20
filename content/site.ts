// Every word on the homepage lives here. Edit this file, the site updates.
// Team photos: drop `<id>.jpg|png|webp` into /public/team and it appears automatically.

export const CLUB = {
  name: "Emerald Hacking & Innovation Club",
  shortName: "EHIC",
  school: "Emerald High School",
  city: "Dublin, CA",
  tagline: "We build. We break. We ship.",
  founded: "2025",
  instagram: "@ehcc",
  instagramUrl: "https://www.instagram.com/ehcc/",
  email: "ehs.hackingcoding.club@gmail.com",
  discordUrl: "", // add an invite link and the Discord button shows up
  github: "https://github.com/jaztulsi/EHCC",
  description:
    "A student-run club at Emerald High School for anyone who wants to build with code, data, and AI. Hackathons, workshops, guest speakers, and real projects.",
  meetingDays: "Every other Thursday",
  meetingTime: "Access Period",
  meetingRoom: "Mr. Voung's room, G-225",
  joinFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSc1HTRK_PhyTGlxi3rezmIASqHxIMhwEeExGZnbjxBWo71oOA/viewform",
};

// Countdown target: every other Thursday (day 4, JS numbering), counted in two-week steps from `from`.
// CONFIRM: `from` must be a real meeting Thursday, and the Access Period start time.
export const MEETING = { day: 4, from: "2026-11-19", hour: 10, minute: 0, lengthMin: 45 };

export const MARQUEE = ["AI / ML", "Web", "Hardware", "Cybersecurity", "Data Science", "Hackathons", "Guest Speakers", "Python"];

export const STORY = [
  {
    scene: "01",
    title: "Lights on.",
    body: "2025. A handful of Emerald students wanted one room where you could show up with an idea and leave with something that runs.",
    art: "bulb",
  },
  {
    scene: "02",
    title: "Three branches.",
    body: "Hackathon, Data Science, and AI Principles / Programming. Pick one, or wander between all three.",
    art: "branches",
  },
  {
    scene: "03",
    title: "Every other Thursday.",
    body: "Access Period, every other Thursday. Mr. Voung's room (G-225) fills up with laptops, snacks, and half-finished side projects.",
    art: "clock",
  },
  {
    scene: "04",
    title: "Then we shipped.",
    body: "Second place at the world's largest high school hackathon. Then we threw our own: DublinHacx.",
    art: "trophy",
  },
] as const;

export const WHAT_WE_DO = [
  { title: "Workshops", kicker: "Weekly", paper: "kraft", body: "Python, web, Git, prompt engineering. Short, hands-on sessions where you write the code, not just watch it." },
  { title: "Hackathons", kicker: "3–4 a year", paper: "graph", body: "Rotating teams, picked so new members get a seat. We prep together, then go build something in a day." },
  { title: "Project Teams", kicker: "3 branches", paper: "mint", body: "Hackathon, Data Science, and AI / Programming. Each branch runs its own builds with a student lead." },
  { title: "Guest Speakers", kicker: "Monthly", paper: "lined", body: "Engineers and data scientists come in to talk about real jobs, real code, and what they wish they'd learned earlier." },
  { title: "Competitions", kicker: "Ongoing", paper: "sun", body: "Monthly data challenges, AI build-offs, and outside contests. Friendly, loud, and very good for your GitHub." },
  { title: "Community Projects", kicker: "Tri-Valley", paper: "cream", body: "Tools for our school and the Tri-Valley, plus Alameda County Fair data projects from the Data Science branch." },
] as const;

// "Previously on EHIC". Newest first.
export const REEL = [
  {
    tag: "Our hackathon",
    when: "Season 1",
    title: "DublinHacx",
    logo: "/dublinhacx.png",
    body: "Our own hackathon. Students from across Dublin and the Tri-Valley formed teams, opened a blank repo, and had a working demo by the end of the day. First-timers got workshops, everyone got fed, and the judges saw projects that actually ran.",
    featured: true,
  },
  {
    tag: "Win",
    when: "2025",
    title: "2nd place, world's largest HS hackathon",
    body: "Our team took second out of thousands of student competitors. Still talking about it.",
  },
  {
    tag: "Data",
    when: "Summer",
    title: "Alameda County Fair projects",
    body: "The Data Science branch built and submitted fair projects: define a question, collect the data, train a model.",
  },
  {
    tag: "Talks",
    when: "Monthly",
    title: "Guest speaker series",
    body: "Industry folks on careers in software, data science in the real world, and building with AI.",
  },
  {
    tag: "Kickoff",
    when: "2025",
    title: "EHIC opens its doors",
    body: "First meeting in G-225. Three branches, six officers, and a whiteboard full of ideas.",
  },
] as const;

export const UP_NEXT = [
  { when: "Weekly", title: "AI Principles workshop" },
  { when: "Monthly", title: "Data Science challenge" },
  { when: "Quarterly", title: "Hackathon prep, after school" },
] as const;

export const PROJECTS = [
  { title: "EHIC Courses", tag: "Platform", body: "20 courses with lessons, quizzes, and certificates. Free for members.", href: "/courses", color: "mint" },
  { title: "Practice Arcade", tag: "Games", body: "Code Breaker, Binary Quiz, Debug the Code, and CS Trivia, right in the browser.", href: "/games", color: "sun" },
  { title: "DublinHacx", tag: "Event", body: "Branding, site, judging, and logistics for our own hackathon.", color: "coral" },
  { title: "This website", tag: "Web", body: "Next.js, three.js clay, and a motion engine locked to 12 frames a second.", href: "https://github.com/jaztulsi/EHCC", color: "paper" },
  { title: "Fair-ready models", tag: "Data", body: "Data Science branch projects headed to the Alameda County Fair.", color: "mint" },
  { title: "Runner-up build", tag: "Win", body: "The project that took 2nd at the world's largest high school hackathon.", color: "sun" },
  { title: "Your project", tag: "Open slot", body: "Pitch it at a meeting. We'll help you build it and ship it.", href: "#join", color: "paper" },
] as const;

export const STATS = [
  { value: 2, prefix: "#", label: "at the world's largest HS hackathon", trophy: "cup" },
  { value: 3, label: "branches to build in", trophy: "star" },
  { value: 20, label: "free courses on our platform", trophy: "cup" },
  { value: 7, label: "student officers", trophy: "medal" },
  { value: 45, label: "minutes, every other Thursday", trophy: "star" },
  { value: 1, label: "hackathon hosted (so far)", trophy: "medal" },
] as const;

export const CREW = [
  { id: "shaurya", name: "Shaurya Nigam", role: "President", sticker: "Events", bio: "Runs the board, keeps every team on schedule, makes the final call." },
  { id: "jasraj", name: "Jasraj Tulsi", role: "Vice President", sticker: "Events", bio: "Co-leads meetings and handles outside partners. Co-runs monthly events." },
  { id: "joseph", name: "Joseph", role: "Secretary", sticker: "Hackathons", bio: "Minutes, attendance, the shared drive, and the club inbox." },
  { id: "svanik", name: "Svanik Thakur", role: "Officer", sticker: "Hackathons", bio: "Helps run meetings and gets new members building on day one." },
  { id: "sanjana", name: "Sanjana", role: "Treasurer", sticker: "Finance", bio: "Budget, sponsors, school funding, and the all-important snack fund." },
  { id: "shivani", name: "Shivani Venkata", role: "Data Science Lead", sticker: "Tech", bio: "Runs the Data Science branch, workshops, and fair projects." },
  { id: "alex", name: "Alexander Xu", role: "AI / Programming Lead", sticker: "Tech", bio: "Runs the AI branch: practical AI, prompting, and the Python underneath." },
] as const;

export const ADVISOR = ""; // faculty advisor's name; shows a "Directed by" credit when set

export const FAQS = [
  { q: "Do I need coding experience?", a: "No. Plenty of members wrote their first line of code at a meeting. We pair new people with experienced ones." },
  { q: "When and where do you meet?", a: "Every other Thursday during Access Period, in Mr. Voung's room (G-225), Emerald High School." },
  { q: "How much does it cost?", a: "Nothing. EHIC is free for every Emerald High student." },
  { q: "What are the three branches?", a: "Hackathon, Data Science, and AI Principles / Programming. Stick with one or try all three." },
  { q: "Can I bring my own project?", a: "Please do. Pitch it at a meeting and we'll help you find teammates." },
  { q: "How do I join?", a: "Fill out the membership form, then show up to G-225. That's it." },
] as const;

export const INTERESTS = ["AI / ML", "Web", "Hardware", "Cybersecurity", "Data Science", "Hackathons"] as const;
