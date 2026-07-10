export type Activity = "Active" | "Maintained" | "Quiet" | "Unknown";

export type Library = {
  name: string;
  repo: string;
  category: string;
  reactOnly: boolean;
  activity: Activity;
  stars: number | null;
  pushedAt: string | null;
  description: string | null;
};

export const fallbackLibraries: Library[] = [
  {
    "name": "React.js",
    "repo": "facebook/react",
    "category": "General Frameworks/Libraries",
    "reactOnly": true,
    "activity": "Unknown",
    "stars": null,
    "pushedAt": null,
    "description": null
  },
  {
    "name": "Next.js",
    "repo": "vercel/next.js",
    "category": "General Frameworks/Libraries",
    "reactOnly": true,
    "activity": "Unknown",
    "stars": null,
    "pushedAt": null,
    "description": null
  },
  {
    "name": "Gatsby.js",
    "repo": "gatsbyjs/gatsby",
    "category": "General Frameworks/Libraries",
    "reactOnly": true,
    "activity": "Unknown",
    "stars": null,
    "pushedAt": null,
    "description": null
  },
  {
    "name": "Remix",
    "repo": "remix-run/remix",
    "category": "General Frameworks/Libraries",
    "reactOnly": true,
    "activity": "Unknown",
    "stars": null,
    "pushedAt": null,
    "description": null
  },
  {
    "name": "Redwood",
    "repo": "redwoodjs/redwood",
    "category": "General Frameworks/Libraries",
    "reactOnly": true,
    "activity": "Unknown",
    "stars": null,
    "pushedAt": null,
    "description": null
  },
  {
    "name": "Redux",
    "repo": "reduxjs/redux",
    "category": "Global State Management",
    "reactOnly": false,
    "activity": "Unknown",
    "stars": null,
    "pushedAt": null,
    "description": null
  },
  {
    "name": "Zustand",
    "repo": "pmndrs/zustand",
    "category": "Global State Management",
    "reactOnly": true,
    "activity": "Unknown",
    "stars": null,
    "pushedAt": null,
    "description": null
  },
  {
    "name": "Mobx",
    "repo": "mobxjs/mobx",
    "category": "Global State Management",
    "reactOnly": false,
    "activity": "Unknown",
    "stars": null,
    "pushedAt": null,
    "description": null
  },
  {
    "name": "Jotai",
    "repo": "pmndrs/jotai",
    "category": "Global State Management",
    "reactOnly": true,
    "activity": "Unknown",
    "stars": null,
    "pushedAt": null,
    "description": null
  },
  {
    "name": "Tailwindcss",
    "repo": "tailwindlabs/tailwindcss",
    "category": "CSS utility frameworks",
    "reactOnly": false,
    "activity": "Unknown",
    "stars": null,
    "pushedAt": null,
    "description": null
  },
  {
    "name": "Styled-components",
    "repo": "styled-components/styled-components",
    "category": "CSS utility frameworks",
    "reactOnly": true,
    "activity": "Unknown",
    "stars": null,
    "pushedAt": null,
    "description": null
  },
  {
    "name": "Emotion",
    "repo": "emotion-js/emotion",
    "category": "CSS utility frameworks",
    "reactOnly": true,
    "activity": "Unknown",
    "stars": null,
    "pushedAt": null,
    "description": null
  },
  {
    "name": "Unocss",
    "repo": "unocss/unocss",
    "category": "CSS utility frameworks",
    "reactOnly": false,
    "activity": "Unknown",
    "stars": null,
    "pushedAt": null,
    "description": null
  },
  {
    "name": "Linaria",
    "repo": "callstack/linaria",
    "category": "CSS utility frameworks",
    "reactOnly": true,
    "activity": "Unknown",
    "stars": null,
    "pushedAt": null,
    "description": null
  },
  {
    "name": "Material-ui",
    "repo": "mui/material-ui",
    "category": "UI kit & components",
    "reactOnly": true,
    "activity": "Unknown",
    "stars": null,
    "pushedAt": null,
    "description": null
  },
  {
    "name": "Ant-design",
    "repo": "ant-design/ant-design",
    "category": "UI kit & components",
    "reactOnly": true,
    "activity": "Unknown",
    "stars": null,
    "pushedAt": null,
    "description": null
  },
  {
    "name": "Chakra-ui",
    "repo": "chakra-ui/chakra-ui",
    "category": "UI kit & components",
    "reactOnly": true,
    "activity": "Unknown",
    "stars": null,
    "pushedAt": null,
    "description": null
  },
  {
    "name": "Daisy-ui",
    "repo": "saadeghi/daisyui",
    "category": "UI kit & components",
    "reactOnly": false,
    "activity": "Unknown",
    "stars": null,
    "pushedAt": null,
    "description": null
  },
  {
    "name": "Axios",
    "repo": "axios/axios",
    "category": "Data fetching",
    "reactOnly": false,
    "activity": "Unknown",
    "stars": null,
    "pushedAt": null,
    "description": null
  },
  {
    "name": "TanStack",
    "repo": "TanStack/query",
    "category": "Data fetching",
    "reactOnly": true,
    "activity": "Unknown",
    "stars": null,
    "pushedAt": null,
    "description": null
  },
  {
    "name": "Swr",
    "repo": "vercel/swr",
    "category": "Data fetching",
    "reactOnly": true,
    "activity": "Unknown",
    "stars": null,
    "pushedAt": null,
    "description": null
  },
  {
    "name": "Apollo-client",
    "repo": "apollographql/apollo-client",
    "category": "Data fetching",
    "reactOnly": false,
    "activity": "Unknown",
    "stars": null,
    "pushedAt": null,
    "description": null
  },
  {
    "name": "Jest",
    "repo": "jestjs/jest",
    "category": "Unit testing",
    "reactOnly": false,
    "activity": "Unknown",
    "stars": null,
    "pushedAt": null,
    "description": null
  },
  {
    "name": "Mocha",
    "repo": "mochajs/mocha",
    "category": "Unit testing",
    "reactOnly": false,
    "activity": "Unknown",
    "stars": null,
    "pushedAt": null,
    "description": null
  },
  {
    "name": "Enzyme",
    "repo": "enzymejs/enzyme",
    "category": "Unit testing",
    "reactOnly": true,
    "activity": "Unknown",
    "stars": null,
    "pushedAt": null,
    "description": null
  },
  {
    "name": "Testing library",
    "repo": "testing-library/react-testing-library",
    "category": "Unit testing",
    "reactOnly": true,
    "activity": "Unknown",
    "stars": null,
    "pushedAt": null,
    "description": null
  },
  {
    "name": "Chai",
    "repo": "chaijs/chai",
    "category": "Unit testing",
    "reactOnly": false,
    "activity": "Unknown",
    "stars": null,
    "pushedAt": null,
    "description": null
  },
  {
    "name": "Bulletproof-react",
    "repo": "alan2207/bulletproof-react",
    "category": "Application architecture",
    "reactOnly": true,
    "activity": "Unknown",
    "stars": null,
    "pushedAt": null,
    "description": null
  },
  {
    "name": "Micro-frontends",
    "repo": "neuland/micro-frontends",
    "category": "Application architecture",
    "reactOnly": false,
    "activity": "Unknown",
    "stars": null,
    "pushedAt": null,
    "description": null
  },
  {
    "name": "Feature-sliced",
    "repo": "feature-sliced/documentation",
    "category": "Application architecture",
    "reactOnly": false,
    "activity": "Unknown",
    "stars": null,
    "pushedAt": null,
    "description": null
  },
  {
    "name": "Atomic-design",
    "repo": "bradfrost/atomic-design",
    "category": "Application architecture",
    "reactOnly": false,
    "activity": "Unknown",
    "stars": null,
    "pushedAt": null,
    "description": null
  },
  {
    "name": "Evolution-design",
    "repo": "evo-community/evolution-design",
    "category": "Application architecture",
    "reactOnly": false,
    "activity": "Unknown",
    "stars": null,
    "pushedAt": null,
    "description": null
  },
  {
    "name": "Awesome-react",
    "repo": "enaqx/awesome-react",
    "category": "Awesome lists",
    "reactOnly": true,
    "activity": "Unknown",
    "stars": null,
    "pushedAt": null,
    "description": null
  },
  {
    "name": "Awesome-react-components",
    "repo": "brillout/awesome-react-components",
    "category": "Awesome lists",
    "reactOnly": true,
    "activity": "Unknown",
    "stars": null,
    "pushedAt": null,
    "description": null
  },
  {
    "name": "Awesome-react-design-systems",
    "repo": "jbranchaud/awesome-react-design-systems",
    "category": "Awesome lists",
    "reactOnly": true,
    "activity": "Unknown",
    "stars": null,
    "pushedAt": null,
    "description": null
  },
  {
    "name": "Best-of-react",
    "repo": "lukasmasuch/best-of-react",
    "category": "Awesome lists",
    "reactOnly": true,
    "activity": "Unknown",
    "stars": null,
    "pushedAt": null,
    "description": null
  }
];

