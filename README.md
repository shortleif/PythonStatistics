# Analysis Toolkit Guide

This toolkit provides a bridge between the theoretical concepts in the **DS Review Hub** and practical Python implementation.

## 1. Using the StatsHelper Class

The `StatsHelper` class is designed to wrap your data and provide quick access to summary statistics and normality tests.

```python
from ds_utils import StatsHelper

# 1. Initialize with your dataset
my_data = [18, 21, 22, 19, 21, 23, 85] # Includes an outlier
helper = StatsHelper(my_data)

# 2. Get a descriptive summary
# Returns: {'mean': 29.85, 'median': 21.0, 'std_dev': 22.6, 'iqr': 3.5}
stats_dict = helper.get_summary()
print(f"The median value is: {stats_dict['median']}")

# 3. Check for normality (Shapiro-Wilk test)
# Returns: "Not Normal" due to the outlier 85
print(f"Distribution status: {helper.check_normality()}")
```

### For specific inferential tasks, you can call standalone functions without instantiating a class.

```python
from ds_utils import calculate_confidence_interval

data = [102, 105, 98, 100, 103]

# Calculate a 95% Confidence Interval
lower, upper = calculate_confidence_interval(data, confidence=0.95)

print(f"We are 95% confident the population mean is between {lower:.2f} and {upper:.2f}")
```
