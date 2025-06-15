---
title: The Breaking Point - Understanding the performance of your systems
tags: ["architecture", "scaling"]
---

Every system has its limits. When designing and architecting systems, sometimes we as engineers like to assume things can scale infinitely. Maybe we can use larger machines, or maybe we can deploy more instances of a service. But even trying to scale systems isn't magically infinite. It's a smart move to understand the limitations of what we are building upfront so we can make better technology choices, and squeeze the performance out of our existing systems.

![The Breaking Point](./splash.png)

## The Myth of Scaling

Software engineering often has an optimistic mindset that scaling a service is easy: we just let the more instances of the service be deployed, and voilà, perfect scaling! But the reality is a bit more complex. Instances don't always fire up instantly, services can fail unexpectedly, and not every component can scale indefinitely.

That's why it's important to understand the limitations of our services. Knowing where the system might buckle under pressure allows us to devise strategies to prevent these breaking points from turning into disasters.

For example, we may have a public API service with set auto-scaling rules. When the service is hit with many requests, the service spawns additional instances to handle the workload. This ends up working well in most cases, but in the real-world, the service ends up getting hit with huge bursts of requests from downstream users, rather than a steady increase of traffic. When this happens, we scale the service instances up, but now the database gets hit with too many writes and fails over, since the database was originally designed as a read heavy use-case. Of course this is a contrived example, but similar edge-cases commonly appear in complex architectures.

Without understanding the full system and the constraints of each part, it can be difficult to successfully scale.

## Understanding Server Limitations

A good starting point for finding your system's breaking point is to see how it fares on a single machine. Profile the memory usage when under load, and use load testing to determine how many simultaneous requests the service can handle before performance degrades. To make sense of it all, set some benchmarks:

1. Determine what it means for performance to degrade. In some systems, you may have SLAs for some percentage of requests to complete within a given response time. Other systems may have more leniency.
2. Use readily available tools to bombard your service with requests and observe the results. For web API services, there are plenty of open source tools that can sustain issuing millions of requests a second and reporting results.
3. Run the tests multiple times and throw out any outliers in the results. From the rest, understand the peak memory usage, peak disk usage, and peak CPU usage of the service.

Once you have the information from these types of load tests, it becomes easy to identify indicators that a service will begin to degrade. For some services it is CPU usage that will increase more than the other resources. For some services, memory can get exhausted first.

The load testing will also be a good indicator of how many requests a single instance of your service can handle before falling over.

## Scaling Strategies

When dealing with monolithic services or hefty microservices, you may find from load testing that just vertically scaling the service by adding more hardware is more cost efficient than replicating the instance.

For smaller service that use less memory and CPU footprint, it may make more sense to horizontally scale the service with many additional smaller servers being deployed.

Cloud services like AWS, Azure, and GCP help enable either decision. With AWS, there are many different instance types to get the right size for your specific service deployment. With the right size picked out, auto-scaling becomes a more budget-friendly option, as you're only spinning up instances that meet your specific resource requirements.

Cloud providers additionally have ways to detect when to auto-scale an instance based on resource usage, making load testing very informative to tune these values.

## Conclusion

Scaling isn't a one-size-fits-all solution. It's about understanding the unique limitations and potential of your system. Through careful analysis, load testing, and a bit of strategic thinking, you can develop a scaling strategy that not only meets your performance needs but also keeps an eye on the cost of your system. Whether it's beefing up your hardware or multiplying smaller instances, the key lies in making informed, tailored decisions for your system's specific demands and quirks.
