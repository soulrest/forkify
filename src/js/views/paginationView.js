import icons from 'url:../../img/icons.svg';
import View from './View';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // console.log(numPages);
    // Page 1, and there are other pages
    if (this._data.page === 1 && numPages > 1) {
      return this._generateMarkupButton('next');
    }
    // Last page
    if (this._data.page === numPages && numPages > 1) {
      return this._generateMarkupButton('prev');
    }
    // Other page
    if (this._data.page < numPages) {
      return `
        ${this._generateMarkupButton('prev')} 
        ${this._generateMarkupButton('next')}
      `;
    }
    // Page 1, and there are NO other pages
    return '';
  }

  _generateMarkupButton(direction, page = this._data.page) {
    const displayPage = direction === 'prev' ? page - 1 : page + 1;
    const arrow = direction === 'next' ? 'right' : 'left';
    return `
        <button data-goto="${displayPage}" class="btn--inline pagination__btn--${direction}">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-${arrow}"></use>
            </svg>
            <span>Page ${displayPage}</span>
        </button>
    `;
  }
}

export default new PaginationView();
