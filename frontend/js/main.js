document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(registerForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert('Registration successful!');
                    window.location.href = '../views/login.html';
                } else {
                    // Log the status and response text for debugging
                    const errorText = await response.text();
                    console.error('Registration failed with status:', response.status);
                    console.error('Response text:', errorText);
                    alert('Registration failed: ' + response.status);
                }
            } catch (error) {
                console.error('Error during registration:', error);
                alert('An error occurred during registration!');
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(loginForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert('Login successful!');
                    window.location.href = '../views/user_dashboard.html';
                } else {
                    // Log the status and response text for debugging
                    const errorText = await response.text();
                    console.error('Login failed with status:', response.status);
                    console.error('Response text:', errorText);
                    alert('Login failed: ' + response.status);
                }
            } catch (error) {
                console.error('Error during login:', error);
                alert('An error occurred during login!');
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    fetchUserInfo();
    fetchDataPlans();
    fetchUsageStatistics();
});

function fetchUserInfo() {
    fetch('/api/user/info')
        .then(response => response.json())
        .then(data => {
            document.getElementById('username').textContent = `Username: ${data.username}`;
            document.getElementById('email').textContent = `Email: ${data.email}`;
        })
        .catch(error => console.error('Error fetching user info:', error));
}

function fetchDataPlans() {
    fetch('/api/user/data-plans')
        .then(response => response.json())
        .then(data => {
            const dataPlansList = document.getElementById('data-plans-list');
            data.plans.forEach(plan => {
                const listItem = document.createElement('li');
                listItem.textContent = `${plan.name} - ${plan.details}`;
                dataPlansList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching data plans:', error));
}

function fetchUsageStatistics() {
    fetch('/api/user/usage')
        .then(response => response.json())
        .then(data => {
            document.getElementById('data-usage').textContent = `Data Usage: ${data.usage}`;
        })
        .catch(error => console.error('Error fetching usage statistics:', error));
}



document.addEventListener('DOMContentLoaded', () => {
    fetch('/plans')
        .then(response => response.json())
        .then(plans => {
            const planList = document.getElementById('planList');
            plans.forEach(plan => {
                const li = document.createElement('li');
                li.classList.add('plan-item');
                li.innerHTML = `
                    <h2>${plan.name}</h2>
                    <p>Data: ${plan.data} GB</p>
                    <p>Price: $${plan.price}</p>
                `;
                planList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching plans:', error));
});


document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const mpesaNumber = document.getElementById('mpesaNumber').value;

    fetch('/pay', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mpesaNumber })
    })
    .then(response => response.json())
    .then(data => {
        alert('Payment processed successfully!');
        console.log(data);
    })
    .catch(error => {
        alert('Error processing payment.');
        console.error(error);
    });
}); 


/**
 * Checks the user's data limit and redirects if the limit has been exceeded.
 */
async function checkDataLimit() {
    try {
      // Send a request to the server to check data limit status
      const response = await fetch('/api/check-data-limit');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      // Parse the response as JSON
      const result = await response.json();
  
      // Check if the user is active
      if (!result.isActive) {
        alert('Your data limit has been exceeded. You are being redirected.');
        window.location.href = '/data-limit-exceeded'; // Redirect to a page notifying the user
      }
  
    } catch (error) {
      console.error('Error checking data limit:', error);
    }
  }
  
  // Call the function to check data limit when the script is loaded
  checkDataLimit();
/**
 * Checks the user's data limit and redirects if the limit has been exceeded.
 */
async function checkDataLimit() {
  try {
    // Send a request to the server to check data limit status
    const response = await fetch('/api/check-data-limit');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    // Parse the response as JSON
    const result = await response.json();

    // Check if the user is active
    if (!result.isActive) {
      alert('Your data limit has been exceeded. You are being redirected.');
      window.location.href = '/data-limit-exceeded'; // Redirect to a page notifying the user
    }

  } catch (error) {
    console.error('Error checking data limit:', error);
  }
}

// Call the function to check data limit when the script is loaded
checkDataLimit();


// frontend/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout-button');
  
    if (logoutButton) {
      logoutButton.addEventListener('click', () => {
        // Send a request to the backend to log out
        fetch('/api/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'  // Include cookies in the request
        })
        .then(response => {
          if (response.ok) {
            // Clear user session data from local storage or cookies
            localStorage.removeItem('user');
            // Redirect to the login page or home page
            window.location.href = '/login';
          } else {
            console.error('Failed to log out');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
      });
    }
  });
  
  
