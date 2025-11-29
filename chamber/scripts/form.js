// Check if we're on the thankyou page
const resultsElement = document.querySelector('#results');
if (resultsElement) {
    const myInfo = new URLSearchParams(window.location.search);

    // Get all the form data
    const firstName = myInfo.get('first-name');
    const lastName = myInfo.get('last-name');
    const email = myInfo.get('email');
    const mobile = myInfo.get('mobile');
    const businessName = myInfo.get('business-name');
    const timestamp = myInfo.get('timestamp');

    // Format the timestamp to be more readable
    const formattedDate = timestamp ? new Date(timestamp).toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }) : 'N/A';

    // Display the results
    resultsElement.innerHTML = `
        <p>Thank you for joing us.</p>
        <p>Application for ${firstName || 'N/A'} ${lastName || 'N/A'}</p>
        <p>Your email is ${email || 'N/A'}</p>
        <p>Your phone number is ${mobile || 'N/A'}</p>
        <p>Your bussiness is ${businessName || 'N/A'}</p>
        <p>Application Submitted: ${formattedDate}</p>
    `;
}