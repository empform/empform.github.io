document.getElementById('nextToPage2').addEventListener('click', function() {
    window.location.href = 'page2.html';
});

document.getElementById('nextToPage3').addEventListener('click', function() {
    window.location.href = 'page3.html';
});

document.getElementById('submitForm').addEventListener('click', function() {
    alert('Form submitted successfully!');
    window.location.href = 'page1.html';
});
