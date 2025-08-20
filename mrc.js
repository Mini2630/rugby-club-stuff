// In-memory database simulation
let membersDB = [];

// Form validation and submission
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    // Collect form values
    const member = {
      fullName: form.querySelector("input[type='text']").value.trim(),
      surname: form.querySelectorAll("input[type='text']")[1].value.trim(),
      dob: form.querySelector("input[type='date']").value,
      id: form.querySelectorAll("input[type='text']")[2].value.trim(),
      gender: form.querySelector("select").value,
      ageGroup: form.querySelectorAll("select")[1].value,
      phone: form.querySelector("input[type='tel']").value.trim(),
      email: form.querySelector("input[type='email']").value.trim()
    };

    // Validation rules
    let errors = [];

    if (!member.fullName) errors.push("Full Name is required");
    if (!member.surname) errors.push("Surname is required");
    if (!member.dob) errors.push("Date of Birth is required");
    if (!member.phone.match(/^[0-9]{10,}$/)) errors.push("Valid phone number required");
    if (!member.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) errors.push("Valid email required");

    // Show errors or save
    const errorBox = document.getElementById("errors");
    errorBox.innerHTML = "";

    if (errors.length > 0) {
      errors.forEach(err => {
        const p = document.createElement("p");
        p.style.color = "red";
        p.textContent = err;
        errorBox.appendChild(p);
      });
      return;
    }

    // Save to in-memory DB
    membersDB.push(member);

    // Also save to localStorage to persist across refresh
    localStorage.setItem("membersDB", JSON.stringify(membersDB));

    // Confirmation message
    alert("✅ Registration Successful for " + member.fullName);

    // Reset form
    form.reset();
  });
});
