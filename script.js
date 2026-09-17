/* =====================================================
   香蕉球 · 个人主页脚本（多页站点共用）
   功能：主题切换、移动端菜单、滚动淡入、页脚年份
   当前页导航高亮通过各页面 HTML 中的 aria-current="page"
   静态标注，无需 JS 参与。
   无外部依赖，全部为原生 JavaScript
   ===================================================== */
(function () {
  'use strict';

  /* ---------- 1. 深色 / 浅色主题切换 ---------- */
  var themeToggle = document.getElementById('theme-toggle');
  var themeColorMeta = document.querySelector('meta[name="theme-color"]');

  function applyThemeColor() {
    // 让浏览器地址栏颜色跟随当前主题
    if (!themeColorMeta) return;
    themeColorMeta.setAttribute(
      'content',
      document.documentElement.getAttribute('data-theme') === 'dark'
        ? '#0f172a'
        : '#4f46e5'
    );
  }

  function toggleTheme() {
    var root = document.documentElement;
    var isDark = root.getAttribute('data-theme') === 'dark';
    if (isDark) {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', 'dark');
    }
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    applyThemeColor();
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  applyThemeColor();

  /* 跟随系统主题变化（用户未手动选择时） */
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
      applyThemeColor();
    }
  });

  /* ---------- 2. 移动端汉堡菜单 ---------- */
  var navToggle = document.getElementById('nav-toggle');
  var navMenu = document.getElementById('nav-menu');

  function closeMenu() {
    if (!navMenu || !navToggle) return;
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', '打开菜单');
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? '关闭菜单' : '打开菜单');
    });

    // 点击菜单项后自动收起
    navMenu.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMenu();
    });

    // 按 Esc 收起菜单
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    // 切换到桌面宽度时清除移动端状态
    window.matchMedia('(min-width: 720px)').addEventListener('change', closeMenu);
  }

  /* ---------- 3. 滚动淡入（IntersectionObserver） ---------- */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // 只触发一次
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    // 极旧浏览器兜底：直接显示
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- 4. 页脚年份自动更新 ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
