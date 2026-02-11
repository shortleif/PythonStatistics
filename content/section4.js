// Initialize global content array
window.CONTENT_SECTIONS = window.CONTENT_SECTIONS || [];

window.CONTENT_SECTIONS.push({
  title: 'Section 4: Correlation and Experimental Design',
  topics: [
    {
      id: 'correlation',
      title: 'Correlation',
      category: 'Statistics',
      description: `Correlation quantifies the strength and direction of a linear relationship between two quantitative variables. The most common measure is Pearson's r.

Key ranges for Pearson's r:
• 1.0: Perfect positive correlation.
• 0.0: No linear relationship.
• -1.0: Perfect negative correlation.

While correlation helps identify patterns, it does not imply that one variable causes the other to change.`,
      examples: [
        {
          code: `import pandas as pd
import numpy as np

# Sample Data: Study Hours vs Exam Scores
data = {
    'study_hours': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    'exam_scores': [52, 55, 60, 62, 68, 71, 74, 80, 85, 92]
}
df = pd.DataFrame(data)

# Calculate Pearson Correlation Coefficient
correlation = df['study_hours'].corr(df['exam_scores'])

print(f"Correlation Coefficient: {correlation:.4f}")
# A value near 0.98 indicates a very strong positive linear relationship.`,
          explanation:
            'Using Pandas to calculate the correlation coefficient between two variables to determine their linear dependency.',
        },
      ],
    },
    {
      id: 'correlation-caveats',
      title: 'Correlation Caveats',
      category: 'Statistics',
      description: `Correlation can be misleading if not interpreted carefully. Two major pitfalls include:

1. Non-linear relationships: Pearson's r only measures linear patterns. A perfect U-shaped relationship might have a correlation of 0.
2. Outliers: A single extreme data point can significantly inflate or deflate the correlation coefficient, giving a false impression of the overall trend.
3. Spurious Correlations: Sometimes two variables correlate purely by chance or because they are both influenced by a third factor.`,
      examples: [
        {
          code: `import numpy as np

# Example: Non-linear relationship (Quadratic)
x = np.array([-3, -2, -1, 0, 1, 2, 3])
y = x**2  # Perfect relationship, but not linear

correlation = np.corrcoef(x, y)[0, 1]
print(f"Correlation of a U-shape: {correlation:.1f}")
# Result is 0.0, despite the variables being perfectly related!`,
          explanation:
            "This demonstrates why visualizing data is crucial; a correlation of 0 doesn't always mean there is no relationship.",
        },
      ],
    },
    {
      id: 'confounders',
      title: 'Confounders',
      category: 'Statistics',
      description: `A confounder (or lurking variable) is an outside influence that changes the effect of a dependent and independent variable. This hidden variable can suggest a relationship between two others where none exists.

Common Example: Ice cream sales and shark attacks are highly correlated. Does eating ice cream cause shark attacks? No. The confounder is "Temperature" or "Season"—warmer weather causes both to increase independently.`,
      examples: [
        {
          code: `# Identifying a confounder conceptually
def check_relationship(var_a, var_b, potential_confounder):
    print(f"Analyzing {var_a} and {var_b}...")
    print(f"Warning: {potential_confounder} may be influencing both variables.")

check_relationship("Ice Cream Sales", "Drowning Incidents", "Summer Heat")`,
          explanation:
            'In professional analysis, you must always look for hidden variables that could explain away a correlation.',
        },
      ],
    },
    {
      id: 'study-types',
      title: 'Study Types',
      category: 'Statistics',
      description: `Data collection generally falls into two categories:

• Observational Studies: Researchers observe subjects and measure variables without assigning treatments. These are great for finding correlations but cannot prove causation.
• Experimental Studies: Researchers deliberately apply a treatment to one group (experimental group) and not to another (control group) to observe the effect. This is the "gold standard" for proving causation.`,
      examples: [
        {
          code: `# Logic for an Experimental Design (A/B Test)
groups = ['Control (Old UI)', 'Test (New UI)']
assignment = "Randomized"

print(f"Study Type: Randomized Controlled Trial")
print(f"Goal: Measure if 'New UI' causes higher conversion compared to 'Old UI'.")`,
          explanation:
            'Experimental studies use randomization to ensure that the only difference between groups is the treatment itself.',
        },
      ],
    },
    {
      id: 'longitudinal-vs-cross',
      title: 'Longitudinal vs. Cross-Sectional',
      category: 'Statistics',
      description: `These terms describe the timeline of data collection:

• Cross-Sectional: Data is collected from many different individuals at a single point in time (a "snapshot"). Example: Comparing the current salaries of 20-year-olds vs. 50-year-olds today.
• Longitudinal: Data is collected from the same individuals repeatedly over a long period. Example: Following a group of people from age 20 until they turn 50 to see how their individual salaries change.

Longitudinal studies are better at showing development and changes over time, while cross-sectional studies are faster and cheaper to conduct.`,
      examples: [
        {
          code: `import pandas as pd

# Cross-Sectional Data (Snapshot)
snapshot_2023 = pd.DataFrame({
    'User_ID': [101, 102, 103],
    'Age': [25, 45, 65],
    'Usage_Score': [80, 60, 40]
})

# Longitudinal Data (Timeline for one user)
user_101_history = pd.DataFrame({
    'Year': [2021, 2022, 2023],
    'User_ID': [101, 101, 101],
    'Usage_Score': [75, 78, 80]
})

print("Cross-Sectional looks at the group. Longitudinal looks at the journey.")`,
          explanation:
            "Comparing these two data structures highlights the difference between seeing a group snapshot and an individual's progression.",
        },
      ],
    },
  ],
});
