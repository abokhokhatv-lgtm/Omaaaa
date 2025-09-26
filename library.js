// library.js
// يعرض الكتب المخزنة في localStorage أو الكتب الافتراضية في صفحة المكتبة

document.addEventListener('DOMContentLoaded', () => {
  const booksContainer = document.getElementById('library-list');
  let books = [];
  try {
    books = JSON.parse(localStorage.getItem('books') || '[]');
  } catch (e) {
    books = [];
  }
  // إذا لم تكن هناك كتب مخزنة، أظهر رسالة
  if (!books || books.length === 0) {
    booksContainer.innerHTML = '<p>لا توجد كتب حاليا.</p>';
    return;
  }
  books.forEach((book) => {
    const card = document.createElement('div');
    card.className = 'book-card';
    const title = document.createElement('h4');
    title.textContent = book.title;
    card.appendChild(title);
    const desc = document.createElement('p');
    desc.textContent = book.description || '';
    card.appendChild(desc);
    // زر التحميل إذا كان الرابط متوفرًا
    if (book.link) {
      const button = document.createElement('a');
      button.href = book.link;
      button.target = '_blank';
      button.className = 'btn-secondary';
      button.textContent = 'تحميل الكتاب';
      card.appendChild(button);
    }
    booksContainer.appendChild(card);
  });
});