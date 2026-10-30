document.addEventListener('DOMContentLoaded', () => {
  const booksEndpoint = 'https://raw.githubusercontent.com/prof-lucassilva/api-books/main/livros.json';
  const bookList = document.getElementById('book-list');

  const fallbackBooks = [
    {
      id: 1,
      titulo: 'A Web Mobile',
      resumo: 'Estratégias e boas práticas para desenvolvimento mobile-first e interfaces responsivas.',
      imagem: 'https://raw.githubusercontent.com/prof-lucassilva/api-books/main/imgs/A-Web-Mobile.png',
    },
    {
      id: 2,
      titulo: 'JavaScript Avançado',
      resumo: 'Técnicas modernas para escrever código mais limpo, reutilizável e performático.',
      imagem: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 3,
      titulo: 'CSS em Profundidade',
      resumo: 'Domine layouts, grid, flexbox e design visual para interfaces incríveis.',
      imagem: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
    },
  ];

  const renderBookCard = (book) => {
    const article = document.createElement('article');
    article.className = 'rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md';

    article.innerHTML = `
      <img
        src="${book.imagem}"
        alt="${book.titulo}"
        class="h-52 w-full rounded-xl object-cover"
        loading="lazy"
        onerror="this.src='https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80';"
      />
      <div class="mt-4">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600">Front-end</p>
        <h3 class="mt-2 text-lg font-bold text-slate-900">${book.titulo}</h3>
        <p class="mt-2 text-sm leading-6 text-slate-600">${book.resumo}</p>
      </div>
    `;

    return article;
  };

  const renderBooks = (books) => {
    if (!bookList) return;

    bookList.innerHTML = '';
    books.slice(0, 12).forEach((book) => {
      bookList.appendChild(renderBookCard(book));
    });
  };

  fetch(booksEndpoint)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Falha na API');
      }
      return response.json();
    })
    .then((books) => renderBooks(books))
    .catch((error) => {
      console.error('Erro ao carregar os livros:', error);
      renderBooks(fallbackBooks);
    });
});