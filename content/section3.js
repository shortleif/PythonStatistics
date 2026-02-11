// Initialize global content array
window.CONTENT_SECTIONS = window.CONTENT_SECTIONS || [];

window.CONTENT_SECTIONS.push({
  title: 'Section 3: Advanced Distributions and the CLT',
  topics: [
    {
      id: 'normal-dist',
      title: 'The Normal Distribution',
      category: 'Statistics',
      description: `The Normal Distribution (or Gaussian Distribution) is the famous "bell curve." It is defined by two parameters: the mean (μ), which locates the peak, and the standard deviation (σ), which determines the spread.

Key Characteristics:
• It is perfectly symmetrical: the mean, median, and mode are all equal.
• The 68-95-99.7 Rule: Approximately 68% of data falls within 1σ, 95% within 2σ, and 99.7% within 3σ.
• Many natural phenomena (heights, error terms, test scores) naturally follow this distribution.`,
      examples: [
        {
          code: `from scipy.stats import norm
import numpy as np

# Calculating Z-scores (Standardization)
# Formula: z = (x - mu) / sigma
val = 85
mu = 70
sigma = 10

z_score = (val - mu) / sigma
print(f"Z-score: {z_score} (This value is {z_score} standard deviations above the mean)")

# Find the percentile (probability of being below 85)
percentile = norm.cdf(val, loc=mu, scale=sigma)
print(f"Percentile: {percentile*100:.2f}%")`,
          explanation:
            "Using Scipy to calculate Z-scores and percentiles, which helps determine how 'unusual' a specific data point is.",
        },
      ],
    },
    {
      id: 'clt',
      title: 'The Central Limit Theorem (CLT)',
      category: 'Statistics',
      description: `The CLT is the "magic" of statistics. It states that if you take sufficiently large random samples from any population (regardless of its original distribution), the distribution of the sample means will be approximately normal.

Why it matters:
• It allows us to perform normal-distribution-based tests (like Z-tests and T-tests) even if our underlying data is skewed or weirdly shaped.
• Usually, a sample size of n ≥ 30 is considered "enough" for the CLT to take effect.`,
      examples: [
        {
          code: `import numpy as np
import matplotlib.pyplot as plt

# 1. Create a non-normal (Uniform) population
population = np.random.uniform(0, 100, 10000)

# 2. Take 1000 samples of size 50 and find their means
sample_means = [np.mean(np.random.choice(population, 50)) for _ in range(1000)]

print(f"Population Mean: {np.mean(population):.2f}")
print(f"Mean of Sample Means: {np.mean(sample_means):.2f}")
# The histogram of sample_means will look like a Bell Curve!`,
          explanation:
            'This simulation demonstrates that the average of your averages will always form a normal distribution, even if the source data is a flat line (uniform).',
        },
      ],
    },
    {
      id: 'poisson-dist',
      title: 'The Poisson Distribution',
      category: 'Statistics',
      description: `The Poisson distribution models the number of times an event occurs in a fixed interval of time or space. 

Key Requirements:
• Events occur independently.
• The average rate (Lambda / λ) is constant.
• Two events cannot occur at the exact same instant.

Common uses: Number of website hits per hour, number of meteorites hitting a region, or customers arriving at a checkout.`,
      examples: [
        {
          code: `from scipy.stats import poisson

# Lambda (average rate) is 3.2 goals per match
lam = 3.2

# Probability of seeing exactly 5 goals in a match
prob_5 = poisson.pmf(5, lam)

# Probability of 2 or fewer goals
prob_low_score = poisson.cdf(2, lam)

print(f"Prob(Exactly 5): {prob_5:.4f}")
print(f"Prob(0, 1, or 2): {prob_low_score:.4f}")`,
          explanation:
            'Calculating discrete probabilities for interval-based events using Lambda (λ).',
        },
      ],
    },
    {
      id: 't-distribution',
      title: 'The T-Distribution',
      category: 'Statistics',
      description: `The T-Distribution is used instead of the Normal Distribution when the sample size is small or the population standard deviation is unknown.

Key Difference:
• It has "heavier tails" than the Normal Distribution. This means it accounts for the higher uncertainty/chance of extreme values that comes with having less data.
• As your sample size (Degrees of Freedom) increases, the T-distribution becomes identical to the Normal Distribution.`,
      examples: [
        {
          code: `from scipy.stats import t
import numpy as np

# Sample of 10 data points
data = [12, 15, 18, 11, 14, 13, 16, 17, 12, 15]
n = len(data)
dof = n - 1 # Degrees of Freedom

# Finding a 95% Confidence Interval
mu = np.mean(data)
se = np.std(data, ddof=1) / np.sqrt(n)
interval = t.interval(0.95, dof, loc=mu, scale=se)

print(f"95% Confidence Interval: {interval}")`,
          explanation:
            "Using the T-distribution to calculate a Confidence Interval for a small sample where we don't know the true population spread.",
        },
      ],
    },
    {
      id: 'identifying-lambda',
      title: 'Identifying Lambda (λ)',
      category: 'Statistics',
      description: `In a Poisson process, Lambda (λ) represents the expected value (mean) and also the variance of the distribution.

To identify Lambda in the real world:
1. Define your interval (Time, Area, Distance).
2. Count the occurrences over a long period.
3. Divide the total count by the total number of intervals.

Example: If a hospital receives 48 patients in 24 hours, λ = 2 patients per hour.`,
      examples: [
        {
          code: `# Calculating Lambda from historical data
total_events = 1500
total_hours = 720 # 30 days

lambda_per_hour = total_events / total_hours
print(f"The identified Lambda (average rate) is: {lambda_per_hour:.2f} per hour")`,
          explanation:
            'Lambda is simply the rate parameter derived from historical averages.',
        },
      ],
    },
  ],
});
