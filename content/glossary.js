window.CONTENT_SECTIONS = window.CONTENT_SECTIONS || [];

window.CONTENT_SECTIONS.push({
  title: 'Appendix & Glossary',
  topics: [
    {
      id: 'stat-terms',
      title: 'Statistical Terms',
      category: 'Definitions',
      description:
        'A quick reference for the statistical concepts used in the Analysis Template.',
      isResourcePage: true, // Needed to trigger the list view
      usageExamples: [
        {
          title: 'Shapiro-Wilk Test',
          accent: 'cyan-400',
          text: `**What is it?**
A statistical test used to check if a continuous variable follows a Gaussian (Normal) distribution.

**The Null Hypothesis ($H_0$):**
"The data is normally distributed."

**Interpreting the P-Value:**
• **p > 0.05**: We fail to reject $H_0$. The data looks Normal.
• **p <= 0.05**: We reject $H_0$. The data is likely NOT Normal (skewed or multimodal).`,
        },
        {
          title: 'Pearson vs. Spearman Correlation',
          accent: 'emerald-400',
          text: `**Pearson Correlation (Standard):**
Measures the linear relationship between two variables. It assumes data is normally distributed and is sensitive to outliers. Use this for standard metric-vs-metric analysis.

**Spearman Correlation (Rank):**
Measures the monotonic relationship. It converts values to "ranks" (1st, 2nd, 3rd) before comparing. It is robust to outliers and better for non-linear data (e.g., Job Level vs. Salary).`,
        },
        {
          title: 'P-Value',
          accent: 'yellow-500',
          text: `**In simple terms:**
The probability that the results you are seeing are just random noise or luck.

**Low P-Value (< 0.05):**
It is highly unlikely this result happened by luck. We call this "Statistically Significant."

**High P-Value (> 0.05):**
This could easily have happened by random chance. We cannot draw a strong conclusion.`,
        },
      ],
    },
    {
      id: 'ml-terms',
      title: 'ML Concepts',
      category: 'Definitions',
      description: 'Key terminology for the Machine Learning section.',
      isResourcePage: true,
      usageExamples: [
        {
          title: 'Overfitting vs. Underfitting',
          accent: 'pink-400',
          text: `**Overfitting (High Variance):**
The model memorized the training data details, including the noise. It performs perfectly on training data but fails on new, unseen data. It's like a student who memorizes the answer key but fails the actual test.

**Underfitting (High Bias):**
The model is too simple to capture the underlying pattern of the data. It performs poorly on both training and testing data.`,
        },
        {
          title: 'KDE (Kernel Density Estimation)',
          accent: 'indigo-400',
          text: `Think of KDE as a "Smoothed Histogram."



Instead of stacking bricks (bins) to show frequency, it draws a continuous curve. It is superior for visualizing the "shape" of data (e.g., determining if a distribution has two peaks) because it isn't affected by the arbitrary choice of bin width.`,
        },
      ],
    },
  ],
});
