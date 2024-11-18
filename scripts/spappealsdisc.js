let isButtonDisabled1 = false;

// Function to toggle the visibility of the new popup
function togglePopup1() {
  const popup = document.getElementById("popup1");
  popup.style.display = popup.style.display === "none" ? "block" : "none";
}

// Modify your existing submitForm function to handle marketing form submission
async function submitMarketingForm1() {
  const applyButton = document.querySelector(".buttonapply");
  applyButton.disabled = true;
  applyButton.style.backgroundColor = "#ccc";
  applyButton.textContent = "Appeal Submitted"; // Change to the desired text

  // Close the popup
  togglePopup1();

  // Extract data from the popup form
  const name = document.getElementById("modalName1").value.trim().toLowerCase();
  const email = document.getElementById("modalEmail1").value;
  const availability = document.getElementById("availability1").value;
  const discordid = document.getElementById("discordid1").value;
  const reason1 = document.getElementById("reason1_1").value;
  const reason = document.getElementById("reason1").value;

  // Generate a 6-digit number
  const applicationCode = Math.floor(100000 + Math.random() * 900000);

  // Create a local timestamp
  const timestamp = new Date().toLocaleString();

  // Construct the embed object
  const marketingEmbed = {
    title: "Discord Ban Appeal",
    fields: [
      { name: "Name", value: name },
      { name: "Email", value: email },
      { name: "Why they should be unbanned", value: discordid },
      { name: "How can we trust them", value: availability },
      { name: "Why do you want to rejoin the server", value: reason },
    ],
    footer: {
      text: `Application Code: ${applicationCode} | Timestamp: ${timestamp}`,
    },
  };

  // Send the payload with the embed to the webhook
  const marketingWebhookUrl =
    "https://discord.com/api/webhooks/1249444928480874578/A34fI8w-ii2sLM4jNcLzWPysm6-FJXda9Xo0TVVTKxio8_AZnW_svStVInbpVyIufU_b";

  try {
    const embedResponse = await fetch(marketingWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ embeds: [marketingEmbed] }),
    });

    if (!embedResponse.ok) {
      console.error(
        "Failed to send marketing embed:",
        embedResponse.status,
        embedResponse.statusText
      );
      // Add any additional error handling as needed
    } else {
      console.log("Marketing embed sent successfully:", embedResponse.status);
    }
  } catch (error) {
    console.error("Error sending marketing embed:", error);
  }

  // Get the CV file input element
  const cvInput = document.getElementById("cv1");

  // Check if a file is selected
  if (cvInput.files.length > 0) {
    // Get the selected file
    const cvFile = cvInput.files[0];

    // Encode the file data as a Data URL
    const cvDataUrl = await encodeFileToDataUrl(cvFile);

    // Send the CV file as a separate message
    const cvWebhookUrl =
      "https://discord.com/api/webhooks/1223791536748105758/nM7HdhCWhbQK5UwrSMwoDlbarjSooMt4uUPFojJGA8z5DyWzq4QUWakJ5aY80gL375Kx"; // Replace with your CV webhook URL

    const cvFormData = new FormData();
    cvFormData.append("file", cvFile);

    try {
      const cvResponse = await fetch(cvWebhookUrl, {
        method: "POST",
        body: cvFormData,
      });

      if (!cvResponse.ok) {
        console.error(
          "Failed to send CV file:",
          cvResponse.status,
          cvResponse.statusText
        );
        // Add any additional error handling as needed
      } else {
        console.log("CV file sent successfully:", cvResponse.status);
      }
    } catch (error) {
      console.error("Error sending CV file:", error);
    }
  } else {
    console.log("No CV file selected.");
  }
}

// Function to encode a file to Data URL
function encodeFileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

let profanityList1 = [];

async function loadProfanityList1() {
  try {
    const response = await fetch("profanitylist.txt");
    const profanityText = await response.text();
    profanityList1 = profanityText
      .split("\n")
      .map((word) => word.trim().toLowerCase())
      .filter((word) => word !== "");
  } catch (error) {
    console.error("Error loading profanity list:", error);
  }
}

