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
 * TEXT FORMATTER (Now with List Support)
 * Converts **bold**, $math$, and • lists into real HTML.
 */
function formatText(text) {
  if (!text) return '';

  // 1. Handle Inline Formatting (Bold, Math)
  let processed = text
    .replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="text-slate-100 font-semibold">$1</strong>',
    ) // Bold
    .replace(
      /\$\[(.*?)\]\$/g,
      '<span class="font-mono text-yellow-500">[$1]</span>',
    ) // Math brackets
    .replace(/\$(.*?)\$/g, '<span class="font-mono text-yellow-500">$1</span>'); // Inline Math

  // 2. Handle Block Formatting (Lists vs Paragraphs)
  const lines = processed.split('\n');
  let html = '';
  let insideList = false;

  lines.forEach((line) => {
    const trimmed = line.trim();

    // Check if line starts with a bullet (•) or a hyphen (-) followed by space
    if (
      trimmed.startsWith('•') ||
      (trimmed.startsWith('-') && trimmed[1] === ' ')
    ) {
      if (!insideList) {
        html += '<ul class="custom-list">'; // Start new list
        insideList = true;
      }
      // Remove the marker and wrap in <li>
      const content = trimmed.substring(1).trim();
      html += `<li>${content}</li>`;
    } else {
      // Not a list item
      if (insideList) {
        html += '</ul>'; // Close list if we were in one
        insideList = false;
      }

      // Handle normal text breaks
      if (trimmed.length > 0) {
        // If we have existing content, add a break before this new line
        if (html.length > 0 && !html.endsWith('</ul>')) {
          html += '<br>';
        }
        html += line;
      } else {
        // Preserve double-newline paragraph spacing
        html += '<br>';
      }
    }
  });

  if (insideList) html += '</ul>'; // Clean up

  return html;
}

/**
 * SYNTAX HIGHLIGHTER
 */
function highlightPython(code) {
  if (!code) return '';
  code = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const tokens = {};
  let tokenIndex = 0;

  const mask = (match, type) => {
    const key = `__TOKEN_${tokenIndex++}__`;
    const color = type === 'str' ? 'text-emerald-400' : 'text-slate-500 italic';
    tokens[key] = `<span class="${color}">${match}</span>`;
    return key;
  };

  code = code.replace(/("[^"]*"|'[^']*'|#.*$)/gm, (match) => {
    const type = match.startsWith('#') ? 'cmt' : 'str';
    return mask(match, type);
  });

  const keywords =
    /\b(def|class|return|if|else|elif|for|while|import|from|as|try|except|with|lambda|in|is|not|None|True|False)\b/g;
  const builtins =
    /\b(print|list|dict|set|int|float|str|max|min|round|map|filter|sum|len|range|zip)\b/g;
  const decorators = /(@\w+)/g;

  code = code
    .replace(keywords, '<span class="text-pink-400">$1</span>')
    .replace(builtins, '<span class="text-cyan-400">$1</span>')
    .replace(decorators, '<span class="text-yellow-500">$1</span>');

  Object.keys(tokens).forEach((key) => {
    code = code.replace(key, tokens[key]);
  });

  return code;
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
  const code = `"""
Data Science Utility Module
Companion file for DS Review Hub.
"""
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from scipy import stats

class StatsHelper:
    """A helper class to streamline descriptive and inferential statistical analysis."""
    def __init__(self, data):
        self.data = np.array(data)

    def get_summary(self):
        """Calculates mean, median, std_dev, and IQR."""
        return {
            "mean": np.mean(self.data),
            "median": np.median(self.data),
            "std_dev": np.std(self.data),
            "iqr": stats.iqr(self.data)
        }

    def check_normality(self):
        """Performs a Shapiro-Wilk test (Normal if p > 0.05)."""
        stat, p = stats.shapiro(self.data)
        return "Normal" if p > 0.05 else "Not Normal"

def calculate_confidence_interval(data, confidence=0.95):
    """Calculates a T-distribution based confidence interval."""
    n = len(data)
    m = np.mean(data)
    std_err = stats.sem(data)
    h = std_err * stats.t.ppf((1 + confidence) / 2, n - 1)
    return m - h, m + h

class Visualizer:
    """Helper class for rapid data visualization with consistent dark-mode styling."""
    @staticmethod
    def _apply_style():
        plt.style.use('dark_background')
        plt.rcParams['axes.facecolor'] = '#0f172a'
        plt.rcParams['figure.facecolor'] = '#0f172a'
        plt.rcParams['axes.edgecolor'] = '#334155'
        plt.rcParams['grid.color'] = '#1e293b'
        plt.rcParams['text.color'] = '#f8fafc'
        plt.rcParams['axes.labelcolor'] = '#94a3b8'
        plt.rcParams['xtick.color'] = '#94a3b8'
        plt.rcParams['ytick.color'] = '#94a3b8'

    @classmethod
    def bar(cls, df, x, y, title="Bar Plot"):
        cls._apply_style()
        df.plot.bar(x=x, y=y, color='#22d3ee', edgecolor='#0891b2', legend=False)
        plt.title(title, color='#f8fafc', pad=20, fontsize=14, fontweight='bold')
        plt.xticks(rotation=45)
        plt.tight_layout()
        plt.show()

    @classmethod
    def histogram(cls, df, x, bins=10, title="Histogram"):
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
    def density(cls, df, x, title="Density Plot (KDE)"):
        cls._apply_style()
        plt.figure()
        df[x].plot.kde(color='#22d3ee', linewidth=2)
        line_data = df[x].plot.kde().get_lines()[0].get_xydata()
        plt.fill_between(line_data[:,0], line_data[:,1], color='#22d3ee', alpha=0.2)
        plt.title(title, color='#f8fafc', pad=20, fontsize=14, fontweight='bold')
        plt.xlabel(x)
        plt.ylabel("Density")
        plt.grid(True, linestyle='--', alpha=0.2)
        plt.tight_layout()
        plt.show()

    @classmethod
    def box(cls, df, x, by=None, title="Box Plot"):
        cls._apply_style()
        plt.figure()
        df.boxplot(column=x, by=by, grid=False, patch_artist=True,
                   boxprops=dict(facecolor='#22d3ee', color='#0891b2', alpha=0.6),
                   medianprops=dict(color='#f8fafc', linewidth=1.5),
                   whiskerprops=dict(color='#94a3b8'),
                   capprops=dict(color='#94a3b8'),
                   flierprops=dict(marker='o', markerfacecolor='#f8fafc', markeredgecolor='#0891b2'))
        plt.suptitle("")
        plt.title(title, color='#f8fafc', pad=20, fontsize=14, fontweight='bold')
        plt.grid(True, linestyle='--', alpha=0.2, axis='y')
        plt.tight_layout()
        plt.show()`;

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

