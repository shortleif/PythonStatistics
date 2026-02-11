window.CONTENT_SECTIONS = window.CONTENT_SECTIONS || [];

window.CONTENT_SECTIONS.push({
  title: 'Welcome',
  topics: [
    {
      id: 'getting-started',
      title: 'Getting Started',
      category: 'Resources',
      description:
        'Welcome to the Data Science Review Hub. This platform is designed for professionals to quickly refresh core statistical and Python concepts.',
      isResourcePage: true,
      usageExamples: [
        {
          title: 'Using StatsHelper',
          accent: 'cyan-400',
          code: 'from ds_utils import StatsHelper\n\ndata = [18, 21, 22, 19, 21, 23, 85]\nhelper = StatsHelper(data)\nprint(helper.get_summary())',
        },
        {
          title: 'Quick Visualizations',
          accent: 'emerald-400',
          code: "from ds_utils import Visualizer\nimport pandas as pd\n\ndf = pd.DataFrame({'Topic': ['Stats', 'Python'], 'Confidence': [85, 92]})\nVisualizer.bar(df, x='Topic', y='Confidence', title='Review Progress')",
        },
      ],
    },
  ],
});
