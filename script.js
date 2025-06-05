document.addEventListener('DOMContentLoaded', function() {
    const usersContainer = document.getElementById('users-container');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error-message');
    const reloadBtn = document.getElementById('reload-btn');

    async function fetchUsers() {
        const url = 'https://jsonplaceholder.typicode.com/users';
        
        try {
            showLoading();
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const users = await response.json();
            displayUsers(users);
            hideLoading();
            hideError();
            
        } catch (error) {
            hideLoading();
            showError(`Failed to fetch users: ${error.message}`);
            console.error('Error fetching users:', error);
        }
    }

    function displayUsers(users) {
        usersContainer.innerHTML = '';
        
        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.classList.add('user-card');
            
            userCard.innerHTML = `
                <h3>${user.name}</h3>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>Website:</strong> ${user.website}</p>
                <div class="address">
                    <strong>Address:</strong>
                    <p>${user.address.street}, ${user.address.suite}</p>
                    <p>${user.address.city}, ${user.address.zipcode}</p>
                </div>
                <p><strong>Company:</strong> ${user.company.name}</p>
            `;
            
            usersContainer.appendChild(userCard);
        });
    }

    function showLoading() {
        loadingElement.classList.remove('hidden');
    }

    function hideLoading() {
        loadingElement.classList.add('hidden');
    }

    function showError(message) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }

    function hideError() {
        errorElement.classList.add('hidden');
    }

    reloadBtn.addEventListener('click', fetchUsers);
    fetchUsers();
});
