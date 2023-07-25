---
title: Debugging slow tsc
---

I was working on a project and I noticed the `tsc` check that we ran on pre-commit hooks had become dramatically slower. I was seeing near instant times to type check the entire project go to agonizingly slow minutes to check the project. I was able to narrow the range of commits to some change we made within a month window. I’m sure I could have narrowed it down by continuing to git bisect and re-running `time npx tsc`, but it was much easier to just check out main and try out the following:

```bash
# remove any pre-built definitions to get a good baseline
rm -r .tsBuildInfo

# Get some baseline stats
time npx tsc
```

I was seeing values around (times have been modified for blogging purposes):

```bash
real 1m30.000s
user 2m0.000s
sys 0m3.000s
```

After running the baseline trace, I could analyze the `tsc` trace and use a nifty tool called `analyze-trace` that will report hotspots:

```bash
npm i -g @typescript/analyze-trace

npx tsc --generateTrace ./.trace
npx analyze-trace ./.trace
```

This command will spit out which files are hotspots in your codebase. To my surprise, I was seeing build outputs from webpack as a hotspot.

Turns out the `tsconfig.json` had been slightly modified and accidentally included the build folder. Adding the build folder to the excludes entry sped up the tsc command by quite a bit:

```bash
real 0m30.000s
user 0m47.000s
sys 0m2.000s
```

Not only did the trace help me identify the major hotspot in the code, but also
indicated some additional areas that I could improve upon going forward.
