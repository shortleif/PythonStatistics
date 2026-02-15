window.CONTENT_SECTIONS = window.CONTENT_SECTIONS || [];

window.CONTENT_SECTIONS.push({
  title: 'Machine Learning',
  topics: [
    {
      id: 'train-test-split',
      title: 'Train-Test Split',
      category: 'Preprocessing',
      description: `The foundation of robust machine learning. Before training a model, data must be divided into two distinct sets: one for teaching the model (Training Set) and one for evaluating its performance (Testing Set).

This separation is crucial to prevent "overfitting"—where a model memorizes the training data but fails to generalize to new, unseen information. A common split ratio is 80/20 or 70/30 depending on the dataset size.`,
      syntax: `from sklearn.model_selection import train_test_split

# standard split with a fixed random seed for reproducibility
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)`,
      examples: [
        {
          explanation:
            'Splitting a pandas DataFrame for a supervised learning task.',
          code: `import pandas as pd
from sklearn.model_selection import train_test_split

# Mock Dataset
df = pd.DataFrame({
    'feature_1': range(100),
    'feature_2': range(100, 200),
    'target': [1 if x > 50 else 0 for x in range(100)]
})

X = df[['feature_1', 'feature_2']]
y = df['target']

# Perform the split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print(f"Training samples: {len(X_train)}")
print(f"Testing samples: {len(X_test)}")`,
        },
      ],
    },
    {
      id: 'linear-regression',
      title: 'Linear Regression',
      category: 'Supervised Learning (Regression)',
      description: `The "Hello World" of predictive modeling. Linear Regression attempts to model the relationship between a dependent variable (y) and one or more independent variables (X) by fitting a linear equation to observed data.

The goal is to find the line of best fit that minimizes the sum of squared residuals (the vertical distance between the data points and the regression line). It is best used for predicting continuous values like salary, price, or temperature.`,
      syntax: `from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(X_train, y_train)

# Making predictions on new data
predictions = model.predict(X_test)

# Checking the slope (coefficient) and intercept
print(model.coef_, model.intercept_)`,
      examples: [
        {
          explanation: 'Predicting Salary based on Years of Experience.',
          code: `import numpy as np
from sklearn.linear_model import LinearRegression

# Reshape data because sklearn expects 2D arrays for X
X = np.array([1, 2, 3, 4, 5]).reshape(-1, 1)
y = np.array([45000, 50000, 60000, 80000, 110000])

model = LinearRegression()
model.fit(X, y)

# Predict salary for someone with 6 years of experience
prediction = model.predict([[6]])

print(f"Predicted Salary: \${prediction[0]:,.2f}")
print(f"R-squared Score: {model.score(X, y):.4f}")`,
        },
      ],
    },
    {
      id: 'correlation-matrix',
      title: 'Correlation Matrix',
      category: 'Exploratory Analysis',
      description: `A fundamental tool for feature selection. A correlation matrix is a table showing correlation coefficients between variables. Each cell in the table shows the correlation between two variables.

Values range from -1 to 1:
• 1 indicates a perfect positive correlation.
• -1 indicates a perfect negative correlation.
• 0 indicates no linear relationship.

High correlation between independent variables (multicollinearity) can reduce the stability of your model coefficients.`,
      syntax: `corr_matrix = df.corr()

# Visualizing with Seaborn (recommended)
import seaborn as sns
import matplotlib.pyplot as plt

sns.heatmap(corr_matrix, annot=True, cmap='coolwarm')
plt.show()`,
      examples: [
        {
          explanation: 'Identifying relationships in a dataset.',
          code: `import pandas as pd

data = {
    'Study_Hours': [1, 2, 3, 4, 5],
    'Sleep_Hours': [8, 7, 6, 5, 4],
    'Test_Score': [60, 70, 75, 85, 90]
}
df = pd.DataFrame(data)

# Calculate correlation
corr = df.corr()

print("Correlation between Study Hours and Test Score:")
print(corr.loc['Study_Hours', 'Test_Score'])
# Expect positive value close to 1.0`,
        },
      ],
    },
    {
      id: 'random-forest',
      title: 'Random Forest',
      category: 'Ensemble Learning',
      description: `A powerful and versatile supervised learning algorithm that grows multiple decision trees and merges them together to get a more accurate and stable prediction.

It relies on the concept of "Bagging" (Bootstrap Aggregating). By training each tree on a random subset of data and features, the Random Forest decorrelates the trees, ensuring that the "wisdom of the crowd" outperforms any individual tree. It effectively handles non-linear data and is robust against overfitting.`,
      syntax: `from sklearn.ensemble import RandomForestClassifier

# n_estimators = number of trees in the forest
clf = RandomForestClassifier(n_estimators=100, max_depth=5)
clf.fit(X_train, y_train)

# Feature importance is a key benefit of Random Forests
print(clf.feature_importances_)`,
      examples: [
        {
          explanation: 'Classifying data and extracting feature importance.',
          code: `from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_iris

# Load standard Iris dataset
data = load_iris()
X, y = data.data, data.target

clf = RandomForestClassifier(n_estimators=50, random_state=42)
clf.fit(X, y)

# Which feature was most important for the classification?
importances = clf.feature_importances_
for name, importance in zip(data.feature_names, importances):
    print(f"{name}: {importance:.4f}")`,
        },
      ],
    },
    {
      id: 'model-evaluation',
      title: 'Model Evaluation',
      category: 'Metrics',
      description: `Training a model is only half the battle; you must effectively evaluate how well it performs. The metric used depends heavily on the problem type.

Regression Metrics:
• MAE (Mean Absolute Error): Average magnitude of errors.
• RMSE (Root Mean Squared Error): Penalizes large errors more than MAE.

Classification Metrics:
• Accuracy: Overall correctness.
• Precision/Recall: Critical for imbalanced datasets (e.g., fraud detection).
• Confusion Matrix: A tabular summary of correct and incorrect predictions.`,
      syntax: `from sklearn.metrics import mean_squared_error, accuracy_score, confusion_matrix

# For Regression
mse = mean_squared_error(y_true, y_pred)

# For Classification
acc = accuracy_score(y_true, y_pred)
cm = confusion_matrix(y_true, y_pred)`,
      examples: [
        {
          explanation:
            'Evaluating a classification model using a Confusion Matrix.',
          code: `from sklearn.metrics import confusion_matrix, classification_report

y_true = [0, 1, 0, 1, 0, 1, 0]
y_pred = [0, 0, 0, 1, 0, 1, 1]

# Generate matrix
cm = confusion_matrix(y_true, y_pred)
print(f"Confusion Matrix:\\n{cm}")

# Detailed report
print("\\nClassification Report:")
print(classification_report(y_true, y_pred))`,
        },
      ],
    },
  ],
});
