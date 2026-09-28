# Playwright QA Assignment

Small test suite I wrote with Playwright and TypeScript for the QA automation assignment.

- UI tests run against https://www.saucedemo.com
- API tests run against https://reqres.in

## How to run

You need Node.js 18 or above.

```
npm install
npx playwright install chromium
npx playwright test
```

Other useful commands:

```
npm run test:ui      # only UI tests
npm run test:api     # only API tests
npm run report       # open the HTML report from the last run
```

## What's covered

### UI tests (`tests/ui`)

| # | File | What it checks |
|---|------|----------------|
| 1 | `login.spec.ts` | Standard user logs in and lands on the Products page |
| 2 | `login.spec.ts` | Locked out user sees the correct error and stays on the login page |
| 3 | `cart.spec.ts` | Adding two products updates the cart badge to 2 |
| 4 | `checkout.spec.ts` | Full checkout (cart, info, finish) shows "Thank you for your order!" |
| 5 | `sort.spec.ts` | Sorting by Price (low to high) puts the cheapest product first |

### API tests (`tests/api`)

| # | Test | What it checks |
|---|------|----------------|
| 6 | GET `/api/users?page=2` | Status 200, `data` is an array, every user has id, email, first_name, last_name |
| 7 | POST `/api/users` | Status 201, response has the same name and job we sent, plus id and createdAt |
| 8 | Create then verify (bonus) | Same POST split into two `test.step`s - create, then verify the result |

The API tests use Playwright's `request` fixture, so no browser is opened.

## Project structure

```
pages/
  LoginPage.ts       login form + error message
  ProductsPage.ts    product list, cart badge, sorting
  CheckoutPage.ts    checkout steps + success message
tests/
  ui/                UI specs
  api/               API specs
playwright.config.ts
```

## A few decisions I made

- **Page Object Model** - locators and actions live in `pages/`, so tests only describe the steps and the expected result.
- **Locators** - I used `getByRole` and `getByPlaceholder` where the element has a clear role or label, and `getByTestId` for the rest. SauceDemo uses `data-test` instead of `data-testid`, so I set `testIdAttribute: 'data-test'` in the config. No XPath or styling classes.
- **Independent tests** - each UI test logs in on its own (in `beforeEach`), so tests can run in any order and in parallel.
- **Sort test** - I wait for the dropdown to show "Price (low to high)" before reading prices, so the test doesn't read the list before it re-renders. Then I check the first price equals the lowest price, instead of hardcoding `$7.99`.
- **Bonus API test** - reqres doesn't actually save users, so there is nothing to GET back. I split the flow into "create" and "verify" steps to show how it would look against a real API.

## If I had more time

- Log in once and reuse the session with `storageState`, so UI tests are faster.
- Move test data (users, products, checkout details) into one shared file.
- Add negative checkout tests (empty fields) and tests for `problem_user`.
- Add a GitHub Actions workflow to run the suite on every push.
