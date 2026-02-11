/**
 * STATE & DOM ELEMENTS
 */
let activeTopicId = 'getting-started';
let searchQuery = '';

const sidebar = document.getElementById('sidebar');
const sidebarBackdrop = document.getElementById('sidebarBackdrop');
const navContent = document.getElementById('navContent');
const mainContent = document.getElementById('mainContent');
const searchInput = document.getElementById('searchInput');
const openSidebarBtn = document.getElementById('openSidebar');
const closeSidebarBtn = document.getElementById('closeSidebar');

/**
 * SYNTAX HIGHLIGHTER
 */
function highlightPython(code) {
  const keywords =
    /\b(def|class|return|if|else|elif|for|while|import|from|as|try|except|with|lambda|in|is|not|None|True|False)\b/g;
  const builtins =
    /\b(print|list|dict|set|int|float|str|max|min|round|map|filter|sum|len|range|zip)\b/g;
  const comments = /(#.*)/g;
  const strings = /("[^"]*"|'[^']*')/g;
  const decorators = /(@\w+)/g;

  return code
    .replace(strings, '<span class="text-emerald-400">$1</span>')
    .replace(comments, '<span class="text-slate-500 italic">$1</span>')
    .replace(keywords, '<span class="text-pink-400">$1</span>')
    .replace(builtins, '<span class="text-cyan-400">$1</span>')
    .replace(decorators, '<span class="text-yellow-500">$1</span>');
}

/**
 * DOWNLOAD HANDLERS
 */
function downloadNotebook() {
  const nb = {
    cells: [
      {
        cell_type: 'markdown',
        source: ['# Data Science Analysis Starter\n', 'Importing tools...'],
      },
      {
        cell_type: 'code',
        source: [
          'from ds_utils import StatsHelper, Visualizer\n',
          'import pandas as pd\n',
          'data = [10, 20, 30]\n',
          'helper = StatsHelper(data)\n',
          'print(helper.get_summary())',
        ],
      },
    ],
    metadata: { kernelspec: { display_name: 'Python 3', name: 'python3' } },
    nbformat: 4,
    nbformat_minor: 4,
  };
  const b = new Blob([JSON.stringify(nb, null, 2)], {
    type: 'application/json',
  });
  triggerDownload(b, 'analysis_template.ipynb');
}

function downloadCompanionFile() {
  const code = `import numpy as np\nimport pandas as pd\nimport matplotlib.pyplot as plt\nfrom scipy import stats\n\nclass Visualizer:\n    @staticmethod\n    def _apply_style():\n        plt.style.use('dark_background')\n\n    @classmethod\n    def bar(cls, df, x, y, title="Plot"):\n        cls._apply_style()\n        df.plot.bar(x=x, y=y, color='#22d3ee')\n        plt.show()\n\nclass StatsHelper:\n    def __init__(self, data):\n        self.data = np.array(data)\n    def get_summary(self):\n        return {"mean": np.mean(self.data), "std": np.std(self.data)}\n`;
  const b = new Blob([code], { type: 'text/x-python' });
  triggerDownload(b, 'ds_utils.py');
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * UI LOGIC
 */
function toggleSidebar(show) {
  sidebar.classList.toggle('-translate-x-full', !show);
  sidebarBackdrop.classList.toggle('hidden', !show);
}

function copyToClipboard(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check text-green-400 mr-1"></i> Copied!';
    setTimeout(() => (btn.innerHTML = orig), 2000);
  });
}

