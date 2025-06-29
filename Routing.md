# College Predictor API – Routing Documentation

**Base URL:** `http://localhost:PORT/api`

---

## Admin Routes

| Method | Endpoint         | Description                | Access      |
|--------|------------------|----------------------------|-------------|
| POST   | /admin/register   | Register a new admin       | Superadmin  |
| POST   | /admin/login      | Login admin and get token  | Public      |
| GET    | /admin/me         | Get logged-in admin profile| Auth        |
| GET    | /admin/all        | Get list of all admins     | Superadmin  |
| DELETE | /admin/:id        | Delete admin by ID         | Superadmin  |

---

##  Student Routes

| Method | Endpoint           | Description                             | Access |
|--------|--------------------|-----------------------------------------|--------|
| POST   | /students/register | Register a new student                  | Public |
| POST   | /students/login    | Student login                           | Public |
| GET    | /students/:id      | Get student profile by ID               | Auth   |
| PUT    | /students/:id      | Update student info                     | Auth   |
| DELETE | /students/:id      | Soft delete student (`isActive: false`) | Admin  |

---

##  Counselling Routes

| Method | Endpoint             | Description                      | Access |
|--------|----------------------|----------------------------------|--------|
| POST   | /counselling/create         | Create a new counselling session | Admin  |
| GET    | /counselling/read         | Get all counselling sessions     | Public |
| GET    | /counselling/:id     | Get counselling by ID            | Public |
| PUT    | /counselling/:id     | Update counselling details       | Admin  |
| DELETE | /counselling/:id     | Delete counselling session       | Admin  |

---

##  College Routes

| Method | Endpoint        | Description            | Access |
|--------|-----------------|------------------------|--------|
| POST   | /colleges/create       | Create a new college   | Admin  |
| GET    | /colleges/read       | List all colleges      | Public |
| GET    | /colleges/:id   | Get college by ID      | Public |
| PUT    | /colleges/:id   | Update college details | Admin  |
| DELETE | /colleges/:id   | Delete a college       | Admin  |

---

##  Branch Routes

| Method | Endpoint        | Description            | Access |
|--------|-----------------|------------------------|--------|
| POST   | /branches       | Create a new branch    | Admin  |
| GET    | /branches       | Get all branches       | Public |
| GET    | /branches/:id   | Get branch by ID       | Public |
| PUT    | /branches/:id   | Update branch details  | Admin  |
| DELETE | /branches/:id   | Delete branch          | Admin  |

---

##  Cutoff Routes

| Method | Endpoint        | Description                             | Access |
|--------|-----------------|-----------------------------------------|--------|
| POST   | /cutoffs        | Add a new cutoff record                 | Admin  |
| GET    | /cutoffs        | Get all cutoff records (filterable)     | Public |
| GET    | /cutoffs/:id    | Get cutoff by ID                        | Public |
| PUT    | /cutoffs/:id    | Update cutoff info                      | Admin  |
| DELETE | /cutoffs/:id    | Delete a cutoff record                  | Admin  |

###  Filtering Example

```http
GET /cutoffs?collegeId=abc123&year=2024&category=GEN
```
##  Prediction Routes

| Method | Endpoint              | Description                          | Access  |
|--------|-----------------------|--------------------------------------|---------|
| POST   | /predict              | Generate prediction for a student    | Student |
| GET    | /predict/:studentId   | Get prediction result for student    | Student |
| DELETE | /predict/:id          | Delete a prediction                  | Admin   |

---

###  Prediction Logic Should Match:

- Student rank  
- Category  
- Cutoff range  
- Closing rank  
- Quota & seat type  

---

##  Authentication Notes

Use JWT-based Auth for Admin and Student.

Protect routes using middleware like:

```js
const verifyToken = (req, res, next) => {
  // JWT verification logic
};
```


##  Sample Flow
1. Admin logs in and receives a token.

2. Admin creates Colleges, Branches, Counselling sessions.

3. Admin uploads Cutoffs.

4. Student registers and logs in.

5. Student predicts eligible colleges.

6. Prediction results are stored and retrieved.


#### Suggested Folder Structure
```rust

college_predictor/
│
├── models/         -> Mongoose Schemas
│   └── *.js
├── routes/         -> Express Routes
│   └── admin.js, student.js, predict.js, etc.
├── controllers/    -> Business Logic
│   └── *.js
├── middleware/     -> JWT Auth Checks
│   └── auth.js
├── config/         -> DB connection setup
│   └── db.js
├── app.js          -> Main App Configuration
├── server.js       -> Server Entry Point
```
