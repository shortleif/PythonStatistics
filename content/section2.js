// Initialize global content array
window.CONTENT_SECTIONS = window.CONTENT_SECTIONS || [];

window.CONTENT_SECTIONS.push({
  title: 'Section 2: Probability and Distributions',
  topics: [
    {
      id: 'chances',
      title: 'What are the chances?',
      category: 'Statistics',
      description: `Probability is the mathematical measure of the likelihood that an event will occur. It is expressed as a number between 0 (impossible) and 1 (certain).

The fundamental formula is:
P(Event) = (Number of favorable outcomes) / (Total number of possible outcomes)

In data science, we use probability to quantify uncertainty and build models that predict the likelihood of future events, such as a customer churning or a transaction being fraudulent.`,
      examples: [
        {
          code: `def calculate_probability(favorable, total):
    return favorable / total

# Example: Probability of rolling a 4 on a standard 6-sided die
fav_outcomes = 1 # Only one '4'
total_outcomes = 6

prob = calculate_probability(fav_outcomes, total_outcomes)
print(f"Probability of rolling a 4: {prob:.4f} ({prob*100:.2f}%)")`,
          explanation:
            'A simple function to calculate basic probability based on the number of outcomes.',
        },
      ],
    },
    {
      id: 'replacement',
      title: 'With or Without Replacement?',
      category: 'Statistics',
      description: `This concept describes whether an item is returned to the pool after being selected.

• With Replacement: The events are independent. Selecting one item doesn't change the probability of selecting another (e.g., rolling a die multiple times).
• Without Replacement: The events are dependent. Each selection changes the remaining pool and the probabilities for the next draw (e.g., dealing cards from a deck).

Failing to account for the lack of replacement can lead to significant errors in probability calculations for small populations.`,
      examples: [
        {
          code: `import random

deck = ['Red', 'Red', 'Blue', 'Blue', 'Blue']

# --- Without Replacement ---
sample_without = random.sample(deck, k=2)
print(f"Drawn without replacement: {sample_without}")

# --- With Replacement ---
sample_with = random.choices(deck, k=2)
print(f"Drawn with replacement: {sample_with}")`,
          explanation:
            "Using Python's random module to demonstrate the difference between dependent (sample) and independent (choices) selections.",
        },
      ],
    },
    {
      id: 'discrete-dist',
      title: 'Discrete Distributions',
      category: 'Statistics',
      description: `Discrete distributions model scenarios where the outcomes are countable "chunks" rather than a continuous range. 

Common types include:
• Bernoulli: A single trial with two outcomes (Success/Failure).
• Binomial: The number of successes in a fixed number of Bernoulli trials.
• Poisson: The number of events occurring in a fixed interval of time or space.

Because these outcomes are distinct, we use a Probability Mass Function (PMF) to find the probability of a specific value.`,
      examples: [
        {
          code: `from scipy.stats import poisson

# Example: A call center receives an average of 5 calls per hour (lambda = 5)
# What is the probability of receiving exactly 8 calls in the next hour?
prob_8 = poisson.pmf(k=8, mu=5)

print(f"Probability of exactly 8 calls: {prob_8:.4f}")`,
          explanation:
            'Using Scipy to calculate the Probability Mass Function (PMF) for a Poisson distribution.',
        },
      ],
    },
    {
      id: 'expected-val',
      title: 'Expected Value vs. Sample Mean',
      category: 'Statistics',
      description: `• Expected Value (E[X]): The theoretical long-term average of a random variable. It is a weighted average of all possible outcomes.
• Sample Mean (x̄): The actual average calculated from a specific set of observed data.

According to the Law of Large Numbers, as the sample size increases, the sample mean will get closer and closer to the expected value. This is why more data usually leads to more reliable estimates.`,
      examples: [
        {
          code: `import numpy as np

# A fair die has an expected value of 3.5
# (1+2+3+4+5+6) / 6 = 3.5

# Simulation: Rolling a die 10 times vs 1,000,000 times
small_sample = np.random.randint(1, 7, 10)
large_sample = np.random.randint(1, 7, 1000000)

print(f"Sample Mean (n=10): {np.mean(small_sample):.2f}")
print(f"Sample Mean (n=1,000,000): {np.mean(large_sample):.4f}")
print("The larger sample is much closer to the expected value of 3.5.")`,
          explanation:
            'Demonstrating the Law of Large Numbers by comparing small and large sample means to the theoretical expected value.',
        },
      ],
    },
    {
      id: 'continuous-dist',
      title: 'Continuous Distributions',
      category: 'Statistics',
      description: `Continuous distributions model variables that can take any value within a range (like height, weight, or time). 

Unlike discrete variables, the probability of a continuous variable being exactly one specific value (like exactly 175.0000... cm tall) is zero. Instead, we calculate the probability of a value falling within a certain range using the area under the curve, defined by the Probability Density Function (PDF).`,
      examples: [
        {
          code: `from scipy.stats import norm

# For a standard normal distribution (mean=0, std=1)
# What is the probability of a value falling between -1 and 1?
prob_range = norm.cdf(1) - norm.cdf(-1)

print(f"Probability within 1 standard deviation: {prob_range:.4f}")`,
          explanation:
            'Using the Cumulative Distribution Function (CDF) to find the probability of a range in a continuous distribution.',
        },
      ],
    },
    {
      id: 'binomial-dist',
      title: 'The Binomial Distribution',
      category: 'Statistics',
      description: `The Binomial distribution is one of the most useful for business and science. It models the number of 'successes' in a sequence of 'n' independent experiments.

To use a Binomial distribution, you need:
1. A fixed number of trials (n).
2. Only two possible outcomes (Success/Failure).
3. A constant probability of success (p) for each trial.
4. Independent trials.`,
      examples: [
        {
          code: `from scipy.stats import binom

# Example: 10% of items from a factory are defective (p=0.1)
# If we pick 20 items (n=20), what is the chance of finding exactly 2 defects?
prob_2 = binom.pmf(k=2, n=20, p=0.1)

# What is the chance of finding 2 or fewer defects?
prob_2_or_less = binom.cdf(k=2, n=20, p=0.1)

print(f"Exactly 2 defects: {prob_2:.4f}")
print(f"2 or fewer defects: {prob_2_or_less:.4f}")`,
          explanation:
            'Calculating specific (PMF) and cumulative (CDF) probabilities for binomial events.',
        },
      ],
    },
  ],
});
