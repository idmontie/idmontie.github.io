---
title: Smart Contract Security
---

The crypto craze has died down, but if you are working on Smart Contracts or thinking about creating a new blockchain projects, security is a huge part of making sure the project is successful. Since Smart Contracts often interact with cryptocurrencies, blockchain assets, or other tokens, it’s important to make sure the Smart Contract is secure and follows best practices.

In general, the best practices around Smart Contracts are the same for writing secure code in general.

## Keep it Simple

Keep your Smart Contract code simple. Smart Contracts that try to be too clever often have unintended side-effects or functionality. Keeping a Smart Contract simple also means that the surface area for attacks is smaller.

## Write Small Functions

Write small functions that do one thing. Many Smart Contracts will have many small functions that can be composed together, rather than one large function that does everything. This helps keep the code readable, making it easier to understand and secure.

## Linting

Lint your code. Smart Contracts written in Solidity have tools already written that can help catch common errors via linting. The easiest linters to set up just help improve formatting, but some can help you write more secure code by letting your know when functions have been deprecated or marked as insecure.

## Unit Tests

Unit test your code. The best unit tests you can write for Smart Contracts are validating what users shouldn’t be able to do. As an example, make sure unauthorized accounts cannot withdraw assets from your contract. These are sometimes called **negative** tests and they can be even more important than your typical that validate your functions do what you expect them to do. These tests check that they fail in the correct way when misused.

## Scan for Security Vulnerabilities

Scan your code for security vulnerabilities. This is pretty self-explanatory. Many Smart Contract toolchains provide scanning tools to check your Smart Contract code.

There are a few ways to surface security issues in Ethereum Smart Contracts. One way is to use [slither](https://github.com/crytic/slither):

```tsx
npm install slither
slither .
```

This may take a while to run, but it will scan the compiles contracts for security issues.

## Compliance

For Ethereum Smart Contracts, you can also use [slither](https://github.com/crytic/slither) to check the compliance of your ERC20 token or ERC721 contracts. Running this check will verify that your contract implements the expected interfaces of the given contracts.

## Wrapping it Up

Security is a major consideration in any application, but Smart Contracts pose a new type of attack vector for malicious users. Smart Contracts often interact with pools of cryptocurrency, NFTs, and other blockchain assets that make them new targets for attackers. It’s important when writing Smart Contracts to always make sure the contract fails correctly, even more-so than completing actions successfully.
