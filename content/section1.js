// Initialize global content array
window.CONTENT_SECTIONS = window.CONTENT_SECTIONS || [];

window.CONTENT_SECTIONS.push({
  title: 'Section 1: Introduction to Statistics',
  topics: [
    {
      id: 'desc-inf-stats',
      title: 'Descriptive and Inferential Statistics',
      category: 'Statistics',
      description: `Statistics is broadly divided into two categories based on the objective of the analysis:

• Descriptive Statistics: Focuses on summarizing and describing the features of a specific dataset. You aren't trying to generalize; you are simply stating "what is." It uses tools like mean, median, mode, and standard deviation to provide a snapshot of the data.
• Inferential Statistics: Uses a random sample of data taken from a population to describe and make inferences about the whole population. This is vital when it is impossible to measure everyone in a group. It involves hypothesis testing, confidence intervals, and regression analysis.

The key difference is the scope: Descriptive stays within the dataset; Inferential attempts to see beyond it.`,
      examples: [
        {
          code: `import pandas as pd
import numpy as np

# Sample data: Exam scores for a class of 10 students
scores = [88, 92, 78, 85, 95, 81, 80, 88, 90, 84]

# --- Descriptive Statistics ---
mean_score = np.mean(scores)
print(f"Descriptive: The average score in this specific class is {mean_score}")

# --- Inferential Statistics ---
# Suppose we want to estimate the mean score of all students in the country 
# based on this small sample (Standard Error calculation)
standard_error = np.std(scores, ddof=1) / np.sqrt(len(scores))
print(f"Inferential: The estimated margin of error for the wider population is +/- {1.96 * standard_error:.2f}")`,
          explanation:
            'In the descriptive part, we just describe the class. In the inferential part, we use the sample to estimate values for a larger population.',
        },
      ],
    },
    {
      id: 'data-type-classification',
      title: 'Data Type Classification',
      category: 'Statistics',
      description: `Understanding data types is the first step in any analysis because it determines which mathematical operations are valid.

1. Categorical (Qualitative):
   • Nominal: Labels without inherent order (e.g., Hair color, Country).
   • Ordinal: Categories with a logical order (e.g., Low, Medium, High).

2. Numerical (Quantitative):
   • Discrete: Countable values that cannot be split (e.g., Number of children, car accidents).
   • Continuous: Infinite possibilities within a range (e.g., Height, Temperature, Time).`,
      examples: [
        {
          code: `import pandas as pd

# Creating a dataframe with diverse data types
df = pd.DataFrame({
    'Student_ID': [1, 2, 3],                # Discrete
    'Grade_Level': ['Freshman', 'Junior', 'Senior'], # Ordinal
    'Subject': ['Math', 'Science', 'Arts'], # Nominal
    'Score': [88.5, 92.0, 79.4]             # Continuous
})

# Checking types in Pandas
print(df.dtypes)

# Example: Categorical to Numerical encoding (Ordinal)
df['Grade_Level_Code'] = df['Grade_Level'].map({'Freshman': 1, 'Junior': 2, 'Senior': 3})
print(df[['Grade_Level', 'Grade_Level_Code']])`,
          explanation:
            'Using Pandas to identify and manipulate different data classifications.',
        },
      ],
    },
    {
      id: 'measures-center',
      title: 'Measures of Center',
      category: 'Statistics',
      description: `Central tendency represents the 'typical' or 'central' value of a distribution. 

• Mean: The arithmetic average. Sensitive to outliers (extreme values).
• Median: The middle value when data is sorted. Highly robust against outliers.
• Mode: The most frequent value. Useful for categorical data where mean/median don't apply.

When your data is 'skewed' (not symmetrical), the median is usually a better representation of the 'average' experience than the mean.`,
      examples: [
        {
          code: `import numpy as np
from scipy import stats

# Dataset with a heavy outlier (the 1,000,000 value)
salaries = [45000, 48000, 50000, 52000, 55000, 1000000]

mean = np.mean(salaries)
median = np.median(salaries)
mode = stats.mode(salaries, keepdims=True).mode[0]

print(f"Mean Salary: \${mean:,.2f} (Distorted by outlier)")
print(f"Median Salary: \${median:,.2f} (More realistic)")
print(f"Mode Salary: \${mode:,.2f}")`,
          explanation:
            "This example shows why the Median is often preferred in economics; one billionaire in a room of workers makes the 'Mean' salary look huge, while the 'Median' stays grounded.",
        },
      ],
    },
    {
      id: 'measures-spread',
      title: 'Measures of Spread',
      category: 'Statistics',
      description: `Spread (Dispersion) describes how far apart the data points lie from each other and from the center.

• Variance: The average of the squared differences from the Mean.
• Standard Deviation (σ): The square root of variance. It is the most common measure because it is expressed in the same units as the data.
• Interquartile Range (IQR): The distance between the 25th and 75th percentiles. Like the median, it ignores outliers.

A small standard deviation indicates that the data points tend to be very close to the mean; a high standard deviation indicates that the data points are spread out over a large range of values.`,
      examples: [
        {
          code: `import numpy as np

# Two datasets with the same mean (50) but different spreads
group_a = [48, 50, 52, 49, 51]
group_b = [10, 50, 90, 20, 80]

print(f"Group A Std Dev: {np.std(group_a):.2f}")
print(f"Group B Std Dev: {np.std(group_b):.2f}")

# Calculating IQR
q3, q1 = np.percentile(group_b, [75 ,25])
iqr = q3 - q1
print(f"Group B IQR: {iqr}")`,
          explanation:
            'Notice how Group B has a much higher Standard Deviation, indicating high volatility/spread compared to the consistent Group A.',
        },
      ],
    },
  ],
});
