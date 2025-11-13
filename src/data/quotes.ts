export interface QuoteItem {
  text: string;
  author: string;
  role?: string;
}

export const inspirationalQuotes: QuoteItem[] = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    role: "Co-founder of Apple",
  },
  {
    text: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House",
    role: "Software Architect",
  },
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
    role: "Software Engineer",
  },
  {
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler",
    role: "Author & Software Developer",
  },
  {
    text: "The best error message is the one that never shows up.",
    author: "Thomas Fuchs",
    role: "Creator of script.aculo.us",
  },
  {
    text: "Simplicity is the soul of efficiency.",
    author: "Austin Freeman",
    role: "Writer",
  },
  {
    text: "Make it work, make it right, make it fast.",
    author: "Kent Beck",
    role: "Software Engineer",
  },
];

export const techQuotes: QuoteItem[] = [
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
    role: "Co-founder of Apple",
  },
  {
    text: "The advance of technology is based on making it fit in so that you don't really even notice it.",
    author: "Bill Gates",
    role: "Co-founder of Microsoft",
  },
  {
    text: "Technology is best when it brings people together.",
    author: "Matt Mullenweg",
    role: "Founder of WordPress",
  },
];
