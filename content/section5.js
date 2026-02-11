// Initialize global content array
window.CONTENT_SECTIONS = window.CONTENT_SECTIONS || [];

window.CONTENT_SECTIONS.push({
  title: 'Section 5: Python Core Concepts',
  topics: [
    {
      id: 'py-functions',
      title: 'Functions & Lambda Expressions',
      category: 'Python',
      description: `Functions are the primary building blocks of reusable code. 

• Standard Functions: Defined using 'def', these are best for complex logic, multi-line operations, and tasks requiring documentation (docstrings).
• Lambda Functions: Anonymous, one-line functions defined with the 'lambda' keyword. They are ideal for "throwaway" logic, especially when used as arguments for functional programming tools like map(), filter(), or sorted().

Pros: Promotes DRY (Don't Repeat Yourself) principles and improves readability.
Cons: Overusing lambdas for complex logic can make code difficult to debug.`,
      syntax: 'def name(args):\n    return result\n\nlambda args: expression',
      examples: [
        {
          code: `# Standard Function for complex logic
def clean_and_threshold(val, threshold=100):
    """Cleans numeric input and applies a floor."""
    cleaned = float(val) if val else 0.0
    return max(cleaned, threshold)

# Lambda for quick transformations (e.g., in a list)
raw_data = [10, 250, None, 45, 500]
# Use lambda with map to quickly process the list
processed = list(map(lambda x: x if x is not None else 0, raw_data))

print(f"Standard result: {clean_and_threshold(50)}")
print(f"Lambda processed: {processed}")`,
          explanation:
            'Comparing a documented standard function with a concise lambda used for inline data cleaning.',
        },
      ],
    },
    {
      id: 'py-classes-methods',
      title: 'Classes & Methods',
      category: 'Python',
      description: `Object-Oriented Programming (OOP) allows you to bundle data (attributes) and functionality (methods) together.

• Classes: The "blueprint" for creating objects. In Data Science, classes are often used to build custom estimators or data loaders.
• Methods: Functions defined inside a class that operate on the object's instance (using 'self').

Pros: Excellent for managing state and building complex systems (like Scikit-learn's API).
Cons: Can be overkill for simple scripts and adds boilerplate code.`,
      syntax:
        'class MyClass:\n    def __init__(self):\n        self.data = []\n    def add(self, x):\n        self.data.append(x)',
      examples: [
        {
          code: `class SimpleScaler:
    def __init__(self):
        self.mean = 0
        self.std = 1
        
    def fit(self, data):
        """Calculates parameters from data."""
        import numpy as np
        self.mean = np.mean(data)
        self.std = np.std(data)
        print(f"Fitted: Mean={self.mean:.2f}, Std={self.std:.2f}")
        
    def transform(self, data):
        """Applies scaling."""
        return [(x - self.mean) / self.std for x in data]

scaler = SimpleScaler()
sample = [10, 20, 30, 40, 50]
scaler.fit(sample)
scaled_sample = scaler.transform(sample)
print(f"Scaled output: {scaled_sample}")`,
          explanation:
            "A class mimicking the Scikit-learn 'fit/transform' pattern to manage the state of a data scaler.",
        },
      ],
    },
    {
      id: 'py-collections',
      title: 'Dicts, Tuples, and Lists',
      category: 'Python',
      description: `Choosing the right data structure is critical for performance and code clarity.

• Lists: Mutable, ordered sequences. Best for collections of items you intend to modify.
• Tuples: Immutable, ordered sequences. Faster than lists and "hashable" (can be used as dictionary keys). Use them for fixed data like (latitude, longitude).
• Dictionaries: Key-Value pairs. Extremely fast lookups. Essential for mapping labels to data or configuration settings.

Pros: Native Python collections are highly optimized.
Cons: Lists/Dicts can consume significant memory compared to NumPy arrays for massive datasets.`,
      examples: [
        {
          code: `# Tuple: Immutable (Fixed record)
location = (40.7128, -74.0060) 

# Dict: Key-Value Mapping
model_params = {
    "learning_rate": 0.01,
    "iterations": 1000,
    "tags": ["production", "v1"]
}

# List Comprehension: The 'Pythonic' way to transform data
raw_scores = [0.88, 0.92, 0.75, 0.99]
percent_scores = [f"{s*100}%" for s in raw_scores if s > 0.8]

print(f"High scores: {percent_scores}")
print(f"LR: {model_params.get('learning_rate')}")`,
          explanation:
            'Demonstrating record keeping with tuples, configuration with dicts, and efficient list transformations with comprehensions.',
        },
      ],
    },
  ],
});
