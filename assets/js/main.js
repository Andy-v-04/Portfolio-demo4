document.addEventListener('DOMContentLoaded', function() {
    // Get the form element
    const form = document.querySelector('.contact-form');
    
    // Check if the form exists
    if (form) {
        form.addEventListener('submit', function(event) {
            // Assume the form is valid initially
            let isFormValid = true;
            
            // Clear any previous error messages
            clearErrorMessages();
            
            // Iterate through all required input fields
            const requiredFields = form.querySelectorAll('[required]');

            requiredFields.forEach(input => {
                // Remove existing invalid class from previous runs
                input.classList.remove('is-invalid');
                
                // Check if the input is empty
                if (input.value.trim() === '') {
                    // Show error message next to the field
                    displayError(input, `${input.previousElementSibling.textContent.split(' ')[0]} is required.`);
                    isFormValid = false;
                } 
                // Custom Email Validation
                else if (input.type === 'email' && !isValidEmail(input.value.trim())) {
                    displayError(input, 'Please enter a valid email address.');
                    isFormValid = false;
                }
                // Custom Tel (Phone) Validation 
                else if (input.type === 'tel' && input.value.trim() !== '' && !input.checkValidity()) {
                    displayError(input, input.title);
                    isFormValid = false;
                }
            });
            
            // Final Submission Check 
            if (!isFormValid) {
                event.preventDefault();
                alert("Please correct the errors marked in red before submitting.");
            }
        });
    }

    // Helper function to display an error message
    function displayError(input, message) {
        // Add class for visual styling
        input.classList.add('is-invalid');
        
        // Create the error element
        const error = document.createElement('div');
        error.className = 'error-message'; 
        error.textContent = message;
        
        // Insert the error message 
        input.parentNode.insertBefore(error, input.nextSibling);
    }

    function clearErrorMessages() {
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    }
    
    function isValidEmail(email) {
        // Basic RFC 5322 standard check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});