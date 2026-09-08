/* ==========================================================================
   WDD 231 - course.js
   Renders the Web and Computer Programming certificate courses, supports
   All / WDD / CSE filtering, and shows a live credit total via reduce().
   ========================================================================== */

// --- Course data (from the assignment's Course List Array) ---------------
// completed: set to true for courses you have personally finished.
const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming.",
    technology: ["HTML", "CSS"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call, debug, and test their own functions; and to handle errors within functions.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.",
    technology: ["C#"],
    completed: false,
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 231,
    title: "Frontend Web Development I",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience in Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: false,
  },
];

// --- DOM references -----------------------------------------------------
const cardsContainer = document.getElementById("course-cards");
const creditCount = document.getElementById("credit-count");
const courseCount = document.getElementById("course-count");
const filterButtons = document.querySelectorAll(".filter-btn");

// --- Rendering --------------------------------------------------------------
function courseCard(course) {
  const li = document.createElement("li");
  li.className = "course-card" + (course.completed ? " done" : "");

  const code = `${course.subject} ${course.number}`;
  li.setAttribute(
    "aria-label",
    `${code}, ${course.title}, ${course.credits} credits, ${
      course.completed ? "completed" : "not completed"
    }`
  );

  li.innerHTML = `
    <span class="code">${code}</span>
    <span class="title">${course.title}</span>
    <span class="credits">${course.credits} credit${course.credits === 1 ? "" : "s"}</span>
    ${course.completed ? '<span class="status">&#10003; Completed</span>' : ""}
  `;
  return li;
}

function displayCourses(list) {
  cardsContainer.innerHTML = "";
  list.forEach((course) => cardsContainer.appendChild(courseCard(course)));

  // Total credits for the courses currently shown, via reduce().
  const totalCredits = list.reduce((sum, course) => sum + course.credits, 0);
  courseCount.textContent = list.length;
  creditCount.textContent = totalCredits;
}

// --- Filtering ------------------------------------------------------------
function filterCourses(filter) {
  if (filter === "all") return courses;
  return courses.filter((course) => course.subject.toLowerCase() === filter);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
      btn.setAttribute("aria-pressed", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");

    displayCourses(filterCourses(button.dataset.filter));
  });
});

// --- Initial render -----------------------------------------------------
displayCourses(courses);
