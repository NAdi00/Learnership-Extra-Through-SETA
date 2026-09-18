
localStorage.setItem('user', JSON.stringify({ name: 'John Doe', age: 30 }));

console.log('User data saved to localStorage.');
console.log('User data:', JSON.parse(localStorage.getItem('user')));