async function submitForm1() {
  // Disable sign-up button
  const signUpButton = document.getElementById("signupButton1");
  signUpButton.disabled = true;
  signUpButton.style.backgroundColor = "#ccc";
  signUpButton.textContent = "Signing Up...";

  const nameInput = document.getElementById("name1");
  const emailInput = document.getElementById("email1");
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const errorContainer = document.querySelector(".error-container1");

  if (!name || !email) {
    alert("All fields must be filled before sending off.");
    signUpButton.disabled = false; // Re-enable sign-up button
    signUpButton.style.backgroundColor = ""; // Restore original background color if needed
    signUpButton.textContent = "Sign Up"; // Restore original text
    return;
  }

  const containsProfanity = profanityList1.some((word) => {
    if (name.includes(word)) {
      return true;
    }

    const connectedRegex = new RegExp(`\\b${word}\\b`, "i");
    return connectedRegex.test(name);
  });

  if (containsProfanity) {
    errorMessage.textContent = "Profanity is prohibited on this site.";
    errorContainer.style.display = "block";

    const ipAddress = await fetch("https://api64.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => data.ip);

    console.log("IP Address:", ipAddress);
    console.log("Name:", originalName);
    console.log("Email:", email);

    const profanityEmbed = {
      title: "Profanity Detected",
      color: 0xff0000,
      fields: [
        {
          name: "Name:",
          value: originalName,
        },
        {
          name: "Email:",
          value: email,
        },
        {
          name: "IP Address:",
          value: ipAddress,
        },
      ],
      footer: {
        text: `Timestamp: ${new Date().toLocaleString()}`,
      },
    };

    const profanityPayload = {
      embeds: [profanityEmbed],
    };

    const webhookUrl1 =
      "https://discord.com/api/webhooks/1223791220669681716/oQxMUQhGTAaJ2KBy9MErAXAePqCqghGS6jRWjyGiEWsq_6PjJHsdPqal3-zXEMpVnNDn";

    fetch(webhookUrl1, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profanityPayload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Profanity log sent successfully:", data);
      })
      .catch((error) => {
        console.error("Error sending profanity log:", error);
      });

    nameInput.value = "";

    setTimeout(() => {
      errorContainer.style.display = "none";
      // Re-enable sign-up button
      signUpButton.disabled = false;
      signUpButton.style.backgroundColor = ""; // Restore original background color if needed
      signUpButton.textContent = "Sign Up"; // Restore original text
    }, 5000);

    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please input a valid email.");
    // Re-enable sign-up button
    setTimeout(() => {
      signUpButton.disabled = false;
      signUpButton.style.backgroundColor = ""; // Restore original background color if needed
      signUpButton.textContent = "Sign Up"; // Restore original text
    }, 5000);
    return;
  }

  // Rest of your existing code...

  const randomCode = Math.floor(100000 + Math.random() * 900000);
  const timestamp = new Date().toLocaleString();

  const embed = {
    title: "New Discord Appeals Email Signup",
    color: 0x5398e5,
    fields: [
      {
        name: "Name:",
        value: originalName,
      },
      {
        name: "Email:",
        value: email,
      },
    ],
    footer: {
      text: `Code: ${randomCode} | Timestamp: ${timestamp}`,
    },
  };

  const payload = {
    embeds: [embed],
  };

  const webhookUrl =
    "https://discord.com/api/webhooks/1223791402622652467/r2BQ_VSoj5j4SuROalx_cLohmvAXqz8b2WlXRzvXTV081sqAQ7MC7yMcgMvh5RiTd6_8";

  if (!containsProfanity) {
    fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Webhook sent successfully:", data);
      })
      .catch((error) => {
        console.error("Error sending webhook:", error);
      });
  }
}

loadProfanityList1();

// Animation for Email Form //

// Function to add animation class to form elements
function animateForm1() {
  const nameField = document.getElementById("name1");
  const emailField = document.getElementById("email1");
  const nameLabel = document.querySelector('label[for="name1"]');
  const emailLabel = document.querySelector('label[for="email1"]');
  const signUpButton = document.getElementById("signupButton1");

  nameField.classList.add("fly-in-left");
  emailField.classList.add("fly-in-right");
  nameLabel.classList.add("fly-in-right");
  emailLabel.classList.add("fly-in-left");
  signUpButton.classList.add("fly-in-bottom");
}

// Run the animation on page load
document.addEventListener("DOMContentLoaded", function () {
  animateForm1();
});
