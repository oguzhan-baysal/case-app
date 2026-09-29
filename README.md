# Vardabit E-commerce

![Vardabit storefront](https://github.com/user-attachments/assets/63518619-e4d0-49fe-b49b-fb7c796cd714)

A single-page car storefront built with React, TypeScript, Redux Toolkit and Tailwind CSS.
The product catalog is served by a public mock API; the app covers browsing, filtering,
searching, sorting and a shopping cart that survives page reloads.

## ✨ Features

- Product grid with pagination (12 products per page, page control with first/last ellipsis)
- Product detail page at `/product/:id`
- Search across product name and description from the header
- Brand and model filters, each with its own in-list search box
- Sorting by newest/oldest and by price (ascending/descending)
- Header cart dropdown with quantity increase/decrease, item removal and a running total
- Cart and filter state persisted in `localStorage`
- Responsive layout: sticky header, a sidebar for sort/brand/model filters, and an extra
  slide-in drawer below `md` with separate **Filters** and **Cart** tabs

## 🛠️ Tech Stack

| Area | Choice |
| --- | --- |
| UI | React 18 |
| Language | TypeScript 5.6 (strict mode) |
| Build tool | Vite 6 |
| State management | Redux Toolkit 2 + react-redux 9 |
| Persistence | redux-persist 6 for the cart slice, `localStorage` for filters |
| Routing | React Router 7 |
| HTTP client | axios |
| Styling | Tailwind CSS 3.4 with `@tailwindcss/forms` |
| Testing | Jest 29, ts-jest, React Testing Library |

## ✅ Prerequisites

- Node.js `^18.0.0 || ^20.0.0 || >=22.0.0` — the range Vite 6 declares in its `engines` field
- npm — the repository ships a `package-lock.json`, so `npm ci` works out of the box

## 🚀 Getting Started

```bash
git clone https://github.com/oguzhan-baysal/case-app.git
cd case-app

# Install the exact dependency set from package-lock.json
npm ci

# Start the dev server (http://localhost:5173)
npm run dev
```

### Available scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the Vite dev server with HMR |
| `npm run build` | Type-checks (`tsc -b`) and produces a production build in `dist/` |
| `npm run preview` | Serves the contents of `dist/` locally |
| `npm run lint` | Runs ESLint over the project |
| `npm test` | Runs the Jest suite once |
| `npm run test:watch` | Runs Jest in watch mode |
| `npm run test:coverage` | Runs Jest and writes a coverage report |

## ⚙️ Configuration

The app needs no environment variables and no `.env` file. The catalog API base URL is
hardcoded in `src/services/api.ts`:

```ts
const API_URL = 'https://5fc9346b2af77700165ae514.mockapi.io'
```

Products are read from the `/products` endpoint of that mock API, which means an internet
connection is required while running the dev server. To use a different backend, change
`API_URL` to another endpoint that returns the same product fields
(`id`, `name`, `price`, `description`, `image`, `brand`, `model`).

Client state is kept in the browser:

| Storage | Written by | Contents |
| --- | --- | --- |
| `persist:root` | `redux-persist` (`src/features/store.ts`) | The whitelisted `cart` slice |
| `vardabit_cart` | `src/features/cartSlice.ts` | Cart items, used to seed the initial state |
| `vardabit_filters` | `src/features/productsSlice.ts` | Sort, brands, models and search term |

## 📁 Project Structure

```
src/
├── components/
│   ├── common/Pagination.tsx   # Page number control
│   ├── layout/                 # Layout, Header, Sidebar, MobileDrawer, Cart
│   └── product/ProductCard.tsx # Catalog card with add-to-cart
├── features/
│   ├── cartSlice.ts            # addToCart, removeFromCart, updateQuantity
│   ├── productsSlice.ts        # Fetching, filtering, sorting, pagination
│   └── store.ts                # configureStore + redux-persist setup
├── hooks/redux.ts              # Typed useAppDispatch / useAppSelector
├── pages/
│   ├── ProductList.tsx         # Route "/"
│   └── ProductDetail.tsx       # Route "/product/:id"
├── services/api.ts             # axios instance and product service
├── types/product.ts            # Product interface
└── utils/localStorage.ts       # Storage keys and read/write helpers
```

## 🧪 Tests

Tests are co-located with the code they cover (`*.test.ts`, `*.test.tsx`) and run through
Jest with the `jsdom` environment and `ts-jest`.

```bash
npm test                  # Single run
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report in coverage/
```

## 🤝 Contributing

1. Fork the repository and create a branch (`git checkout -b feature/my-change`)
2. Commit your changes with a descriptive message
3. Open a pull request describing what changed and why

## 📄 License

Released under the MIT License. See [LICENSE](LICENSE) for the full text.

## 👤 Author

**Oğuzhan Baysal**

- GitHub: [@oguzhan-baysal](https://github.com/oguzhan-baysal)
- Email: oguzhanbaysal@outlook.com
