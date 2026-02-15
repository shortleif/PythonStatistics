"""
Data Science Utility Module
Companion file for DS Review Hub.
"""

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from scipy import stats

class StatsHelper:
    """A helper class to streamline descriptive and inferential statistical analysis.

    This class encapsulates a dataset and provides methods to quickly extract 
    key statistical metrics and perform distribution checks.
    """

    def __init__(self, data):
        """Initializes the StatsHelper with a specific dataset.

        Args:
            data (list or np.array): The numerical data to be analyzed.
        """
        self.data = np.array(data)

    def get_summary(self):
        """Calculates a set of descriptive statistics for the dataset.

        Returns:
            dict: A dictionary containing the mean, median, standard deviation, 
                and Interquartile Range (IQR) of the data.
        """
        return {
            "mean": np.mean(self.data),
            "median": np.median(self.data),
            "std_dev": np.std(self.data),
            "iqr": stats.iqr(self.data)
        }

    def check_normality(self):
        """Performs a Shapiro-Wilk test to check if data follows a normal distribution.

        The null hypothesis is that the data is normally distributed. 
        A p-value > 0.05 suggests we fail to reject the null hypothesis.

        Returns:
            str: "Normal" if the p-value is > 0.05, otherwise "Not Normal".
        """
        stat, p = stats.shapiro(self.data)
        return "Normal" if p > 0.05 else "Not Normal"

def calculate_confidence_interval(data, confidence=0.95):
    """Calculates a T-distribution based confidence interval for a small sample mean.

    Args:
        data (list or np.array): The sample data.
        confidence (float): The desired confidence level (e.g., 0.95 for 95%).

    Returns:
        tuple: A tuple containing the (lower_bound, upper_bound) of the interval.
    """
    n = len(data)
    m = np.mean(data)
    std_err = stats.sem(data)
    h = std_err * stats.t.ppf((1 + confidence) / 2, n - 1)
    return m - h, m + h

class Visualizer:
    """Helper class for rapid data visualization with consistent dark-mode styling."""

    @staticmethod
    def _apply_style():
        """Internal helper to set aesthetics matching the DS Review Hub theme."""
        plt.style.use('dark_background')
        plt.rcParams['axes.facecolor'] = '#0f172a' 
        plt.rcParams['figure.facecolor'] = '#0f172a'
        plt.rcParams['axes.edgecolor'] = '#334155'
        plt.rcParams['grid.color'] = '#1e293b'
        plt.rcParams['font.family'] = 'sans-serif'
        plt.rcParams['text.color'] = '#f8fafc'
        plt.rcParams['axes.labelcolor'] = '#94a3b8'
        plt.rcParams['xtick.color'] = '#94a3b8'
        plt.rcParams['ytick.color'] = '#94a3b8'

    @classmethod
    def bar(cls, df, x, y, title="Bar Plot"):
        """Generates a styled bar plot.

        Args:
            df (pd.DataFrame): The source data.
            x (str): Column name for the X-axis (categories).
            y (str): Column name for the Y-axis (values).
            title (str): Plot title.
        """
        cls._apply_style()
        # Using standard matplotlib interface via pandas
        ax = df.plot.bar(x=x, y=y, color='#22d3ee', edgecolor='#0891b2', legend=False)
        plt.title(title, color='#f8fafc', pad=20, fontsize=14, fontweight='bold')
        plt.xticks(rotation=45)
        plt.tight_layout()
        plt.show()

    @classmethod
    def histogram(cls, df, x, bins=10, title="Histogram"):
        """Generates a styled histogram to show distribution frequency.

        Args:
            df (pd.DataFrame): The source data.
            x (str): Column name for the variable to distribute.
            bins (int): Number of bins.
            title (str): Plot title.
        """
        cls._apply_style()
        plt.figure()
        plt.hist(df[x], bins=bins, color='#22d3ee', edgecolor='#0891b2', alpha=0.7)
        plt.title(title, color='#f8fafc', pad=20, fontsize=14, fontweight='bold')
        plt.xlabel(x)
        plt.ylabel("Frequency")
        plt.grid(True, linestyle='--', alpha=0.2)
        plt.tight_layout()
        plt.show()

    @classmethod
    def scatter(cls, df, x, y, title="Scatter Plot"):
        """Generates a styled scatter plot for identifying correlations.

        Args:
            df (pd.DataFrame): The source data.
            x (str): Column name for the X-axis.
            y (str): Column name for the Y-axis.
            title (str): Plot title.
        """
        cls._apply_style()
        plt.figure()
        plt.scatter(df[x], df[y], color='#22d3ee', alpha=0.6, edgecolors='#f8fafc', linewidth=0.5)
        plt.title(title, color='#f8fafc', pad=20, fontsize=14, fontweight='bold')
        plt.xlabel(x)
        plt.ylabel(y)
        plt.grid(True, linestyle='--', alpha=0.2)
        plt.tight_layout()
        plt.show()

    @classmethod
    def box(cls, df, x, by=None, title="Box Plot"):
        """Generates a styled box plot for detecting outliers and spread.

        Args:
            df (pd.DataFrame): The source data.
            x (str): Column name for the numerical variable.
            by (str, optional): Column name to group by (e.g., categories).
            title (str): Plot title.
        """
        cls._apply_style()
        plt.figure()
        
        # Pandas boxplot wrapper 
        df.boxplot(column=x, by=by, grid=False, 
                   patch_artist=True,
                   boxprops=dict(facecolor='#22d3ee', color='#0891b2', alpha=0.6),
                   medianprops=dict(color='#f8fafc', linewidth=1.5),
                   whiskerprops=dict(color='#94a3b8'),
                   capprops=dict(color='#94a3b8'),
                   flierprops=dict(marker='o', markerfacecolor='#f8fafc', markeredgecolor='#0891b2', markersize=5))
        
        plt.suptitle("") # Remove default pandas subtitle
        plt.title(title, color='#f8fafc', pad=20, fontsize=14, fontweight='bold')
        plt.grid(True, linestyle='--', alpha=0.2, axis='y')
        plt.tight_layout()
        plt.show()