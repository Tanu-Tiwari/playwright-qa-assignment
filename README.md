# Playwright QA Assignment

This is my submission for the QA automation assignment. I used Playwright with TypeScript.

UI tests are on https://www.saucedemo.com and API tests are on https://reqres.in

## Setup and run

Node.js 18+ is needed.

```
npm install
npx playwright install chromium
npx playwright test
```

To run only UI or only API tests:

```
npm run test:ui
npm run test:api
```

To see the HTML report after running:

```
npm run report
```

## Tests

UI tests (tests/ui)

1. login.spec.ts - standard_user logs in and goes to the Products page
2. login.spec.ts - locked_out_user gets the locked out error and stays on login page
3. cart.spec.ts - add two products and check cart badge shows 2
4. checkout.spec.ts - add products, go through checkout and check the "Thank you for your order!" message
5. sort.spec.ts - sort by Price (low to high) and check first product has the lowest price

API tests (tests/api/users.spec.ts)

6. GET /api/users?page=2 - status 200, data is an array and each user has id, email, first_name, last_name
7. POST /api/users with morpheus / leader - status 201, name and job come back, id and createdAt are there
8. Bonus - create then verify, done with test.step. reqres does not save the user so I can't GET it back, I just verify the POST response in a separate step

API tests use the request fixture so no browser is opened for them.

## Folder structure

```
pages/        page objects - LoginPage, ProductsPage, CheckoutPage
tests/ui/     UI tests
tests/api/    API tests
```

## Notes

- I used Page Object Model so all the locators are in the pages folder and tests are easy to read.
- For locators I mostly used getByRole and getByPlaceholder. Where that was not possible I used getByTestId. Saucedemo uses `data-test` attribute so I changed `testIdAttribute` in the config.
- Every UI test logs in by itself in beforeEach, so tests don't depend on each other and can run in parallel.
- In the sort test I wait for the dropdown to show the selected option before reading the prices, otherwise it can read the old order.
- Only Chromium is used. Screenshots and traces are saved when a test fails.

## What I would add with more time

- Save login state with storageState so UI tests don't log in every time
- Keep test data like users and products in one file
- Negative tests for checkout (empty fields) and some tests for problem_user
- GitHub Actions to run tests on push
