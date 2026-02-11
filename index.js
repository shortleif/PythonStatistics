/**
 * DATA CONTENT
 */
const CONTENT_SECTIONS = [
  {
    title: "Section 1: Introduction to Statistics",
    topics: [
      {
        id: "what-is-stats",
        title: "What is statistics?",
        xp: 50,
        category: "Statistics",
        description: "The science of collecting, analyzing, interpreting, and presenting data. It provides tools for predicting outcomes and identifying trends.",
        keyConcepts: ["Population vs Sample", "Parameters vs Statistics"]
      },
      {
        id: "desc-inf-stats",
        title: "Descriptive and Inferential statistics",
        xp: 100,
        category: "Statistics",
        description: "Descriptive stats summarize data (mean, median). Inferential stats draw conclusions about a population from a sample (hypothesis testing).",
        prosCons: { pros: ["Summarization", "Clarity"], cons: ["Sampling error", "Bias risk"] }
      },
      {
        id: "data-type-classification",
        title: "Data type classification",
        xp: 100,
        category: "Statistics",
        description: "Categorical (Nominal/Ordinal) vs. Numerical (Discrete/Continuous).",
        keyConcepts: ["Nominal: Labels", "Ordinal: Ordered", "Discrete: Counts", "Continuous: Measurements"]
      },
      {
        id: "measures-center",
        title: "Measures of center",
        xp: 50,
        category: "Statistics",
        description: "Mean, Median, Mode.",
        examples: [{ code: "import numpy as np\nmean = np.mean([1,2,3])", explanation: "Calculates arithmetic average." }]
      },
      {
        id: "measures-spread",
        title: "Measures of spread",
        xp: 50,
        category: "Statistics",
        description: "Standard deviation, Variance, IQR.",
        examples: [{ code: "std = np.std(data)\nvar = np.var(data)", explanation: "Measures dispersion." }]
      }
    ]
  },
  {
    title: "Section 2: Probability & Distributions",
    topics: [
      { id: "chances", title: "What are the chances?", xp: 50, category: "Statistics", description: "Probability basics: P(A) = outcomes / total." },
      { id: "replacement", title: "With or without replacement?", xp: 100, category: "Statistics", description: "With: events are independent. Without: subsequent probabilities change." },
      { id: "discrete-dist", title: "Discrete distributions", xp: 50, category: "Statistics", description: "Bernoulli, Binomial, Poisson." },
      { id: "expected-val", title: "Expected value vs. sample mean", xp: 50, category: "Statistics", description: "E[X] is theoretical, x̄ is observed." },
      { id: "continuous-dist", title: "Continuous distributions", xp: 50, category: "Statistics", description: "Normal, Exponential, Uniform." },
      { id: "binomial-dist", title: "The binomial distribution", xp: 50, category: "Statistics", description: "n trials, p success probability.", syntax: "X ~ Bin(n, p)" }
    ]
  },
  {
    title: "Section 3: Advanced Distributions & CLT",
    topics: [
      { id: "normal-dist", title: "The normal distribution", xp: 50, category: "Statistics", description: "The bell curve: μ and σ.", syntax: "X ~ N(μ, σ²)" },
      { id: "clt", title: "The central limit theorem", xp: 50, category: "Statistics", description: "Sample means approach normality as n increases." },
      { id: "poisson-dist", title: "The Poisson distribution", xp: 50, category: "Statistics", description: "Events per interval.", syntax: "X ~ Poisson(λ)" },
      { id: "t-distribution", title: "The t-distribution", xp: 50, category: "Statistics", description: "Used when σ is unknown or n is small." }
    ]
  },
  {
    title: "Section 4: Correlation & Design",
    topics: [
      { id: "correlation", title: "Correlation", xp: 50, category: "Statistics", description: "Pearson's r: ranges -1 to 1." },
      { id: "confounders", title: "Confounders", xp: 50, category: "Statistics", description: "A third variable that affects both predictor and outcome." },
      { id: "study-types", title: "Study types", xp: 100, category: "Statistics", description: "Observational vs. Experimental." },
      { id: "congrats", title: "Congratulations!", xp: 50, category: "Statistics", description: "You finished the core stats track!" }
    ]
  },
  {
    title: "Section 5: Python Core",
    topics: [
      {
        id: "py-functions",
        title: "Functions & Lambda",
        xp: 100,
        category: "Python",
        description: "Reusable logic blocks.",
        syntax: "def name(p): return p\nlambda x: x*x",
        examples: [{ code: "def add(a, b): return a + b\nsub = lambda a, b: a - b", explanation: "Basic and anonymous functions." }]
      },
      {
        id: "py-classes",
        title: "Classes & Methods",
        xp: 150,
        category: "Python",
        description: "Blueprints for objects.",
        syntax: "class DS:\n  def review(self): pass",
        prosCons: { pros: ["Organization", "State management"], cons: ["Boilerplate", "Complexity"] }
      },
      {
        id: "py-collections",
        title: "Dicts, Tuples, Lists",
        xp: 100,
        category: "Python",
        description: "The essential data containers.",
        keyConcepts: ["List: [mutable]", "Tuple: (immutable)", "Dict: {key: val}"]
      }
    ]
  },
  {
    title: "Section 6: Templates",
    topics: [
      {
        id: "notebook-template",
        title: "Analysis Starter (.ipynb)",
        xp: 200,
        category: "Resources",
        description: "Download a ready-to-go analysis notebook.",
        isTemplate: true
      }
    ]
  }
];

/**
 * STATE & DOM
 */
let activeTopicId = CONTENT_SECTIONS[0].topics[0].id;
let searchQuery = "";

