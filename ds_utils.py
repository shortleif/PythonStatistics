import numpy as np
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
    # Calculate the margin of error using the T-distribution
    h = std_err * stats.t.ppf((1 + confidence) / 2, n - 1)
    return m - h, m + h