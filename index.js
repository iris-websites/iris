/**! @license AGPL-3.0-only
 * Copyright (C) 2025  antiviiris and contributors
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, under version 3 of the License.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
'use strict';

void !function() {
  const tabs = document.querySelectorAll('div.tab');
  const tabIds = new Set(Array.from(tabs).map(node => node.dataset.opens));
  const pullout = document.querySelector('div.modal ~ div:not(.navbar)');

  let tab = 'home';
  {
    const hash = (window.location.hash || '#').slice(1);
    if (hash.startsWith('tab-') && tabIds.has(hash.slice(4, Infinity))) {
      tab = hash;
    } else {
      const params = new URLSearchParams(window.location.search);
      if (params.has('tab') && tabIds.has(params.get('tab'))) {
        tab = params.get('tab');
      }
    }
  };  

  function switchTab(id) {
    if (id === tab) return;
    const old = document.querySelector('div.navbar > div.tab[data-open]');
    if (old) {
      old.removeAttribute('data-open');
      if (tab !== 'home') pullout.querySelector(
        `div[data-tab="${tab}"]`
      ).setAttribute('aria-hidden', 'true');
    }
    if (id === 'home') {
      pullout.removeAttribute('data-open');
    } else {
      pullout.setAttribute('data-open', 'true');
    }
    document.querySelector(
      `div.navbar > div.tab[data-opens="${id}"]`
    ).setAttribute('data-open', 'true');
    if (id !== 'home') pullout.querySelector(
      `div[data-tab="${id}"]`
    ).removeAttribute('aria-hidden');
    tab = id;
    window.location.hash = `#tab-${id}`;
  }

  tabs.forEach(node => {
    node.addEventListener('click', switchTab.bind(this, node.dataset.opens));
  });

  switchTab(tab);

  document.body.querySelector('video.background').play();

}();