function renderSidebar() {
  let html = '';
  (window.CONTENT_SECTIONS || []).forEach((sec) => {
    const topics = sec.topics.filter((t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    if (topics.length > 0) {
      html += `<div class="space-y-2 mb-6"><h3 class="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">${sec.title}</h3>`;
      topics.forEach((t) => {
        const active = activeTopicId === t.id;
        html += `<button onclick="setActive('${t.id}')" class="w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between group ${active ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm' : 'text-slate-400 hover:bg-slate-900 border border-transparent'}">
          <span class="truncate">${t.title}</span>
        </button>`;
      });
      html += `</div>`;
    }
  });
  navContent.innerHTML = html;
}

function renderContent() {
  let t = null;
  (window.CONTENT_SECTIONS || []).forEach((s) => {
    const f = s.topics.find((x) => x.id === activeTopicId);
    if (f) t = f;
  });
  if (!t) return;

  if (t.isResourcePage) {
    mainContent.innerHTML = `
      <div class="max-w-4xl mx-auto fade-in">
        <div class="mb-12 border-b border-slate-800 pb-8">
          <span class="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">${t.category}</span>
          <h2 class="text-5xl font-bold text-slate-50 mt-2">Analytical Toolkit</h2>
          <p class="text-xl text-slate-400 mt-4 leading-relaxed">${t.description}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div class="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 class="text-lg font-bold text-slate-100 mb-2">Analysis Template</h3>
            <button onclick="downloadNotebook()" class="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl mt-4">Download .ipynb</button>
          </div>
          <div class="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 class="text-lg font-bold text-slate-100 mb-2">ds_utils.py</h3>
            <button onclick="downloadCompanionFile()" class="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl border border-slate-700 mt-4">Download .py</button>
          </div>
        </div>

        <div class="space-y-10">
          <h3 class="text-2xl font-bold text-slate-50">Usage Guide</h3>
          ${
            t.usageExamples
              ? t.usageExamples
                  .map(
                    (ex) => `
            <div>
              <h4 class="text-xs font-bold text-${ex.accent} uppercase tracking-widest mb-3">${ex.title}</h4>
              <div class="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-inner">
                <pre class="p-6 text-slate-200 text-sm font-mono overflow-x-auto leading-relaxed"><code>${highlightPython(ex.code)}</code></pre>
                <div class="flex justify-end p-2 bg-slate-950/50 border-t border-slate-800/50">
                   <button onclick="copyToClipboard(\`${ex.code.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`, this)" class="text-[11px] text-slate-400 hover:text-cyan-400 px-3 py-1 flex items-center gap-2">
                    <i class="fas fa-copy"></i> Copy
                   </button>
                </div>
              </div>
            </div>`,
                  )
                  .join('')
              : ''
          }
        </div>
      </div>`;
    return;
  }

  mainContent.innerHTML = `
    <div class="max-w-4xl mx-auto fade-in">
      <div class="mb-8 border-b border-slate-800 pb-6">
        <span class="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">${t.category}</span>
        <h2 class="text-4xl font-bold text-slate-50 mt-2">${t.title}</h2>
      </div>
      <p class="text-lg text-slate-400 mb-10 leading-relaxed whitespace-pre-line">${t.description}</p>
      ${
        t.examples
          ? t.examples
              .map(
                (ex) => `
        <div class="mb-10">
          <h4 class="text-xs font-bold text-yellow-500 uppercase tracking-widest mb-3 italic">${ex.explanation}</h4>
          <div class="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-inner">
            <pre class="p-6 text-slate-200 text-sm font-mono overflow-x-auto leading-relaxed"><code>${highlightPython(ex.code)}</code></pre>
            <div class="flex justify-end p-2 bg-slate-950/50 border-t border-slate-800/50">
              <button onclick="copyToClipboard(\`${ex.code.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`, this)" class="text-[11px] hover:text-cyan-400 text-slate-400 px-4 py-2 flex items-center gap-2">
                <i class="fas fa-copy"></i> Copy Code
              </button>
            </div>
          </div>
        </div>`,
              )
              .join('')
          : ''
      }
    </div>`;
  mainContent.scrollTop = 0;
}

window.setActive = (id) => {
  activeTopicId = id;
  renderSidebar();
  renderContent();
  if (window.innerWidth < 1024) toggleSidebar(false);
};
searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  renderSidebar();
});
openSidebarBtn.onclick = () => toggleSidebar(true);
closeSidebarBtn.onclick = () => toggleSidebar(false);
sidebarBackdrop.onclick = () => toggleSidebar(false);

renderSidebar();
renderContent();
