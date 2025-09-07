// ===== Sidebar Toggle =====
const toggleBtn = document.getElementById("toggleBtn");
const sidebar = document.getElementById("sidebar");
const mainContent = document.getElementById("mainContent");

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("hide");
    mainContent.classList.toggle("full");
  });
}

// ===== Semester Registration Wizard =====
document.addEventListener("DOMContentLoaded", function () {
  const steps = ["step1", "step2", "step3", "step4"];
  let currentStep = 0;

  function showStep(stepId) {
    steps.forEach(id => {
      const step = document.getElementById(id);
      if (step) step.classList.add("d-none");
    });
    const current = document.getElementById(stepId);
    if (current) current.classList.remove("d-none");
  }

  // Next buttons
  document.querySelectorAll(".next-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (currentStep === 0) {
        // Validate Step 1 form
        const form = document.getElementById("step1Form");
        if (form && !form.checkValidity()) {
          form.classList.add("was-validated");
          return; // stop here if invalid
        }
      }

      if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(steps[currentStep]);
      }
    });
  });

  // Previous buttons
  document.querySelectorAll(".prev-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (currentStep > 0) {
        currentStep--;
        showStep(steps[currentStep]);
      }
    });
  });

  // Register button
  const registerBtn = document.getElementById("registerBtn");
  if (registerBtn) {
    registerBtn.addEventListener("click", () => {
      currentStep = 3; // step4 is index 3
      showStep("step4");
    });
  }

  // Show the first step by default
  showStep("step1");
});

// ===== Course Registration =====
document.addEventListener("DOMContentLoaded", function () {
  const addBtn = document.getElementById("addCoursesBtn");
  const courseForm = document.getElementById("availableCoursesForm");
  const table = document.getElementById("registeredCoursesTable");
  const creditTracker = document.getElementById("creditTracker");

  if (!addBtn || !courseForm || !table || !creditTracker) return; // Guard clause

  let totalCredits = 0;

  addBtn.addEventListener("click", () => {
    const selected = [...courseForm.querySelectorAll("input[name='course']:checked")];
    if (selected.length === 0) {
      alert("Please select at least one course.");
      return;
    }

    selected.forEach(courseInput => {
      const [code, title, units] = courseInput.value.split("|");

      // Add row to table
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${code}</td>
        <td>${title}</td>
        <td>${units}</td>
        <td><button class="btn btn-sm btn-danger drop-btn">Drop</button></td>
      `;
      table.appendChild(row);

      // Update credit units
      totalCredits += parseInt(units);
      creditTracker.textContent = totalCredits;

      // Uncheck the box
      courseInput.checked = false;

      // Drop button logic
      row.querySelector(".drop-btn").addEventListener("click", () => {
        totalCredits -= parseInt(units);
        creditTracker.textContent = totalCredits;
        row.remove();
        if (table.rows.length === 0) {
          table.innerHTML = `<tr><td colspan="4" class="text-center">No courses registered yet.</td></tr>`;
        } 
      });
    });
  });
});