function copyToClipboard(encodedCode, btn) {
  const text = decodeURIComponent(encodedCode);
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

  // Renders the list cards or code cards
  const usageHtml = t.usageExamples
    ? t.usageExamples
        .map((ex) => {
          if (ex.text) {
            return `
      <div class="mb-8">
        <h4 class="text-xs font-bold text-${ex.accent || 'slate-400'} uppercase tracking-widest mb-3">${ex.title || 'Definition'}</h4>
        <div class="bg-slate-900 rounded-xl border border-slate-800 shadow-inner p-6 text-slate-300 text-sm leading-relaxed">
          ${formatText(ex.text)}
        </div>
      </div>`;
          }
          return `
    <div class="mb-8">
      <h4 class="text-xs font-bold text-${ex.accent} uppercase tracking-widest mb-3">${ex.title}</h4>
      <div class="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-inner">
        <pre class="p-6 text-slate-200 text-sm font-mono overflow-x-auto leading-relaxed"><code>${highlightPython(ex.code)}</code></pre>
        <div class="flex justify-end p-2 bg-slate-950/50 border-t border-slate-800/50">
           <button onclick="copyToClipboard('${encodeURIComponent(ex.code)}', this)" class="text-[11px] text-slate-400 hover:text-cyan-400 px-3 py-1 flex items-center gap-2 transition-all">
            <i class="fas fa-copy"></i> Copy
           </button>
        </div>
      </div>
    </div>`;
        })
        .join('')
    : '';

  // HEADER + DESCRIPTION
  // Note: Changed <p> to <div> to legally hold <ul> tags
  // Removed 'whitespace-pre-line' because formatText now handles flow
  const contentBody = `
    <div class="max-w-4xl mx-auto fade-in">
      <div class="mb-8 border-b border-slate-800 pb-6">
        <span class="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">${t.category}</span>
        <h2 class="text-4xl font-bold text-slate-50 mt-2">${t.title}</h2>
      </div>
      <div class="text-lg text-slate-400 mb-10 leading-relaxed">
        ${formatText(t.description)}
      </div>
      
      ${
        t.isResourcePage
          ? `
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
          ${usageHtml}
        </div>
      `
          : `
        ${
          t.syntax
            ? `
          <div class="mb-8">
            <h4 class="text-xs font-bold text-slate-500 uppercase mb-2">Syntax Reference</h4>
            <div class="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
              <pre class="p-5 text-slate-200 text-sm font-mono overflow-x-auto leading-relaxed"><code>${highlightPython(t.syntax)}</code></pre>
              <div class="flex justify-end p-2 bg-slate-950/50 border-t border-slate-800/50">
                <button onclick="copyToClipboard('${encodeURIComponent(t.syntax)}', this)" class="text-[11px] hover:text-cyan-400 text-slate-400 px-3 py-1 transition-colors">Copy Syntax</button>
              </div>
            </div>
          </div>`
            : ''
        }

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
                <button onclick="copyToClipboard('${encodeURIComponent(ex.code)}', this)" class="text-[11px] hover:text-cyan-400 text-slate-400 px-4 py-2 flex items-center gap-2 transition-all">
                  <i class="fas fa-copy"></i> Copy Code
                </button>
              </div>
            </div>
          </div>`,
                )
                .join('')
            : ''
        }
      `
      }
    </div>`;

  mainContent.innerHTML = contentBody;
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
