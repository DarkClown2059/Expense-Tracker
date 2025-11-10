# Expense Tracker (Local Static App)

Small static expense tracker built with HTML/CSS/JS. Stores a single user and transactions in browser `localStorage`.

## Quick start (macOS / zsh)

1. Open a terminal and change into the project folder:

```bash
cd "/Users/sahilnarula/Downloads/Expense Tracker"
```

2. Start a lightweight static server (Python 3):

```bash
python3 -m http.server 8000
```

3. Open the app in your browser:

```
http://localhost:8000/login.html
```

Alternative (Node):

```bash
npm install -g http-server
http-server -p 8000 -c-1
```

## How it works

- `login.html` — login page. Has an inline registration box. Credentials are stored in `localStorage` under the key `user`.
- `index.html` — main expense tracker. Requires a `loggedIn` flag in `localStorage` set to `'true'` to view. Transactions are stored in `localStorage` under `transactions`.
- `script.js` — app logic for redirect/login guard, transactions (add/remove), storage, and UI updates.
- `style.css` — styles.

## Quick test (console)

If you want to populate a test user and sample transactions without using the UI, open DevTools → Console and paste:

```javascript
localStorage.setItem('user', JSON.stringify({ username: 'test', password: 'pass' }));
localStorage.setItem('loggedIn', 'true');
localStorage.setItem('transactions', JSON.stringify([
  { id: Date.now(), text: 'Salary', amount: 50000 },
  { id: Date.now() + 1, text: 'Groceries', amount: -1500 },
  { id: Date.now() + 2, text: 'Transport', amount: -300 }
]));
window.location.href = 'index.html';
```

## Troubleshooting

- Port 8000 already in use: find and stop the process that is listening on that port:

```bash
lsof -i :8000 -P -n
kill <PID>
```

- Stale localStorage data: clear it from DevTools → Application → Local Storage or run:

```javascript
localStorage.clear();
```

- If the register or login flows behave incorrectly: open DevTools → Console and paste:

```javascript
console.log('user:', localStorage.getItem('user'));
console.log('loggedIn:', localStorage.getItem('loggedIn'));
console.log('transactions:', localStorage.getItem('transactions'));
```

and paste output here.

## Next steps (suggestions)

- Add proper user sessions / multiple users (requires backend).
- Replace localStorage credential storage with a secure backend and hashed passwords.
- Improve accessibility (labels, ARIA roles) and add tests.

---

If you want, I can also add a `start.sh` script that launches the server and opens the browser automatically, or add a screenshot and the sample console helper as a script file. Which would you like?