const sidebar = document.getElementById('sidebar');
const sidebarBackdrop = document.getElementById('sidebarBackdrop');
const navContent = document.getElementById('navContent');
const mainContent = document.getElementById('mainContent');
const searchInput = document.getElementById('searchInput');
const openSidebarBtn = document.getElementById('openSidebar');
const closeSidebarBtn = document.getElementById('closeSidebar');

function toggleSidebar(show) {
  sidebar.classList.toggle('-translate-x-full', !show);
  sidebarBackdrop.classList.toggle('hidden', !show);
}

function copyToClipboard(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.innerHTML;
    btn.innerHTML = '<span class="text-green-400">Copied!</span>';
    setTimeout(() => btn.innerHTML = orig, 2000);
  });
}

function downloadNotebook() {
  const nb = {
    cells: [{ cell_type: "markdown", metadata: {}, source: ["# Data Science Starter\n", "Importing essentials..."] }, { cell_type: "code", execution_count: null, metadata: {}, outputs: [], source: ["import pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\nprint('Environment Ready')"] }],
    metadata: { kernelspec: { display_name: "Python 3", name: "python3" } },
    nbformat: 4, nbformat_minor: 4
  };
  const b = new Blob([JSON.stringify(nb, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(b);
  const a = document.createElement('a');
  a.href = url; a.download = 'ds_template.ipynb'; a.click();
}

function renderSidebar() {
  let html = "";
  CONTENT_SECTIONS.forEach(sec => {
    const topics = sec.topics.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));
    if (topics.length > 0) {
      html += `<div class="space-y-2 mb-6"><h3 class="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">${sec.title}</h3>`;
      topics.forEach(t => {
        const active = activeTopicId === t.id;
        html += `<button onclick="setActive('${t.id}')" class="w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between group ${active ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm' : 'text-slate-400 hover:bg-slate-900 border border-transparent'}">
          <span class="truncate">${t.title}</span>
          <span class="text-[9px] font-mono px-1 rounded ${active ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-500'}">${t.xp}XP</span>
        </button>`;
      });
      html += `</div>`;
    }
  });
  navContent.innerHTML = html;
}

function renderContent() {
  let t = null;
  CONTENT_SECTIONS.forEach(s => { const f = s.topics.find(x => x.id === activeTopicId); if(f) t = f; });
  if (!t) return;

  mainContent.innerHTML = `
    <div class="max-w-4xl mx-auto fade-in">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span class="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">${t.category}</span>
          <h2 class="text-3xl font-bold text-slate-50">${t.title}</h2>
        </div>
        <div class="bg-slate-900 border border-slate-800 p-3 rounded-lg text-center">
          <div class="text-xl font-bold text-cyan-400">${t.xp}</div>
          <div class="text-[9px] text-slate-500 uppercase">XP Value</div>
        </div>
      </div>
      <p class="text-lg text-slate-400 mb-8 leading-relaxed">${t.description}</p>
      ${t.syntax ? `<div class="mb-8"><h4 class="text-xs font-bold text-slate-500 uppercase mb-2">Syntax</h4><pre class="bg-slate-900 p-4 rounded-lg border border-slate-800 text-cyan-100 text-sm font-mono">${t.syntax}</pre></div>` : ''}
      ${t.keyConcepts ? `<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">${t.keyConcepts.map(c => `<div class="p-3 bg-slate-900/40 rounded-lg border border-slate-800 text-sm text-slate-300">• ${c}</div>`).join('')}</div>` : ''}
      ${t.prosCons ? `<div class="grid grid-cols-2 gap-8 mb-8">
          <div><h4 class="text-xs font-bold text-green-500 uppercase mb-2">Pros</h4>${t.prosCons.pros.map(p => `<div class="text-xs text-slate-400 mb-1">+ ${p}</div>`).join('')}</div>
          <div><h4 class="text-xs font-bold text-red-500 uppercase mb-2">Cons</h4>${t.prosCons.cons.map(c => `<div class="text-xs text-slate-400 mb-1">- ${c}</div>`).join('')}</div>
      </div>` : ''}
      ${t.examples ? t.examples.map(ex => `<div class="mb-8"><h4 class="text-xs font-bold text-yellow-500 uppercase mb-2">Code Example</h4><p class="text-xs text-slate-500 mb-2 italic">${ex.explanation}</p><div class="relative group"><button onclick="copyToClipboard(\`${ex.code.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`, this)" class="absolute right-2 top-2 text-[10px] bg-slate-800 px-2 py-1 rounded border border-slate-700 opacity-0 group-hover:opacity-100 transition-all">Copy</button><pre class="bg-slate-900 p-4 rounded-lg border border-slate-800 text-cyan-300 text-sm font-mono"><code>${ex.code}</code></pre></div></div>`).join('') : ''}
      ${t.isTemplate ? `<div class="bg-cyan-500/5 border border-cyan-500/20 p-8 rounded-xl text-center"><h3 class="text-xl font-bold mb-4">Ready to Start Analyzing?</h3><button onclick="downloadNotebook()" class="bg-cyan-500 text-slate-950 font-bold px-6 py-2 rounded-full hover:bg-cyan-400 transition-colors">Download .ipynb Template</button></div>` : ''}
    </div>
  `;
  mainContent.scrollTop = 0;
}

window.setActive = id => { activeTopicId = id; renderSidebar(); renderContent(); if(window.innerWidth < 1024) toggleSidebar(false); };
searchInput.addEventListener('input', e => { searchQuery = e.target.value; renderSidebar(); });
openSidebarBtn.onclick = () => toggleSidebar(true);
closeSidebarBtn.onclick = () => toggleSidebar(false);
sidebarBackdrop.onclick = () => toggleSidebar(false);

renderSidebar(); renderContent();