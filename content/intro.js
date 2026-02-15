window.CONTENT_SECTIONS = window.CONTENT_SECTIONS || [];

window.CONTENT_SECTIONS.push({
  title: 'Welcome',
  topics: [
    {
      id: 'getting-started',
      title: 'Getting Started',
      category: 'Resources',
      description:
        'Welcome to the Data Science Review Hub. This analytical toolkit contains classes for instant statistics and visualization, designed to reduce boilerplate code in your research.',
      isResourcePage: true,
      usageExamples: [
        {
          title: '1. Statistics Helper Class',
          accent: 'cyan-400',
          code: `from ds_utils import StatsHelper

# Initialize with a list or numpy array
data = [18, 21, 22, 19, 21, 23, 85]
helper = StatsHelper(data)

# Get Summary (Mean, Median, Std, IQR)
print(helper.get_summary())

# Test for Normality (Shapiro-Wilk)
print(f"Distribution is: {helper.check_normality()}")`,
        },
        {
          title: '2. Visualization Class',
          accent: 'emerald-400',
          code: `from ds_utils import Visualizer
import pandas as pd

df = pd.DataFrame({
    'Metric': ['Accuracy', 'Precision', 'Recall'],
    'Score': [0.92, 0.88, 0.90]
})

# Generate a styled dark-mode bar plot
Visualizer.bar(df, x='Metric', y='Score', title='Model Performance')`,
        },
        {
          title: '3. Inferential Utilities',
          accent: 'yellow-500',
          code: `from ds_utils import calculate_confidence_interval

# Calculate a 95% T-distribution Confidence Interval
data = [102, 105, 98, 100, 103]
lower, upper = calculate_confidence_interval(data, confidence=0.95)

print(f"We are 95% confident the mean is between {lower:.2f} and {upper:.2f}")`,
        },
      ],
    },
  ],
});
